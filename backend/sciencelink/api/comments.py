from fastapi import APIRouter, Depends

from sciencelink.models.auth import UserAuthSchema
from sciencelink.models.comments import CommentResponseSchema, CreateCommentSchema, UpdateCommentSchema
from sciencelink.services.auth import get_current_user_from_cookies
from sciencelink.services.comments import CommentsService

router = APIRouter(
    prefix='/comments',
    tags=['comments'],
)


@router.get('/{comment_id}')
def get_comment(
        comment_id: int, service: CommentsService = Depends()
) -> CommentResponseSchema:
    return service.get(comment_id)


@router.post('/post/{post_id}')
def create_comment_on_post(
        post_id: int,
        comment_data: CreateCommentSchema,
        user: UserAuthSchema = Depends(get_current_user_from_cookies),
        service: CommentsService = Depends(),
) -> CommentResponseSchema:
    return service.create_comment(user.id, post_id, comment_data)


@router.put('/{comment_id}')
def update_comment(
        comment_id: int,
        comment_data: UpdateCommentSchema,
        user: UserAuthSchema = Depends(get_current_user_from_cookies),
        service: CommentsService = Depends(),
) -> CommentResponseSchema:
    return service.update_comment(user.id, comment_id, comment_data)


@router.delete('/{comment_id}')
def delete_comment(
        comment_id: int,
        user: UserAuthSchema = Depends(get_current_user_from_cookies),
        service: CommentsService = Depends(),
) -> CommentResponseSchema:
    return service.delete_comment(user.id, comment_id)
