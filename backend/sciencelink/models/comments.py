from datetime import datetime

from pydantic import BaseModel

from sciencelink.models.users import UserShortResponseSchema


class CommentBaseSchema(BaseModel):
    body: str


class CreateCommentSchema(CommentBaseSchema):
    pass


class UpdateCommentSchema(CommentBaseSchema):
    pass


class CommentResponseSchema(CommentBaseSchema):
    id: int
    user: UserShortResponseSchema
    post_id: int
    created_at: datetime

    class Config:
        orm_mode = True
