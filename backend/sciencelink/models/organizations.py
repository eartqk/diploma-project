from datetime import datetime

from pydantic import BaseModel

from sciencelink.models.countries import CountrySchema
from sciencelink.models.institutes import InstituteSchema


class UserOwnerSchema(BaseModel):
    id: int
    username: str
    name: str
    surname: str
    avatar_path: str | None

    class Config:
        orm_mode = True


class OrganizationBaseSchema(BaseModel):
    name: str
    about: str | None


class OrganizationBaseResponseSchema(OrganizationBaseSchema):
    id: int
    created_at: datetime
    avatar_path: str | None

    class Config:
        orm_mode = True


class OrganizationDetailsSchema(BaseModel):
    count_followers: int | None

    class Config:
        orm_mode = True


class OrganizationResponseSchema(OrganizationBaseResponseSchema):
    avatar_path: str | None

    owner: UserOwnerSchema

    institute: InstituteSchema | None
    country: CountrySchema | None

    details: OrganizationDetailsSchema | None


class OrganizationPostSchema(BaseModel):
    id: int
    name: str
    avatar_path: str | None

    class Config:
        orm_mode = True


class CreateOrganizationSchema(OrganizationBaseSchema):
    pass


class UpdateOrganizationSchema(OrganizationBaseSchema):
    pass


class OrganizationAvatarResponse(BaseModel):
    avatar_path: str

    class Config:
        orm_mode = True
