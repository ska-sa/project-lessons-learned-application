from sqlalchemy.orm import Session
from uuid import UUID
from app.message.messageModel import Message
from app.message.messageSchema import MessageCreate

def create_message(db: Session, message: MessageCreate) -> Message:
    new_msg = Message(**message.dict())
    db.add(new_msg)
    db.commit()
    db.refresh(new_msg)
    return new_msg

def get_messages_for_user(db: Session, user_id: UUID):
    return db.query(Message).filter(Message.receiver_id == user_id).all()

def mark_message_as_read(db: Session, message_id: UUID):
    msg = db.query(Message).filter(Message.message_id == message_id).first()
    if msg:
        msg.is_read = True
        db.commit()
    return msg