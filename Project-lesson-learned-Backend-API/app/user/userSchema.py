from pydantic import BaseModel, EmailStr
from uuid import UUID
from datetime import datetime
from enum import Enum

class UserRole(str, Enum):
    Contributor = "Contributor"
    ProjectManager = "ProjectManager"
    Admin = "Admin"

class UserBase(BaseModel):
    name: str
    email: EmailStr
    role: UserRole

class UserCreate(UserBase):
    password_hash: str

class UserResponse(UserBase):
    user_id: UUID
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True
