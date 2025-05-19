from fastapi import Body, APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID
from app.database import get_db
from app.projects.projectServices import projectService
from app.projects.projectSchemas import ProjectCreate, ProjectResponse, ProjectUpdate
router = APIRouter()

@router.post("/projects", response_model=ProjectResponse)
def create_project(project: ProjectCreate, db: Session = Depends(get_db)):
    return projectService.create_project(db, project)

@router.get("/projects", response_model=list[ProjectResponse])
def list_projects(db: Session = Depends(get_db)):
    return projectService.get_all_projects(db)

@router.get("/projects/{project_id}", response_model=ProjectResponse)
def get_project(project_id: UUID, db: Session = Depends(get_db)):
    project = projectService.get_project_by_id(db, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@router.put("/projects/{project_id}", response_model=ProjectResponse)
def update_project(project_id: UUID, project_update: ProjectUpdate, db: Session = Depends(get_db)):
    updated_project = projectService.update_project(db, project_id, project_update.dict())
    if not updated_project:
        raise HTTPException(status_code=404, detail="Project not found")
    return updated_project

@router.delete("/projects/{project_id}")
def delete_project(project_id: UUID, db: Session = Depends(get_db)):
    deleted = projectService.delete_project(db, project_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Project not found")
    return {"detail": "Project deleted successfully"}

@router.get("/projects/admin/{admin_id}", response_model=list[ProjectResponse])
def get_projects_by_admin(admin_id: UUID, db: Session = Depends(get_db)):
    return projectService.get_projects_by_admin(db, admin_id)
