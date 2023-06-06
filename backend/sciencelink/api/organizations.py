from typing import List

from fastapi import APIRouter, Depends, File, UploadFile, status
from fastapi.openapi.models import Response

from sciencelink.models.auth import UserAuthSchema
from sciencelink.models.organizations import (
    CreateOrganizationSchema,
    OrganizationAvatarResponse,
    OrganizationResponseSchema,
    UpdateOrganizationSchema,
)
from sciencelink.models.posts import PostResponseSchema
from sciencelink.models.users import UserShortResponseSchema
from sciencelink.services.auth import get_current_user_from_cookies
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
    return service.get_with_details(org_id)


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


@router.post('/', response_model=OrganizationResponseSchema)
def create_organization(
        org_data: CreateOrganizationSchema,
        user: UserAuthSchema = Depends(get_current_user_from_cookies),
        service: OrganizationsService = Depends(),
):
    return service.create_organization(user.id, org_data)


@router.put('/{org_id}', response_model=OrganizationResponseSchema)
def update_organization(
        org_id: int,
        org_data: UpdateOrganizationSchema,
        user: UserAuthSchema = Depends(get_current_user_from_cookies),
        service: OrganizationsService = Depends(),
):
    return service.update_organization(user.id, org_id, org_data)


@router.put('/{org_id}/avatar', response_model=OrganizationAvatarResponse)
def upload_avatar(
        org_id: int,
        avatar_file: UploadFile | None = File(...),
        user: UserAuthSchema = Depends(get_current_user_from_cookies),
        service: OrganizationsService = Depends(),
):
    return service.upload_avatar(user.id, org_id, avatar_file)


# @router.delete('/organizations/{org_id}')
# def delete_organization(
#         org_id: int,
#         user: UserAuthSchema = Depends(get_current_user_from_cookies),
#         service: OrganizationsService = Depends(),
# ):
#     service.delete_org(user.id, org_id)
#     return Response(status=status.HTTP_204_NO_CONTENT, description='The organization deleted')
