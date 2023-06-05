from fastapi import APIRouter, Depends, status
from fastapi.openapi.models import Response

from sciencelink.models.auth import UserAuthSchema
from sciencelink.models.posts import CreatePostSchema, PostResponseSchema, UpdatePostSchema
from sciencelink.services.auth import get_current_user_from_cookies
from sciencelink.services.posts import PostsService

router = APIRouter(
    prefix='/posts',
    tags=['posts'],
)


# @router.get('/')
# def get_posts():
#     pass


@router.get('/{post_id}')
def get_post(
        post_id: int,
        posts_service: PostsService = Depends(),
) -> PostResponseSchema:
    return posts_service.get(post_id)


# @router.get('/{post_id}/comments')
# def get_post_comments(
#         post_id: int,
#         posts_service: PostsService = Depends(),
# ):
#     pass


@router.post('/')
def create_post(
        post_data: CreatePostSchema,
        user: UserAuthSchema = Depends(get_current_user_from_cookies),
        posts_service: PostsService = Depends(),
) -> PostResponseSchema:
    return posts_service.create_post(user.id, post_data)


# @router.post('/organization/{organization_id}')
# def create_post_by_organization(
#         post_data: CreatePostSchema,
#         organization_id: int,
#         user: UserAuthSchema = Depends(get_current_user_from_cookies),
#         posts_service: PostsService = Depends(),
# ) -> PostResponseSchema:
#     return posts_service.create_post(user.id, post_data)


@router.put('/{post_id}')
def update_post(
        post_id: int,
        post_data: UpdatePostSchema,
        user: UserAuthSchema = Depends(get_current_user_from_cookies),
        posts_service: PostsService = Depends(),
) -> PostResponseSchema:
    return posts_service.update_post(user.id, post_id, post_data)


@router.delete('/{post_id}')
def delete_post(
        post_id: int,
        user: UserAuthSchema = Depends(get_current_user_from_cookies),
        posts_service: PostsService = Depends(),
):
    posts_service.delete_post(user.id, post_id)
    return Response(status=status.HTTP_204_NO_CONTENT, description='The post deleted')