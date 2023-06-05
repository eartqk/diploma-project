from fastapi import Depends

from sciencelink.db.session import Session, get_session
from sciencelink.services.users import UsersService


class SubscriptionsService:
    def __init__(
            self,
            session: Session = Depends(get_session),
            users_service: UsersService = Depends(),
    ):
        self.session = session
        self.users_service = users_service

    def _get_follower_and_followed_user(self, follower_id: int, followed_id: int):  # TODO: Optimize queries
        follower_user = self.users_service.get(follower_id)
        followed_user = self.users_service.get(followed_id)
        return follower_user, followed_user

    # def _get_follower_and_followed_org(self, follower_id: int, followed_org_id: int):
    #     follower_user = self.users_service.get(follower_id)
    #     followed_org = self.users_service.get(followed_id)
    #     return follower_user, followed_user

    def is_user_followed_user(self, follower_id: int, followed_id: int) -> bool:
        follower_user, followed_user = self._get_follower_and_followed_user(follower_id, followed_id)
        return follower_user.is_following_user(followed_user)

    def follow_user(self, follower_id: int, followed_id: int):
        follower_user, followed_user = self._get_follower_and_followed_user(follower_id, followed_id)
        follower_user.follow_user(followed_user)
        self.session.commit()

    def unfollow_user(self, follower_id: int, followed_id: int):
        follower_user, followed_user = self._get_follower_and_followed_user(follower_id, followed_id)
        follower_user.unfollow_user(followed_user)
        self.session.commit()

    def is_user_followed_org(self) -> bool:
        pass

    def follow_org(self):
        pass

    def unfollow_org(self):
        pass
