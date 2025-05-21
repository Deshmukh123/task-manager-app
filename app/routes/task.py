from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.task import Task
from app.schemas.task import TaskCreate, TaskOut
from app.routes.auth import get_current_user
from app.core.database import get_db
from typing import List

router = APIRouter(prefix="/tasks", tags=["Tasks"])

@router.post("/", response_model=TaskOut)
def create_task(task: TaskCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    db_task = Task(
        title=task.title,
        description=task.description,
        creator_id=user.id,
        assignee_id=task.assignee_id
    )
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

@router.get("/", response_model=List[TaskOut])
def list_tasks(db: Session = Depends(get_db), user=Depends(get_current_user)):
    return db.query(Task).filter(Task.creator_id == user.id).all()

@router.put("/{task_id}", response_model=TaskOut)
def update_task(task_id: int, task: TaskCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    db_task = db.query(Task).filter(Task.id == task_id, Task.creator_id == user.id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    db_task.title = task.title
    db_task.description = task.description
    db_task.assignee_id = task.assignee_id
    db.commit()
    db.refresh(db_task)
    return db_task
