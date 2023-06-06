import os

from pydantic import BaseSettings


class Settings(BaseSettings):
    # JWT
    jwt_secret: str = os.environ.get('JWT_SECRET', default='dont_use_this_key')
    jwt_algorithm: str = os.environ.get('JWT_ALGORITHM', default='HS256')
    jwt_expiration: int = os.environ.get('JWT_EXPIRATION', default=3600)

    # DB
    database_url: str = os.environ.get(
        'DATABASE_URL',
        default='postgresql://postgres:postgres@127.0.0.1:5440/sciencelink',
    )

    # MinIO
    minio_user: str = os.environ.get('MINIO_ROOT_USER', default='minio_user')
    minio_password: str = os.environ.get('MINIO_ROOT_PASSWORD', default='minio_password')
    minio_host: str = os.environ.get('MINIO_HOST', default='127.0.0.1:9000')

    # ElasticSearch
    es_user: str = os.environ.get('ELASTIC_USERNAME', default='admin')
    es_password: str = os.environ.get('ELASTIC_PASSWORD', default='password')


settings = Settings()
