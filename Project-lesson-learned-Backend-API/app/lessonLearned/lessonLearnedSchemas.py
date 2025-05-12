from typing import Optional, List
from pydantic import BaseModel
from uuid import UUID
from datetime import datetime, date
from app.lessonLearned.lessonLearnedModel import Impacts, Status, Categories

class LessonLearnedBase(BaseModel):
    project_name: str
    date_captured: Optional[date] = None
    category_main: Categories
    category_sub: UUID
    description: str
    root_cause: str
    outcomes: str
    impact: Impacts
    suggested_actions: Optional[str] = None
    tags: Optional[List[str]] = []
    status: Optional[Status] = Status.pending
    submitted_by: UUID
    approved_by: Optional[UUID] = None


class LessonLearnedCreate(LessonLearnedBase):
    pass

class LessonLearnedUpdate(BaseModel):
    project_name: Optional[str]
    category_main: Optional[Categories]
    category_sub: Optional[UUID]
    description: Optional[str]
    root_cause: Optional[str]
    outcomes: Optional[str]
    impact: Optional[Impacts]
    suggested_actions: Optional[str]
    tags: Optional[List[str]]
    status: Optional[Status]
    approved_by: Optional[UUID]

class LessonLearnedResponse(LessonLearnedBase):
    lesson_id: UUID
    created_at: datetime
    updated_at: datetime

class Config:
    from_attributes = True        