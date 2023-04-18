from pydantic import BaseModel
from typing import List


class UploadsListResponse(BaseModel):
    filenames: List[str]

