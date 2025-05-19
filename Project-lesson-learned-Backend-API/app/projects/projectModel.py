from sqlalchemy import Column, String, Text, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from datetime import datetime
from app.database import Base

class Project(Base):
    __tablename__ = "projects"

    project_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    admin_id = Column(UUID(as_uuid=True), ForeignKey("users.user_id"), nullable=False)

    admin_id = Column(UUID(as_uuid=True), ForeignKey("users.user_id"), nullable=False)
    admin = relationship("User", back_populates="projects")