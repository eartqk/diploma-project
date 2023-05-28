from pydantic import BaseModel


class InstituteSchema(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True
