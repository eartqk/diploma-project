from typing import List

from fastapi import Depends, File, HTTPException, UploadFile, status

from sciencelink.db import tables
from sciencelink.db.session import Session, get_session
from sciencelink.models.posts import CreatePostSchema, UpdatePostSchema
from sciencelink.services.elasticsearch.search import SearchService
from sciencelink.services.minio.uploads import UploadsService
from sciencelink.services.organizations import OrganizationsService


class PostsService:
    def __init__(
            self,
            uploads_service: UploadsService = Depends(),
            orgs_service: OrganizationsService = Depends(),
            search_service: SearchService = Depends(),
            session: Session = Depends(get_session),
    ):
        self.uploads_service = uploads_service
        self.orgs_service = orgs_service
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

    def create_post(
            self,
            user_id: int,
            post_data: CreatePostSchema,
            org_id: int | None = None,
    ) -> tables.Post:
        if org_id:
            org = self.orgs_service.get(org_id)
            if org.owner_id != user_id:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail='You do not have permission',
                )
        post = tables.Post(
            user_id=user_id,
            organization_id=org_id,
            **post_data.dict(),
        )
        self.session.add(post)
        self.session.commit()
        return post

    def get(self, post_id) -> tables.Post:
        return self._get(post_id)

    def get_post_comments(self, post_id) -> List[tables.Comment]:
        return (
            self.session.query(tables.Comment)
            .filter_by(post_id=post_id)
            .order_by(tables.Comment.created_at.asc())
            .all()
        )

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

    def upload_attachments(
            self,
            user_id: int,
            post_id: int,
            files: List[UploadFile] = File(...),
    ) -> tables.Post:
        post = self._get(post_id)
        if post.user_id != user_id:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='Not permitted')

        attachments = []
        if not files:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Empty files')
        paths = self.uploads_service.upload_files(files)
        for file, path in zip(files, paths):
            attachments.append(
                tables.Attachment(
                    post_id=post.id,
                    path=path,
                )
            )
        if len(attachments) > 10:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail='Max 10 files at per post'
            )
        post.attachments = attachments
        self.session.commit()
        return post

    def delete_post(self, user_id, post_id):
        post = self._get(post_id)
        if post.user_id != user_id:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='Not permitted')
        self.session.delete(post)
        self.session.commit()
