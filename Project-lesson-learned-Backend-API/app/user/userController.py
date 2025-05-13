from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID
from typing import List
from pydantic import EmailStr


from app.database import SessionLocal
from app.user.userSchema import UserCreate, UserResponse
from app.user.userService import create_user, get_user_by_id, get_all_users

router = APIRouter(prefix="/users", tags=["Users"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=UserResponse)
def create_user_endpoint(user: UserCreate, db: Session = Depends(get_db)):
    return create_user(db, user)

@router.get("/{user_id}", response_model=UserResponse)
def get_user_endpoint(user_id: UUID, db: Session = Depends(get_db)):
    user = get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.get("/", response_model=List[UserResponse])
def list_users(db: Session = Depends(get_db)):
    return get_all_users(db)
