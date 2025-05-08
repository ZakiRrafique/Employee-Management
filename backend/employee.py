from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from backend.db_models import User, Schedule, WorkHour, Payment
from backend.db import get_db

router = APIRouter()

@router.get("/employee/{employee_id}/schedule", response_model=List[Schedule])
def get_schedule(employee_id: int, db: Session = Depends(get_db)):
    schedule = db.query(Schedule).filter(Schedule.employee_id == employee_id).all()
    if not schedule:
        raise HTTPException(status_code=404, detail="Schedule not found")
    return schedule

@router.get("/employee/{employee_id}/hours", response_model=List[WorkHour])
def get_work_hours(employee_id: int, db: Session = Depends(get_db)):
    work_hours = db.query(WorkHour).filter(WorkHour.employee_id == employee_id).all()
    if not work_hours:
        raise HTTPException(status_code=404, detail="Work hours not found")
    return work_hours

@router.get("/employee/{employee_id}/payments", response_model=List[Payment])
def get_payments(employee_id: int, db: Session = Depends(get_db)):
    payments = db.query(Payment).filter(Payment.employee_id == employee_id).all()
    if not payments:
        raise HTTPException(status_code=404, detail="Payments not found")
    return payments
