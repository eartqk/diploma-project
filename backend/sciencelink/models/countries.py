from pydantic import BaseModel


class CountrySchema(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True
