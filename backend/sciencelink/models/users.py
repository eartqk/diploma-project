from datetime import date
from typing import List

from pydantic import BaseModel, validator

from sciencelink.models.countries import CountrySchema


class UserBaseSchema(BaseModel):
    email: str
    username: str
    name: str
    surname: str


class UpdateUserSchema(BaseModel):
    name: str
    surname: str
    about: str | None
    birthday: date | None


class UserPostSchema(BaseModel):
    id: int
    username: str
    name: str
    surname: str

    class Config:
        orm_mode = True


class UserSchema(UserBaseSchema):
    id: int

    about: str | None
    birthday: date | None
    avatar_path: str | None
    country: CountrySchema | None = None

    # followers_count: int
    # following_count: int

    class Config:
        orm_mode = True

    @validator('birthday')
    def validate_birthday(cls, v):
        if not date(year=1900, month=1, day=1) <= v <= date.today():
            raise ValueError('Birthday must be correct')
        return v
