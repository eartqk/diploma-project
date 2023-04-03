import os

from pydantic import BaseSettings


class Settings(BaseSettings):
    server_host: str = os.environ.get('SERVER_HOST', '127.0.0.1')
    server_port: int = os.environ.get('SERVER_PORT', '8000')
    
    jwt_secret: str = os.environ.get('JWT_SECRET', None)
    jwt_algorithm: str = os.environ.get('JWT_ALGORITHM', 'HS256')
    jwt_expiration: int = os.environ.get('JWT_EXPIRATION', 3600)

    if not jwt_secret:
        raise ValueError('Missing or empty JWT_SECRET environment variable')

    database_url: str = os.environ.get('DATABASE_URL', None)

    if not database_url:
        raise ValueError('Missing or empty DATABASE_URL environment variable')


settings = Settings()
