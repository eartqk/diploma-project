from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.responses import JSONResponse, Response

from sciencelink.models.auth import (
    Token, UserAuthSchema,
    CreateUserAuthSchema,
)
from sciencelink.models.users import UserResponseSchema
from sciencelink.services.auth import AuthService, get_current_user_from_cookies
from sciencelink.services.users import UsersService

router = APIRouter(
    prefix='/auth',
    tags=['auth'],
)


@router.post('/sign-up', response_model=Token)
def sign_up(
        user_data: CreateUserAuthSchema,
        service: AuthService = Depends(),
):
    token_data = service.register_new_user(user_data)
    response = JSONResponse(content=token_data.dict())
    response.set_cookie(
        key='access_token',
        value=token_data.access_token,
        secure=True,
        httponly=True,
        samesite='none',
    )
    return response


@router.post('/sign-in', response_model=Token)
def sign_in(
        form_data: OAuth2PasswordRequestForm = Depends(),
        service: AuthService = Depends(),
):
    token_data = service.authenticate_user(
        form_data.username,
        form_data.password,
    )
    response = JSONResponse(content=token_data.dict())
    response.set_cookie(
        key='access_token',
        value=token_data.access_token,
        secure=True,
        httponly=True,
        samesite='none',
    )
    return response


@router.post('/logout')
def logout():
    response = Response()
    response.delete_cookie('access_token')
    return response


@router.get('/user', response_model=UserResponseSchema)
def get_user(
        user: UserAuthSchema = Depends(get_current_user_from_cookies),
        service: UsersService = Depends(),
):
    return service.get(user.id, with_details=True)
