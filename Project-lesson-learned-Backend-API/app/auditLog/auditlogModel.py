from sqlalchemy import Column, ForeignKey, Enum, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from uuid import uuid4
from datetime import datetime
import enum

from app.database import Base


class AuditActionEnum(str, enum.Enum):
    created = "Created"
    updated = "Updated"
    approved = "Approved"
    rejected = "Rejected"


class AuditLog(Base):
    __tablename__ = "audit_logs"

    log_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    lesson_id = Column(UUID(as_uuid=True), ForeignKey("lessons_learned.lesson_id"), nullable=False)
    action = Column(Enum(AuditActionEnum), nullable=False)
    performed_by = Column(UUID(as_uuid=True), ForeignKey("users.user_id"), nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)

    # Relationships
    lesson = relationship("LessonLearned", back_populates="audit_logs")
    user = relationship("User", back_populates="audit_logs")
