from datetime import date, datetime
from typing import List

from pydantic import BaseModel, validator

from sciencelink.models.countries import CountrySchema
from sciencelink.models.educations import EducationSchema
from sciencelink.models.organizations import OrganizationBaseResponseSchema


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
    avatar_path: str | None

    class Config:
        orm_mode = True


class UserOwnerSchema(UserPostSchema):
    pass


class UserShortResponseSchema(UserBaseSchema):
    id: int
    avatar_path: str | None

    class Config:
        orm_mode = True


class UserDetailsSchema(BaseModel):
    count_posts: int | None
    count_followers: int | None
    count_following_users: int | None
    count_following_organizations: int | None

    class Config:
        orm_mode = True


class UserResponseSchema(UserBaseSchema):
    id: int

    about: str | None
    birthday: date | None
    avatar_path: str | None
    country: CountrySchema | None = None
    created_at: datetime
    owned_organizations: List[OrganizationBaseResponseSchema] | None
    educations: List[EducationSchema] | None

    details: UserDetailsSchema | None

    class Config:
        orm_mode = True

    @validator('birthday')
    def validate_birthday(cls, v):
        if v and not date(year=1900, month=1, day=1) <= v <= date.today():
            raise ValueError('Birthday must be correct')
        return v


class UserAvatarResponse(BaseModel):
    avatar_path: str

    class Config:
        orm_mode = True
