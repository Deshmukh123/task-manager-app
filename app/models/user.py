from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.core.database import Base


class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)  

    created_tasks = relationship(
        "Task",
        foreign_keys="Task.creator_id",
        back_populates="creator"
    )
    assigned_tasks = relationship(
        "Task",
        foreign_keys="Task.assignee_id",
        back_populates="assignee"
    )