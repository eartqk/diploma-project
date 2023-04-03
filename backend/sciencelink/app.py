from fastapi import FastAPI

from .api import router


app = FastAPI(
    title='ScienceLink',
    description='Backend-API for diploma project',
    version='1.0.0',
)
app.include_router(router)
