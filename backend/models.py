from sqlalchemy import Column, Integer, String, Boolean
from database import Base


class GuessTryDB(Base):
    __tablename__ = "guesstries"
    id = Column(Integer, primary_key=True, index=True)
    place = Column(String, index=True)
    time = Column(String, index=True)
    isHit = Column(Boolean, default=False)
    createdAt = Column(String, index=True)

class UserDB(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    createdAt = Column(String, index=True)