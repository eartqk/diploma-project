from datetime import datetime
from typing import List

from pydantic import BaseModel

from sciencelink.models.comments import CommentResponseSchema
from sciencelink.models.organizations import OrganizationPostSchema
from sciencelink.models.users import UserPostSchema


class PostBaseSchema(BaseModel):
    body: str


class CreatePostSchema(PostBaseSchema):
    pass


class UpdatePostSchema(PostBaseSchema):
    pass


class AttachmentResponseSchema(BaseModel):
    post_id: int
    path: str

    class Config:
        orm_mode = True


class PostResponseSchema(PostBaseSchema):
    id: int
    created_at: datetime
    updated_at: datetime | None

    user: UserPostSchema
    organization: OrganizationPostSchema | None
    attachments: List[AttachmentResponseSchema] | None
    comments: List[CommentResponseSchema] | None
    # comments/attachments/reactions count

    class Config:
        orm_mode = True
