from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from uuid import UUID
from typing import List

from app.auditLog.auditlogSchemas import AuditLogCreate, AuditLogResponse
from app.auditLog.auditlogService import (
    create_audit_log,
    get_all_audit_logs,
    get_audit_logs_by_lesson
)
from app.database import SessionLocal

router = APIRouter(prefix="/audit-logs", tags=["Audit Logs"])

# Dependency to get DB session
def getDb():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=AuditLogResponse)
def log_action(log: AuditLogCreate, db: Session = Depends(getDb)):
    return create_audit_log(db, log)

@router.get("/", response_model=List[AuditLogResponse])
def list_logs(db: Session = Depends(getDb)):
    return get_all_audit_logs(db)

@router.get("/lesson/{lesson_id}", response_model=List[AuditLogResponse])
def logs_by_lesson(lesson_id: UUID, db: Session = Depends(getDb)):
    return get_audit_logs_by_lesson(db, lesson_id)
