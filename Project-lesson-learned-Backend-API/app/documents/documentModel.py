from sqlalchemy import Column, String, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
from app.database import Base

class Document(Base):
    __tablename__ = "documents"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    lesson_id = Column(UUID(as_uuid=True), ForeignKey("lessons_learned.lesson_id"), nullable=False)
    filename = Column(String, nullable=False)
    file_path = Column(String, nullable=False)
    uploaded_at = Column(DateTime, default=datetime.utcnow)

    lesson = relationship("LessonLearned", back_populates="documents")