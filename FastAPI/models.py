from database import Base
from sqlalchemy import Column,Integer,String,DateTime
from datetime import datetime

class Task(Base):
    __tablename__ ='task'

    id=Column(Integer,primary_key=True,index=True)
    title=Column(String)
    description=Column(String)
    status=Column(String)
    created_at = Column(DateTime(timezone=True), default=datetime.now)