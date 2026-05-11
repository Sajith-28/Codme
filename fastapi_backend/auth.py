from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
import bcrypt
from fastapi import APIRouter, HTTPException
from models import UserCreate, UserLogin, Token
from database import users_collection
import os
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY", "super-secret-key")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24  # 1 day

router = APIRouter()


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))


def get_password_hash(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


@router.post("/register", response_model=Token)
async def register(user: UserCreate):
    try:
        email_lower = user.email.lower().strip()
        existing_user = await users_collection.find_one({"email": email_lower})
        if existing_user:
            raise HTTPException(status_code=400, detail="Email already registered")

        hashed_password = get_password_hash(user.password)
        new_user = {
            "username": user.username.strip(),
            "email": email_lower,
            "hashed_password": hashed_password,
            "created_at": datetime.utcnow(),
        }

        result = await users_collection.insert_one(new_user)

        access_token = create_access_token(
            data={"sub": str(result.inserted_id), "email": email_lower}
        )
        return {"access_token": access_token, "token_type": "bearer"}
    except HTTPException:
        raise
    except Exception as e:
        print(f"Database error during registration: {str(e)}")
        raise HTTPException(
            status_code=500, detail="Internal server error during registration"
        )


@router.post("/login", response_model=Token)
async def login(user: UserLogin):
    try:
        email_lower = user.email.lower().strip()
        db_user = await users_collection.find_one({"email": email_lower})
        if not db_user or not verify_password(user.password, db_user["hashed_password"]):
            raise HTTPException(status_code=401, detail="Incorrect email or password")

        access_token = create_access_token(
            data={"sub": str(db_user["_id"]), "email": db_user["email"]}
        )
        return {"access_token": access_token, "token_type": "bearer"}
    except HTTPException:
        raise
    except Exception as e:
        print(f"Database error during login: {str(e)}")
        raise HTTPException(
            status_code=500, detail="Internal server error during login"
        )
