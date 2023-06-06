from fastapi import Depends
from sqlalchemy.orm import joinedload

from sciencelink.db import tables
from sciencelink.db.session import Session, get_session
from sciencelink.services.users import UsersService


class EducationService:
    def __init__(
            self,
            session: Session = Depends(get_session),
            users_service: UsersService = Depends(),
    ):
        self.session = session
        self.users_service = users_service

    def _get(self, edu_id) -> tables.Education:
        return (
            self.session.query(tables.Education)
            .filter_by(id=edu_id)
            .options(joinedload(tables.Education.user))
            .options(joinedload(tables.Education.institute))
            .first()
        )

    def get(self, edu_id) -> tables.Education:
        return self._get(edu_id)

    # def create(self, user_id, education_data: CreateEducationSchema) -> tables.Education:
    #     pass