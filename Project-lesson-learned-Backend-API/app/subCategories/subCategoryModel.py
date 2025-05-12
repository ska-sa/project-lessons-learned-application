from sqlalchemy import Column, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from uuid import uuid4

from app.database import Base

class SubCategory(Base):
    __tablename__ = "sub_categories"

    subcategory_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    main_category = Column(String, nullable=False)
    name = Column(String, nullable=False)

    # Relationship to LessonLearned
    lessons = relationship("LessonLearned", back_populates="subcategory", cascade="all, delete")
