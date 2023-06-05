from typing import List

from fastapi import APIRouter, Depends

from sciencelink.models.organizations import OrganizationResponseSchema
from sciencelink.models.posts import PostResponseSchema
from sciencelink.models.users import UserShortResponseSchema
from sciencelink.services.organizations import OrganizationsService

# OrganizationResponseSchema

router = APIRouter(
    prefix='/organizations',
    tags=['organizations'],
)


@router.get('/', response_model=List[OrganizationResponseSchema])
def get_organizations(
        skip: int = 0, limit: int = 30, service: OrganizationsService = Depends()
):
    return service.get_organizations(skip, limit)


@router.get('/{org_id}', response_model=OrganizationResponseSchema)
def get_organization(
        org_id: int, service: OrganizationsService = Depends()
):
    return service.get(org_id)


@router.get('/{org_id}/posts', response_model=List[PostResponseSchema])
def get_organization_posts(
        org_id: int, skip: int = 0, limit: int = 30, service: OrganizationsService = Depends()
):
    return service.get_org_posts(org_id, skip, limit)


@router.get('/{org_id}/followers', response_model=List[UserShortResponseSchema])
def get_organization_followers(
        org_id: int, service: OrganizationsService = Depends()
):
    return service.get_org_followers(org_id)