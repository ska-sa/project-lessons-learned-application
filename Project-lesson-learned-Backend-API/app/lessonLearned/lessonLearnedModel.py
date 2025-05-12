from sqlalchemy import Column, String, Date, Enum, ForeignKey, Text, DateTime
from sqlalchemy.dialects.postgresql import UUID, ARRAY
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey
from uuid import uuid4
from datetime import datetime
from app.subCategories.subCategoryModel import SubCategory
import enum 
#from typing import List, Optional
from app.database import Base

class Impacts(str, enum.Enum):
    negative = "Negative"
    positive = "Positive"
    neutral = "Neutral"

class Categories(str, enum.Enum):
    business_process = "Business Process"
    technical_solution = "Technical Solution"
    project_management = "Project Management"

class Status(str, enum.Enum):
    pending = "Pending"
    approved = "Approved"
    rejected = "Rejected"


class LessonLearned(Base):
    __tablename__ = "lessons_learned"
    
    lesson_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4, index=True)
    project_name = Column(String, nullable=False)
    date_captured = Column(Date, nullable=True)
    category_main = Column(Enum(Categories), nullable=False)
    category_sub = Column(UUID(as_uuid=True), ForeignKey("sub_categories.subcategory_id"), nullable=False)
    description = Column(Text, nullable=False)
    root_cause = Column(Text, nullable=False)
    outcomes = Column(Text, nullable=False)
    impact = Column(Enum(Impacts), nullable=False)
    suggested_actions = Column(Text, nullable=True)
    tags = Column(ARRAY(String), nullable=True)
    status = Column(Enum(Status), default=Status.pending)
    submitted_by = Column(UUID(as_uuid=True), nullable=False)
    approved_by = Column(UUID(as_uuid=True), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow) 
    submitted_by = Column(UUID(as_uuid=True), ForeignKey("users.user_id")) 

    #Relationship
    documents = relationship("Document", back_populates="lesson", cascade="all, delete")
    audit_logs = relationship("AuditLog", back_populates="lesson", cascade="all, delete-orphan")
    subcategory = relationship("SubCategory", back_populates="lessons")
    submitted_by_user = relationship("User", back_populates="lessons")

    
    