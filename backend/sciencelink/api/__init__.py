from fastapi import APIRouter

from . import (
    auth,
    institutes,
    countries,
    users,
    posts
)


router = APIRouter()
router.include_router(auth.router)
router.include_router(users.router)
router.include_router(posts.router)
router.include_router(institutes.router)
router.include_router(countries.router)
# router.include_router(uploads.router)