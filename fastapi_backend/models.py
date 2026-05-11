from pydantic import BaseModel, Field, field_validator
from typing import Optional
from datetime import datetime
import re

EMAIL_PATTERN = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")

class UserCreate(BaseModel):
    username: str = Field(..., min_length=3, max_length=50, description="Username cannot be blank")
    email: str = Field(..., description="Must be a valid email address")
    password: str = Field(..., min_length=8, description="Password must be at least 8 characters long")

    @field_validator("email")
    @classmethod
    def validate_email(cls, value: str) -> str:
        email = value.lower().strip()
        if not EMAIL_PATTERN.match(email):
            raise ValueError("Must be a valid email address")
        return email

    @field_validator("username")
    @classmethod
    def validate_username(cls, value: str) -> str:
        username = value.strip()
        if not username:
            raise ValueError("Username cannot be blank")
        return username

class UserLogin(BaseModel):
    email: str
    password: str = Field(..., min_length=1)

    @field_validator("email")
    @classmethod
    def validate_email(cls, value: str) -> str:
        email = value.lower().strip()
        if not EMAIL_PATTERN.match(email):
            raise ValueError("Must be a valid email address")
        return email

class Token(BaseModel):
    access_token: str
    token_type: str

class ActivityCreate(BaseModel):
    code: str
    status: str
    execution_time: Optional[float] = None
