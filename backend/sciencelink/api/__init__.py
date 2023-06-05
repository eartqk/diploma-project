from fastapi import APIRouter

from . import (
    auth,
    institutes,
    countries,
    users,
    subscriptions,
    posts,
)


router = APIRouter()
router.include_router(auth.router)
router.include_router(users.router)
router.include_router(subscriptions.router)
router.include_router(posts.router)
router.include_router(institutes.router)
router.include_router(countries.router)
