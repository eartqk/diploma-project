from fastapi import (
    APIRouter,
    Depends,
    File,
    UploadFile,
)
from typing import List

# from ..models.auth import User
from ..models.uploads import UploadsListResponse
# from ..services.auth import get_current_user
from ..services.uploads import UploadsService

router = APIRouter(
    prefix='/uploads',
    tags=['uploads'],
)


# Temp API for testing features
@router.post('/', response_model=UploadsListResponse)
def create_upload_files(
        service: UploadsService = Depends(),
        files: List[UploadFile] = File(...),
        # add user,
):
    filenames = service.upload_files(files)
    return {'filenames': filenames}
