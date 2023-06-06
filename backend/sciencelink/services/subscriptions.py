from fastapi import Depends

from sciencelink.db import tables
from sciencelink.db.session import Session, get_session
from sciencelink.services.organizations import OrganizationsService
from sciencelink.services.users import UsersService


class SubscriptionsService:
    def __init__(
            self,
            session: Session = Depends(get_session),
            users_service: UsersService = Depends(),
            orgs_service: OrganizationsService = Depends(),
    ):
        self.session = session
        self.users_service = users_service
        self.orgs_service = orgs_service

    def _get_follower_and_followed_user(
            self, follower_id: int, followed_id: int
    ) -> (tables.User, tables.User):
        follower_user = self.users_service.get(follower_id)
        followed_user = self.users_service.get(followed_id)
        return follower_user, followed_user

    def _get_follower_and_followed_org(
            self, follower_id: int, followed_org_id: int
    ) -> (tables.User, tables.Organization):
        follower_user = self.users_service.get(follower_id)
        followed_org = self.orgs_service.get(followed_org_id)
        return follower_user, followed_org

    def _is_following_user(self, follower_id: int, followed_id: int) -> bool:
        return (
            self.session.query(tables.follower_user)
            .filter_by(
                follower_user_id=follower_id,
                followed_user_id=followed_id,
            )
            .count() > 0
        )

    def _is_following_org(self, follower_id: int, followed_org_id: int) -> bool:
        return (
            self.session.query(tables.follower_organization)
            .filter_by(
                follower_user_id=follower_id,
                followed_org_id=followed_org_id,
            )
            .count() > 0
        )

    def is_user_followed_user(self, follower_id: int, followed_id: int) -> bool:
        follower_user, followed_user = self._get_follower_and_followed_user(follower_id, followed_id)
        return self._is_following_user(follower_user.id, followed_user.id)

    def follow_user(self, follower_id: int, followed_id: int):
        follower_user, followed_user = self._get_follower_and_followed_user(follower_id, followed_id)
        if not self._is_following_user(follower_user.id, followed_user.id):
            follower_user.followed_users.append(followed_user)
            self.session.commit()

    def unfollow_user(self, follower_id: int, followed_id: int):
        follower_user, followed_user = self._get_follower_and_followed_user(follower_id, followed_id)
        if self._is_following_user(follower_user.id, followed_user.id):
            follower_user.followed_users.remove(followed_user)
            self.session.commit()

    def is_user_followed_org(self, follower_id: int, followed_org_id: int) -> bool:
        follower_user, followed_org = self._get_follower_and_followed_org(follower_id, followed_org_id)
        return self._is_following_org(follower_user.id, followed_org.id)

    def follow_org(self, follower_id: int, followed_org_id: int):
        follower_user, followed_org = self._get_follower_and_followed_org(follower_id, followed_org_id)
        if not self._is_following_org(follower_user.id, followed_org.id):
            follower_user.followed_orgs.append(followed_org)
            self.session.commit()

    def unfollow_org(self, follower_id: int, followed_org_id: int):
        follower_user, followed_org = self._get_follower_and_followed_org(follower_id, followed_org_id)
        if self._is_following_org(follower_user.id, followed_org.id):
            follower_user.followed_orgs.remove(followed_org)
            self.session.commit()
