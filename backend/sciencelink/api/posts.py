from typing import List

from fastapi import APIRouter, Depends, File, UploadFile, status
from fastapi.openapi.models import Response

from sciencelink.models.auth import UserAuthSchema
from sciencelink.models.comments import CommentResponseSchema
from sciencelink.models.posts import CreatePostSchema, PostResponseSchema, UpdatePostSchema
from sciencelink.services.auth import get_current_user_from_cookies
from sciencelink.services.posts import PostsService


router = APIRouter(
    prefix='/posts',
    tags=['posts'],
)


@router.get('/{post_id}')
def get_post(
        post_id: int,
        posts_service: PostsService = Depends(),
) -> PostResponseSchema:
    return posts_service.get(post_id)


@router.get('/{post_id}/comments')
def get_post_comments(
        post_id: int,
        posts_service: PostsService = Depends(),
) -> List[CommentResponseSchema]:
    return posts_service.get_post_comments(post_id)


@router.post('/')
def create_post(
        post_data: CreatePostSchema,
        user: UserAuthSchema = Depends(get_current_user_from_cookies),
        posts_service: PostsService = Depends(),
) -> PostResponseSchema:
    return posts_service.create_post(
        user_id=user.id, org_id=None, post_data=post_data,
    )


@router.post('/organization/{org_id}')
def create_post_by_organization(
        post_data: CreatePostSchema,
        org_id: int,
        user: UserAuthSchema = Depends(get_current_user_from_cookies),
        posts_service: PostsService = Depends(),
) -> PostResponseSchema:
    return posts_service.create_post(
        user_id=user.id, org_id=org_id, post_data=post_data,
    )


@router.put('/{post_id}')
def update_post(
        post_id: int,
        post_data: UpdatePostSchema,
        user: UserAuthSchema = Depends(get_current_user_from_cookies),
        posts_service: PostsService = Depends(),
) -> PostResponseSchema:
    return posts_service.update_post(user.id, post_id, post_data)


@router.put('/{post_id}/attachments')
def upload_attachments(
        post_id: int,
        files: List[UploadFile] = File(...),
        user: UserAuthSchema = Depends(get_current_user_from_cookies),
        posts_service: PostsService = Depends(),
) -> PostResponseSchema:
    return posts_service.upload_attachments(user.id, post_id, files)


@router.delete('/{post_id}')
def delete_post(
        post_id: int,
        user: UserAuthSchema = Depends(get_current_user_from_cookies),
        posts_service: PostsService = Depends(),
):
    posts_service.delete_post(user.id, post_id)
    return Response(status=status.HTTP_204_NO_CONTENT, description='The post deleted')
