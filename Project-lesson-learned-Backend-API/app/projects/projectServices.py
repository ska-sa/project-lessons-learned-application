from sqlalchemy.orm import Session
from uuid import UUID
from app.projects.projectModel import Project
from app.projects.projectSchemas import ProjectCreate

def create_project(db: Session, project: ProjectCreate):
    new_project = Project(**project.dict())
    db.add(new_project)
    db.commit()
    db.refresh(new_project)
    return new_project

def get_all_projects(db: Session):
    return db.query(Project).all()

def get_project_by_id(db: Session, project_id: UUID):
    return db.query(Project).filter(Project.project_id == project_id).first()

def update_project(db: Session, project_id: UUID, updates: dict):
    project = db.query(Project).filter(Project.project_id == project_id).first()
    if not project:
        return None
    for key, value in updates.items():
        if value is not None:
            setattr(project, key, value)
    db.commit()
    db.refresh(project)
    return project

def delete_project(db: Session, project_id: UUID):
    project = db.query(Project).filter(Project.project_id == project_id).first()
    if not project:
        return None
    db.delete(project)
    db.commit()
    return True

def get_projects_by_admin(db: Session, admin_id: UUID):
    return db.query(Project).filter(Project.admin_id == admin_id).all()

