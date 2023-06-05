from datetime import datetime

from pydantic import BaseModel

from sciencelink.models.organizations import OrganizationPostSchema
from sciencelink.models.users import UserPostSchema


class PostBaseSchema(BaseModel):
    body: str


class CreatePostSchema(PostBaseSchema):
    pass


class UpdatePostSchema(PostBaseSchema):
    pass


class PostResponseSchema(PostBaseSchema):
    id: int
    created_at: datetime
    updated_at: datetime | None

    user: UserPostSchema
    organization: OrganizationPostSchema | None  # Change to org schema

    # comments/attachments/reactions count

    class Config:
        orm_mode = True
