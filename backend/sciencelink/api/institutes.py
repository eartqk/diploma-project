from typing import List

from fastapi import APIRouter, Depends

from sciencelink.models.institutes import Institute
from sciencelink.services.institutes import InstitutesService


router = APIRouter(
    prefix='/institutes',
    tags=['institutes'],
)


@router.get('/', response_model=List[Institute])
def get_institutes(service: InstitutesService = Depends()):
    return service.get_institutes()
