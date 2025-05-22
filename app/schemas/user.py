# This file contains the Pydantic models for user-related data validation and serialization.
from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: int
    username: str
    email: EmailStr
    
class UserLogin(BaseModel):
    username: str
    password: str

    class Config:
        orm_mode = True
