from pydantic import BaseModel, conint

from sciencelink.models.users import UserPostSchema


class PostBaseSchema(BaseModel):
    body: str


class CreatePostSchema(PostBaseSchema):
    pass


class PostSchema(PostBaseSchema):
    id: int
    organization: str | None  # Change to org schema
    user: UserPostSchema

    # comments/attachments/reactions count

    class Config:
        orm_mode = True
