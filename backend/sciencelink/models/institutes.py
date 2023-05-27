from pydantic import BaseModel


class Institute(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True
        