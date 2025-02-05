from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime
from logic import *
from fastapi.middleware.cors import CORSMiddleware
import auth

from models import GuessTryDB, UserDB
from database import get_db, engine, Base
from schemas import GuessTryCreate, UserCreate

# create db
# Base.metadata.drop_all(bind=engine) # for debugs
Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/guesstries/")
async def create_guesstry(guesstry: GuessTryCreate, db: Session = Depends(get_db)):
    try:
        time_formatted = validate_time(guesstry.time)
        isHit = compare_time(time_formatted, guesstry.place)
        db_guesstry = GuessTryDB(place=guesstry.place, time=time_formatted, isHit=isHit, createdAt=datetime.now().isoformat())
        
        db.add(db_guesstry)
        db.commit()
        db.refresh(db_guesstry)
        return db_guesstry
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/guesstries/")
async def read_guesstries(db: Session = Depends(get_db)):
    try:
        # print("ok")
        # return db.query(GuessTryDB).all()
        return db.query(GuessTryDB).filter(GuessTryDB.isHit == True).order_by(GuessTryDB.createdAt.desc()).all()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@app.post("/login/")
async def login(user: UserCreate, db: Session = Depends(get_db)):
    try:
        db_user = db.query(UserDB).filter(UserDB.username == user.username).first()
        if not db_user or not auth.verify_password(user.password, db_user.hashed_password):
            raise HTTPException(status_code=400, detail="Invalid username or password")

        token = auth.create_access_token({"sub": db_user.username})

        return {"username": db_user.username, "token": token}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/register/")
async def register(user: UserCreate, db: Session = Depends(get_db)):
    try:
        print(user)
        hashed_password = auth.hash_password(user.password)
        print(hashed_password)
        db_user = UserDB(username=user.username, hashed_password=hashed_password, createdAt=datetime.now().isoformat())
        print(db_user)
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        
        return {"username": db_user.username}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))

