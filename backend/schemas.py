from pydantic import BaseModel

class GuessTryCreate(BaseModel):
    place: str
    time: str

class UserCreate(BaseModel):
    username: str
    password: str