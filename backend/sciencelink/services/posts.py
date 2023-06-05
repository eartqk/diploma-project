from fastapi import Depends, HTTPException
from starlette import status

from sciencelink.db import tables
from sciencelink.db.session import Session, get_session
from sciencelink.models.posts import CreatePostSchema, UpdatePostSchema
from sciencelink.services.minio.uploads import UploadsService


class PostsService:
    def __init__(
            self,
            uploads_service: UploadsService = Depends(),
            session: Session = Depends(get_session)
    ):
        self.uploads_service = uploads_service
        self.session = session

    def _get(self, post_id: int) -> tables.Post:
        post = (
            self.session
            .query(tables.Post)
            .filter_by(
                id=post_id,
            )
            .first()
        )
        if not post:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Post does not exists')
        return post

    def get(self, post_id) -> tables.Post:
        return self._get(post_id)

    def get_post_comments(self, post_id):
        pass

    def create_post(self, user_id: int, post_data: CreatePostSchema) -> tables.Post:
        post = tables.Post(
            user_id=user_id,
            **post_data.dict(),
        )
        self.session.add(post)
        self.session.commit()
        return post

    def update_post(
            self,
            user_id: int,
            post_id: int,
            post_data: UpdatePostSchema,
    ) -> tables.Post:
        post = self._get(post_id)
        if post.user_id != user_id:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='Not permitted')
        post.body = post_data.body
        self.session.commit()
        return post

    def delete_post(self, user_id, post_id):
        post = self._get(post_id)
        if post.user_id != user_id:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='Not permitted')
        self.session.delete(post)
        self.session.commit()