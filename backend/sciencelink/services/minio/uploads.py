import json
from fastapi import (
    File,
    UploadFile,
    HTTPException
)
from minio import Minio
from minio.error import S3Error
from uuid import uuid4
from typing import List

from sciencelink.settings import settings
from .policies import media_download_policy


class UploadsService:
    def __init__(self):
        self.client = Minio(
            settings.minio_host,
            access_key=settings.minio_user,
            secret_key=settings.minio_password,
            secure=False,
        )

        if not self.client.bucket_exists('media'):
            self.client.make_bucket('media')
            self.client.set_bucket_policy('media', json.dumps(media_download_policy))

    def _upload(self, file: UploadFile = File(...)) -> str:
        file_ext = file.filename.split('.')[-1]
        if file_ext not in ['jpg', 'jpeg', 'png', 'mp4']:
            raise HTTPException(status_code=400, detail='File type not allowed.')

        new_filename = uuid4().hex + '.' + file_ext

        try:
            response = self.client.put_object(
                bucket_name='media',
                object_name=new_filename,
                data=file.file,
                length=file.size,
                content_type=file.content_type,
                metadata={'x-amz-meta-public': 'true'},
            )

            return response.object_name
        except S3Error:
            raise HTTPException(status_code=500, detail='Failed to upload file.')

    def upload_file(self, file: UploadFile = File(...)) -> List[str]:
        filename = self._upload(file)
        return [filename]

    def upload_files(self, files: List[UploadFile] = File(...)) -> List[str]:
        filenames = []
        for file in files:
            name = self._upload(file)
            filenames.append(name)
        return filenames
