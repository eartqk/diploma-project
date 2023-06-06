from fastapi import Depends, HTTPException, status

from sciencelink.db import tables
from sciencelink.db.session import Session, get_session
from sciencelink.models.comments import CreateCommentSchema, UpdateCommentSchema
from sciencelink.services.posts import PostsService
from sciencelink.services.users import UsersService


class CommentsService:
    def __init__(
            self,
            session: Session = Depends(get_session),
            users_service: UsersService = Depends(),
            posts_service: PostsService = Depends(),
    ):
        self.session = session
        self.users_service = users_service
        self.posts_service = posts_service

    def _get(self, comment_id: int) -> tables.Comment:
        comment = (
            self.session.query(tables.Comment)
            .filter_by(id=comment_id)
            .first()
        )
        if not comment:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail='Comment does not exists.'
            )
        return comment

    def get(self, comment_id: int) -> tables.Comment:
        return self._get(comment_id)

    def create_comment(
            self, user_id: int, post_id: int, comment_data: CreateCommentSchema,
    ) -> tables.Comment:
        comment = tables.Comment(
            post_id=post_id,
            user_id=user_id,
            **comment_data.dict(),
        )
        self.session.add(comment)
        self.session.commit()
        return comment

    def update_comment(
            self,
            user_id: int,
            comment_id: int,
            comment_data: UpdateCommentSchema,
    ) -> tables.Comment:
        comment = self._get(comment_id)
        if comment.user_id != user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail='You do not have permission',
            )
        for field, value in comment_data:
            setattr(comment, field, value)
        self.session.commit()
        return comment

    def delete_comment(self, user_id: int, comment_id: int):
        comment = self._get(comment_id)
        if comment.user_id != user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail='You do not have permission',
            )
        self.session.delete(comment)
        self.session.commit()
