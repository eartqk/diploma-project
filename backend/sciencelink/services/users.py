from typing import List

from fastapi import Depends, HTTPException, status

from sciencelink.db import tables
from sciencelink.db.session import Session, get_session
from sciencelink.models.users import UpdateUserSchema


class UsersService:
    def __init__(self, session: Session = Depends(get_session)):
        self.session = session

    def _get(self, user_id: int) -> tables.User:
        user = (
            self.session
            .query(tables.User)
            .filter_by(
                id=user_id,
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
                user_id=user_id,
            )
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

    def delete_user(self, user_id: int):
        user = self._get(user_id)
        self.session.delete(user) # fix
        self.session.commit()
