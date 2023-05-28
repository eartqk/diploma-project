from typing import List

from fastapi import APIRouter, Depends, status
from fastapi.openapi.models import Response

from sciencelink.models.auth import UserAuthSchema
from sciencelink.models.posts import PostSchema
from sciencelink.models.users import UpdateUserSchema, UserSchema
from sciencelink.services.auth import get_current_user
from sciencelink.services.users import UsersService

router = APIRouter(
    prefix='/users',
    tags=['users'],
)


# @router.get('/')
# def get_users():
#     pass


@router.get('/{user_id}', response_model=UserSchema)
def get_user(
        user_id: int,
        service: UsersService = Depends(),
):
    return service.get(user_id)


@router.get('/{user_id}/posts', response_model=List[PostSchema])
def get_user_posts(
        user_id: int,
        # add post paginator request and response
        service: UsersService = Depends(),
):
    return service.get_posts(user_id)


@router.get('/')
def get_user_organizations():
    pass


@router.get('/')
def get_user_education():
    pass


@router.get('/')
def get_user_followers():
    pass


@router.get('/')
def get_user_followed_users():
    pass


@router.get('/')
def get_user_followed_organizations():
    pass


@router.put('/', response_model=UserSchema)
def update_user(
        user_data: UpdateUserSchema,
        user: UserAuthSchema = Depends(get_current_user),
        service: UsersService = Depends(),
):
    return service.update_user(user.id, user_data)


@router.delete('/')
def delete_user(
        user: UserAuthSchema = Depends(get_current_user),
        service: UsersService = Depends(),
):
    service.delete_user(user.id)
    return Response(status=status.HTTP_204_NO_CONTENT)
