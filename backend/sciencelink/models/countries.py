from pydantic import BaseModel


class Country(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True
