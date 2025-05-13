from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID

from app.message.messageModel import Message  # if needed
from app.message.messageSchema import MessageCreate, MessageResponse
from app.message.messageService import create_message, get_messages_for_user, mark_message_as_read
from app.database import SessionLocal

router = APIRouter(prefix="/messages", tags=["Messages"])

# Include get_db() locally
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=MessageResponse)
def send_message(message: MessageCreate, db: Session = Depends(get_db)):
    return create_message(db, message)

@router.get("/inbox/{user_id}", response_model=List[MessageResponse])
def inbox(user_id: UUID, db: Session = Depends(get_db)):
    return get_messages_for_user(db, user_id)

@router.patch("/read/{message_id}", response_model=MessageResponse)
def read_message(message_id: UUID, db: Session = Depends(get_db)):
    return mark_message_as_read(db, message_id)
