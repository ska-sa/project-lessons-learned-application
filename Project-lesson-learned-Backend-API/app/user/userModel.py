from sqlalchemy import Column, String, Enum, Boolean, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
#from pydantic import EmailStr
from datetime import datetime
import uuid
import enum
from app.database import Base

class UserRole(str, enum.Enum):
    Contributor = "Contributor"
    ProjectManager = "ProjectManager"
    Admin = "Admin"

class User(Base):
    __tablename__ = "users"

    user_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    role = Column(Enum(UserRole), default=UserRole.Contributor)
    password_hash = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

   #Relationship
    lessons = relationship("LessonLearned", back_populates="submitted_by_user")
    audit_logs = relationship("AuditLog", back_populates="user", cascade="all, delete-orphan")
    sent_messages = relationship("Message", foreign_keys="Message.sender_id", back_populates="sender", cascade="all, delete")
    received_messages = relationship("Message", foreign_keys="Message.receiver_id", back_populates="receiver", cascade="all, delete")