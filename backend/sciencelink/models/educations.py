from pydantic import BaseModel

from sciencelink.models.institutes import InstituteSchema


class EducationSchema(BaseModel):
    id: int
    name: str
    about: str | None
    entrance_year: int
    graduation_year: int
    academic_position: str | None
    institute: InstituteSchema | None

    class Config:
        orm_mode = True
