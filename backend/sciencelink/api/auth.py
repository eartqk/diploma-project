from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm

from sciencelink.models.auth import (
    UserAuthSchema,
    CreateUserAuthSchema,
    Token,
)
from sciencelink.services.auth import AuthService, get_current_user

router = APIRouter(
    prefix='/auth',
    tags=['auth'],
)


@router.post('/sign-up', response_model=Token)
def sign_up(
        user_data: CreateUserAuthSchema,
        service: AuthService = Depends(),
):
    return service.register_new_user(user_data)


@router.post('/sign-in', response_model=Token)
def sign_in(
        form_data: OAuth2PasswordRequestForm = Depends(),
        service: AuthService = Depends(),
):
    return service.authenticate_user(
        form_data.username,
        form_data.password,
    )


@router.get('/user', response_model=UserAuthSchema)
def get_user(user: UserAuthSchema = Depends(get_current_user)):
    return user
