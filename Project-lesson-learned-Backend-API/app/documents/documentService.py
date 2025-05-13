from sqlalchemy.orm import Session
from uuid import UUID
from app.documents.documentModel import Document
from app.documents.documentSchemas import DocumentCreate
from typing import List

def create_document(db: Session, document_data: DocumentCreate) -> Document:
    doc = Document(**document_data.dict())
    db.add(doc)
    db.commit()
    db.refresh(doc)
    return doc

def get_document_by_id(db: Session, doc_id: UUID) -> Document:
    return db.query(Document).filter(Document.id == doc_id).first()

def get_documents_by_lesson(db: Session, lesson_id: UUID) -> List[Document]:
    return db.query(Document).filter(Document.lesson_id == lesson_id).all()

def delete_document(db: Session, doc_id: UUID) -> bool:
    doc = get_document_by_id(db, doc_id)
    if doc:
        db.delete(doc)
        db.commit()
        return True
    return False
