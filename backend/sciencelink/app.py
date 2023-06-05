from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

from .api import router


app = FastAPI(
    title='ScienceLink',
    description='Backend-API for diploma project',
    version='1.0.0',
)

origins = [
    "http://localhost:5173",
    "http://localhost:8000",
    "http://localhost",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:8000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
