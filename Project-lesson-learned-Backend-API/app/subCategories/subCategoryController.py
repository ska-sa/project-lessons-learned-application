from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID

from app.subCategories.subCategorySchemas import SubCategoryCreate, SubCategoryResponse
from app.subCategories.subCategoryService import create_subcategory, get_all_subcategories, get_subcategories_by_category
from app.database import SessionLocal

router = APIRouter(prefix="/subcategories", tags=["SubCategories"])

# Local DB dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=SubCategoryResponse)
def add_subcategory(subcategory: SubCategoryCreate, db: Session = Depends(get_db)):
    return create_subcategory(db, subcategory)

@router.get("/", response_model=List[SubCategoryResponse])
def list_subcategories(db: Session = Depends(get_db)):
    return get_all_subcategories(db)

@router.get("/category/{category_id}", response_model=List[SubCategoryResponse])
def list_by_category(category_id: UUID, db: Session = Depends(get_db)):
    return get_subcategories_by_category(db, category_id)
