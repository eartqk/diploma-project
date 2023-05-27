from typing import List

from fastapi import Depends

from sciencelink.db import tables
from sciencelink.db.session import Session, get_session
from sciencelink.models.countries import Country


class CountriesService:
    def __init__(self, session: Session = Depends(get_session)):
        self.session = session

    def get_countries(self) -> List[Country]:
        return self.session.query(tables.Country).all()
    