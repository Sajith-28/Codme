from datetime import datetime, timedelta, timezone
from typing import Optional
from jose import JWTError, jwt
import bcrypt
from fastapi import APIRouter, HTTPException
from models import UserCreate, UserLogin, Token, ForgotPasswordRequest, ResetPasswordRequest
from database import users_collection, password_resets_collection
import os
import secrets
from dotenv import load_dotenv
from email_service import send_reset_email

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


@router.post("/forgot-password")
async def forgot_password(request: ForgotPasswordRequest):
    try:
        email_lower = request.email.lower().strip()
        db_user = await users_collection.find_one({"email": email_lower})

        if not db_user:
            # Return success even if user not found to prevent email enumeration
            return {"message": "If an account with that email exists, a reset code has been generated.", "reset_code": None}

        # Generate a 6-digit reset code
        reset_code = f"{secrets.randbelow(900000) + 100000}"

        # Store the reset token with 15-minute expiry
        reset_record = {
            "email": email_lower,
            "reset_code": reset_code,
            "expires_at": (datetime.now(timezone.utc) + timedelta(minutes=15)).isoformat(),
            "created_at": datetime.now(timezone.utc).isoformat(),
        }

        # Remove any existing reset tokens for this email
        await password_resets_collection.delete_one({"email": email_lower})
        await password_resets_collection.insert_one(reset_record)

        # Attempt to send the reset email
        email_sent = send_reset_email(email_lower, reset_code)

        # If email was sent, don't expose the reset code to the frontend client
        return {
            "message": "If an account with that email exists, a reset code has been generated.",
            "reset_code": None if email_sent else reset_code,
        }
    except Exception as e:
        print(f"Error during forgot-password: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.post("/reset-password")
async def reset_password(request: ResetPasswordRequest):
    try:
        email_lower = request.email.lower().strip()

        # Find the reset token
        reset_record = await password_resets_collection.find_one({
            "email": email_lower,
            "reset_code": request.reset_code,
        })

        if not reset_record:
            raise HTTPException(status_code=400, detail="Invalid or expired reset code")

        # Check expiry
        expires_at = datetime.fromisoformat(reset_record["expires_at"])
        if isinstance(expires_at, datetime) and expires_at.tzinfo is None:
            expires_at = expires_at.replace(tzinfo=timezone.utc)
        if datetime.now(timezone.utc) > expires_at:
            await password_resets_collection.delete_one({"email": email_lower})
            raise HTTPException(status_code=400, detail="Reset code has expired. Please request a new one.")

        # Update the user's password
        hashed_password = get_password_hash(request.new_password)
        await users_collection.update_one(
            {"email": email_lower},
            {"$set": {"hashed_password": hashed_password}}
        )

        # Delete the used reset token
        await password_resets_collection.delete_one({"email": email_lower})

        return {"message": "Password has been reset successfully. You can now log in with your new password."}
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error during reset-password: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")
