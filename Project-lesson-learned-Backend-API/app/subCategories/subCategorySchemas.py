from pydantic import BaseModel
from uuid import UUID
from typing import Optional

class SubCategoryBase(BaseModel):
    name: str
    description: Optional[str] = None
    category_id: UUID

class SubCategoryCreate(SubCategoryBase):
    pass

class SubCategoryResponse(SubCategoryBase):
    subcategory_id: UUID

    class Config:
        from_attributes = True
