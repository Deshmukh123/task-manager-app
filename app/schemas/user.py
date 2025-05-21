# This file contains the Pydantic models for user-related data validation and serialization.
from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    username: str   # ✅ Add this line
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: int
    username: str
    email: EmailStr

    class Config:
        orm_mode = True

class UserLogin(BaseModel):
    username: str
    password: str
