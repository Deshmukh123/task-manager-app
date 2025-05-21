from sqlalchemy import Column, Integer, String, ForeignKey, Enum
from sqlalchemy.orm import relationship
from app.core.database import Base
import enum

class TaskStatus(str, enum.Enum):
    TODO = "TODO"
    IN_PROGRESS = "IN_PROGRESS"
    DONE = "DONE"

class Task(Base):
    __tablename__ = "tasks"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    status = Column(Enum(TaskStatus), default=TaskStatus.TODO)
    creator_id = Column(Integer, ForeignKey("users.id"))
    assignee_id = Column(Integer, ForeignKey("users.id"))

    creator = relationship("User", foreign_keys=[creator_id])
    assignee = relationship("User", foreign_keys=[assignee_id])
