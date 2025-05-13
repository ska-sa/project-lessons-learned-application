from pydantic import BaseModel
from uuid import UUID
from datetime import datetime

class MessageBase(BaseModel):
    content: str
    receiver_id: UUID

class MessageCreate(MessageBase):
    sender_id: UUID  # usually injected from logged-in user 

class MessageResponse(BaseModel):
    message_id: UUID
    sender_id: UUID
    receiver_id: UUID
    content: str
    timestamp: datetime
    is_read: bool

    class Config:
        from_atributtes = True
