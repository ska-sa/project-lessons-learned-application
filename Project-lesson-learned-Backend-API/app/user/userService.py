from sqlalchemy.orm import Session
from uuid import UUID
from app.user.userModel import User
from app.user.userSchema import UserCreate

def create_user(db: Session, user: UserCreate) -> User:
    db_user = User(
        name=user.name,
        email=user.email,
        role=user.role,
        password_hash=user.password_hash,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user_by_id(db: Session, user_id: UUID) -> User:
    return db.query(User).filter(User.user_id == user_id).first()

def get_all_users(db: Session):
    return db.query(User).all()
