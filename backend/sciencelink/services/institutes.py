from typing import List

from fastapi import Depends

from sciencelink.db import tables
from sciencelink.db.session import Session, get_session
from sciencelink.models.institutes import Institute


class InstitutesService:
    def __init__(self, session: Session = Depends(get_session)):
        self.session = session

    def get_institutes(self) -> List[Institute]:
        return self.session.query(tables.Institute).all()
