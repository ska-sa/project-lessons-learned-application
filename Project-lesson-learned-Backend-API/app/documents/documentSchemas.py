from pydantic import BaseModel
from uuid import UUID
from datetime import datetime

class DocumentBase(BaseModel):
    lesson_id: UUID
    filename: str
    file_path: str

class DocumentCreate(DocumentBase):
    pass

class DocumentResponse(DocumentBase):
    id: UUID
    uploaded_at: datetime

    class Config:
        from_attributes = True
