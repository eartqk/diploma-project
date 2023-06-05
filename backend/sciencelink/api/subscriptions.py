from pydantic import BaseModel

from fastapi import APIRouter, Depends, status

from sciencelink.models.auth import UserAuthSchema
from sciencelink.services.auth import get_current_user_from_cookies
from sciencelink.services.subscriptions import SubscriptionsService


router = APIRouter(
    prefix='/follow',
    tags=['subscriptions'],
)


class FollowUserResponseSchema(BaseModel):
    follower_user_id: int
    followed_user_id: int
    is_follow: bool


@router.get('/user/{user_id}', response_model=FollowUserResponseSchema)
def check_follow_user(
        user_id: int,
        user: UserAuthSchema = Depends(get_current_user_from_cookies),
        service: SubscriptionsService = Depends(),
):
    is_follow = service.is_user_followed_user(follower_id=user.id, followed_id=user_id)
    return FollowUserResponseSchema(
        follower_user_id=user.id,
        followed_user_id=user_id,
        is_follow=is_follow,
    )


@router.post('/user/{user_id}', status_code=status.HTTP_200_OK)
def follow_user(
        user_id: int,
        user: UserAuthSchema = Depends(get_current_user_from_cookies),
        service: SubscriptionsService = Depends(),
):
    service.follow_user(follower_id=user.id, followed_id=user_id)
    return FollowUserResponseSchema(
        follower_user_id=user.id,
        followed_user_id=user_id,
        is_follow=True,
    )


@router.delete('/user/{user_id}', status_code=status.HTTP_200_OK)
def unfollow_user(
        user_id: int,
        user: UserAuthSchema = Depends(get_current_user_from_cookies),
        service: SubscriptionsService = Depends(),
):
    service.unfollow_user(follower_id=user.id, followed_id=user_id)
    return FollowUserResponseSchema(
        follower_user_id=user.id,
        followed_user_id=user_id,
        is_follow=False,
    )