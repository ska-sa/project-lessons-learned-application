from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
from enum import Enum


class AuditActionEnum(str, Enum):
    created = "Created"
    updated = "Updated"
    approved = "Approved"
    rejected = "Rejected"


class AuditLogBase(BaseModel):
    lesson_id: UUID
    action: AuditActionEnum
    performed_by: UUID


class AuditLogCreate(AuditLogBase):
    pass


class AuditLogResponse(AuditLogBase):
    log_id: UUID
    timestamp: datetime

    class Config:
        from_attributes = True
