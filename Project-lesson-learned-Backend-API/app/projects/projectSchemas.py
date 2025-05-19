from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
from typing import Optional

class ProjectBase(BaseModel):
    title: str
    description: Optional[str] = None

class ProjectCreate(ProjectBase):
    admin_id: UUID

class ProjectResponse(ProjectBase):
    project_id: UUID
    created_at: datetime
    admin_id: UUID

class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None


    class Config:
        orm_mode = True
