from fastapi import FastAPI,HTTPException,Depends
from typing import Annotated,List
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import SessionLocal,engine
import models
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

app=FastAPI()

origins=[
    'http://localhost:5173',
    'https://todo-frontend-tau-one.vercel.app/',
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

class TaskBase(BaseModel):
        
    title:str
    description:str
    status:str

class TaskModel(TaskBase):
    id:int
    created_at:datetime
    class Config:
        orm_mode=True

def get_db():
    db=SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency=Annotated[Session,Depends(get_db)]

models.Base.metadata.create_all(bind=engine)

@app.post('/tasks',response_model=TaskModel)
async def create_task(task:TaskBase,db:db_dependency):
    db_task = models.Task(**task.model_dump())
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

@app.get('/tasks')
async def get_task(db:db_dependency):
    db_task = db.query(models.Task).all()
    return db_task

@app.put('/tasks/{task_id}',response_model=TaskModel)
async def edit_task(task_id:int,task:TaskBase,db:db_dependency):
    db_task = db.query(models.Task).filter(models.Task.id == task_id).first()
    print(db_task)
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    
    db_task.title = task.title
    db_task.description = task.description
    db_task.status = task.status
    
    db.commit()
    db.refresh(db_task)
    return db_task

@app.delete('/tasks/{task_id}')
async def edit_task(task_id:int,db:db_dependency):
    db_task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    
    db.delete(db_task)
    db.commit()

    tasks = db.query(models.Task).all()
    
    return tasks