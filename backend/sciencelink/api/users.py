from typing import List

from fastapi import APIRouter, Depends, File, UploadFile, status
from fastapi.openapi.models import Response

from sciencelink.models.auth import UserAuthSchema
from sciencelink.models.organizations import OrganizationBaseResponseSchema
from sciencelink.models.posts import PostResponseSchema
from sciencelink.models.users import (
    UpdateUserSchema, UserAvatarResponse, UserResponseSchema, UserShortResponseSchema
)
from sciencelink.services.auth import get_current_user_from_cookies
from sciencelink.services.users import UsersService

router = APIRouter(
    prefix='/users',
    tags=['users'],
)


@router.get('/', response_model=List[UserShortResponseSchema])
def get_users(
        skip: int = 0,
        limit: int = 30,
        service: UsersService = Depends(),
):
    return service.get_users(skip, limit)


@router.get('/{user_id}', response_model=UserResponseSchema)
def get_user(
        user_id: int,
        service: UsersService = Depends(),
):
    return service.get(user_id, with_details=True)


@router.get('/{user_id}/posts', response_model=List[PostResponseSchema])
def get_user_posts(
        user_id: int,
        skip: int = 0,
        limit: int = 30,
        service: UsersService = Depends(),
):
    return service.get_posts(user_id, skip, limit)


@router.get('/{user_id}/followers', response_model=List[UserShortResponseSchema])
def get_user_followers(
        user_id: int,
        service: UsersService = Depends(),
):
    return service.get_user_followers(user_id)


@router.get('/{user_id}/followed/users', response_model=List[UserShortResponseSchema])
def get_user_followed_users(
        user_id: int,
        service: UsersService = Depends(),
):
    return service.get_user_followed_users(user_id)


@router.get('/{user_id}/followed/organizations', response_model=List[OrganizationBaseResponseSchema])
def get_user_followed_organizations(
        user_id: int,
        service: UsersService = Depends(),
):
    return service.get_user_followed_organizations(user_id)


@router.put('/', response_model=UserResponseSchema)
def update_user(
        user_data: UpdateUserSchema,
        user: UserAuthSchema = Depends(get_current_user_from_cookies),
        service: UsersService = Depends(),
):
    return service.update_user(user.id, user_data)


@router.put('/avatar', response_model=UserAvatarResponse)
def upload_avatar(
        avatar_file: UploadFile | None = File(...),
        user: UserAuthSchema = Depends(get_current_user_from_cookies),
        service: UsersService = Depends(),
):
    return service.upload_avatar(user.id, avatar_file)


@router.delete('/', response_model=Response)
def delete_user(
        user: UserAuthSchema = Depends(get_current_user_from_cookies),
        service: UsersService = Depends(),
):
    service.make_inactive(user.id)
    return Response(status=status.HTTP_204_NO_CONTENT, description='The user inactive')
