from typing import List

from fastapi import Depends

from sciencelink.db import tables
from sciencelink.db.session import Session, get_session
from sciencelink.models.countries import CountrySchema


class CountriesService:
    def __init__(self, session: Session = Depends(get_session)):
        self.session = session

    def get_countries(self) -> List[tables.Country]:
        return self.session.query(tables.Country).all()
    