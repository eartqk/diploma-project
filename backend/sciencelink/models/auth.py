from pydantic import BaseModel


class UserAuthBaseSchema(BaseModel):
    email: str
    username: str
    name: str
    surname: str


class CreateUserAuthSchema(UserAuthBaseSchema):
    password: str


class UserAuthSchema(UserAuthBaseSchema):
    id: int

    class Config:
        orm_mode = True


class Token(BaseModel):
    access_token: str
    token_type: str = 'bearer'
