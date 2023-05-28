from typing import List

from fastapi import APIRouter, Depends

from sciencelink.models.institutes import InstituteSchema
from sciencelink.services.institutes import InstitutesService


router = APIRouter(
    prefix='/institutes',
    tags=['institutes'],
)


@router.get('/', response_model=List[InstituteSchema])
def get_institutes(service: InstitutesService = Depends()):
    return service.get_institutes()
