from pydantic import BaseModel
from typing import Optional
from enum import Enum

class TaskStatus(str, Enum):
    TODO = "TODO"
    IN_PROGRESS = "IN_PROGRESS"
    DONE = "DONE"

class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    assignee_id: Optional[int] = None

class TaskOut(BaseModel):
    id: int
    title: str
    description: Optional[str]
    status: TaskStatus
    assignee_id: Optional[int]
    creator_id: int

    class Config:
        orm_mode = True
