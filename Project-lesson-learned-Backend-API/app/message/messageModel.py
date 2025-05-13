from sqlalchemy import Column, ForeignKey, Text, DateTime, Boolean
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from uuid import uuid4
from datetime import datetime
from app.database import Base

class Message(Base):
    __tablename__ = "messages"

    message_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    sender_id = Column(UUID(as_uuid=True), ForeignKey("users.user_id"), nullable=False)
    receiver_id = Column(UUID(as_uuid=True), ForeignKey("users.user_id"), nullable=False)
    content = Column(Text, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)
    is_read = Column(Boolean, default=False)

    # Relationships
    sender = relationship("User", foreign_keys=[sender_id], back_populates="sent_messages")
    receiver = relationship("User", foreign_keys=[receiver_id], back_populates="received_messages")
