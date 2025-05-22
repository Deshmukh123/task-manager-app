from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    status = Column(String, default="Pending")    
    assignee_id = Column(Integer, ForeignKey("users.id"))
    creator_id = Column(Integer, ForeignKey("users.id"))  

    creator = relationship(
        "User",
        foreign_keys=[creator_id],
        back_populates="created_tasks"
    )
    assignee = relationship(
        "User",
        foreign_keys=[assignee_id],
        back_populates="assigned_tasks"
    )