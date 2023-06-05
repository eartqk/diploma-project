from typing import List

from fastapi import Depends, File, HTTPException, UploadFile, status
from sqlalchemy.orm import joinedload

from sciencelink.db import tables
from sciencelink.db.session import Session, get_session
from sciencelink.models.users import UpdateUserSchema, UserAvatarResponse
from sciencelink.services.minio.uploads import UploadsService


class UsersService:
    def __init__(
            self,
            uploads_service: UploadsService = Depends(),
            session: Session = Depends(get_session)
    ):
        self.uploads_service = uploads_service
        self.session = session

    def _get(self, user_id: int, is_active: bool = True) -> tables.User:
        user = (
            self.session
            .query(tables.User)
            .options(joinedload(tables.User.owned_organizations))
            .options(joinedload(tables.User.educations).joinedload(tables.Education.institute))
            .filter_by(
                id=user_id,
                is_active=is_active,
            )
            .first()
        )
        if not user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='User does not exists')
        return user

    def get(self, user_id: int) -> tables.User:
        return self._get(user_id)

    def get_posts(self, user_id: int, skip: int = 0, limit: int = 30) -> List[tables.Post]:
        user = self._get(user_id)
        posts = (
            self.session
            .query(tables.Post)
            .filter_by(
                user_id=user.id,
                organization_id=None,
            )
            .order_by(tables.Post.created_at.desc())
            .offset(skip)
            .limit(limit)
            .all()
        )
        return posts

    def update_user(self, user_id: int, user_data: UpdateUserSchema) -> tables.User:
        user = self._get(user_id)
        for field, value in user_data:
            setattr(user, field, value)
        self.session.commit()
        return user

    def make_inactive(self, user_id: int):
        user = self._get(user_id)
        user.is_active = False
        self.session.commit()

    def make_active(self, user_id: int):
        user = self._get(user_id, is_active=False)
        user.is_active = True
        self.session.commit()

    def upload_avatar(
            self,
            user_id: int,
            file: UploadFile = File(...),
    ) -> UserAvatarResponse:
        user = self._get(user_id)
        file_path = self.uploads_service.upload_file(file)
        user.avatar_path = file_path
        self.session.commit()
        return UserAvatarResponse.from_orm(user)
