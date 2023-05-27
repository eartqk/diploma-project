from typing import List

from fastapi import APIRouter, Depends

from sciencelink.models.countries import Country
from sciencelink.services.countries import CountriesService


router = APIRouter(
    prefix='/countries',
    tags=['countries'],
)


@router.get('/', response_model=List[Country])
def get_countries(service: CountriesService = Depends()):
    return service.get_countries()
