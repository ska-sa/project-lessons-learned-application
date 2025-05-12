from sqlalchemy.orm import Session
from uuid import UUID
from app.subCategories.subCategoryModel import SubCategory
from app.subCategories.subCategorySchemas import SubCategoryCreate

def create_subcategory(db: Session, subcategory_data: SubCategoryCreate) -> SubCategory:
    subcategory = SubCategory(**subcategory_data.dict())
    db.add(subcategory)
    db.commit()
    db.refresh(subcategory)
    return subcategory

def get_all_subcategories(db: Session):
    return db.query(SubCategory).all()

def get_subcategories_by_category(db: Session, category_id: UUID):
    return db.query(SubCategory).filter(SubCategory.category_id == category_id).all()
