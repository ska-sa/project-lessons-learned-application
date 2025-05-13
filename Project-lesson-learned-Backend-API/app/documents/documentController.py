from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID

from app.database import SessionLocal
from app.documents.documentSchemas import DocumentCreate, DocumentResponse
from app.documents.documentService import (
    create_document,
    get_document_by_id,
    get_documents_by_lesson,
    delete_document,
)

router = APIRouter(prefix="/documents", tags=["Documents"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=DocumentResponse)
def add_document(document: DocumentCreate, db: Session = Depends(get_db)):
    return create_document(db, document)

@router.get("/{doc_id}", response_model=DocumentResponse)
def fetch_document(doc_id: UUID, db: Session = Depends(get_db)):
    doc = get_document_by_id(db, doc_id)
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    return doc

@router.get("/lesson/{lesson_id}", response_model=List[DocumentResponse])
def fetch_documents_for_lesson(lesson_id: UUID, db: Session = Depends(get_db)):
    return get_documents_by_lesson(db, lesson_id)

@router.delete("/{doc_id}", status_code=204)
def remove_document(doc_id: UUID, db: Session = Depends(get_db)):
    success = delete_document(db, doc_id)
    if not success:
        raise HTTPException(status_code=404, detail="Document not found")
