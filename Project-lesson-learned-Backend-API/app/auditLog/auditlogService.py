from sqlalchemy.orm import Session
from uuid import UUID
from app.auditLog.auditlogModel import AuditLog
from app.auditLog.auditlogSchemas import AuditLogCreate


def create_audit_log(db: Session, log_data: AuditLogCreate) -> AuditLog:
    log = AuditLog(**log_data.dict())
    db.add(log)
    db.commit()
    db.refresh(log)
    return log


def get_audit_logs_by_lesson(db: Session, lesson_id: UUID):
    return db.query(AuditLog).filter(AuditLog.lesson_id == lesson_id).all()


def get_all_audit_logs(db: Session):
    return db.query(AuditLog).all()
