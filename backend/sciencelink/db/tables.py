from __future__ import annotations

from datetime import date
from typing import List

from sqlalchemy import Text, String, Date, Integer, Boolean
from sqlalchemy import Table, Column, ForeignKey
from sqlalchemy.orm import mapped_column, Mapped, relationship, backref
from sqlalchemy.sql import expression

from .base import Base, DefaultIdBase, CreateTimestampMixin, UpdateTimestampMixin


follower_user = Table(
    'follower_user', Base.metadata,
    Column('follower_user_id', Integer, ForeignKey('user.id'), primary_key=True),
    Column('followed_user_id', Integer, ForeignKey('user.id'), primary_key=True),
)


follower_organization = Table(
    'follower_organization', Base.metadata,
    Column('follower_user_id', Integer, ForeignKey('user.id'), primary_key=True),
    Column('followed_org_id', Integer, ForeignKey('organization.id'), primary_key=True),
)


class User(DefaultIdBase, CreateTimestampMixin):
    __tablename__ = 'user'

    id: Mapped[int] = mapped_column(primary_key=True)

    email: Mapped[str] = mapped_column(String(256), unique=True)
    username: Mapped[str] = mapped_column(String(64), unique=True)
    name: Mapped[str] = mapped_column(String(64))
    surname: Mapped[str] = mapped_column(String(64))
    password_hash: Mapped[str] = mapped_column(String(60))
    about: Mapped[str | None] = mapped_column(Text)  # Limit 512
    birthday: Mapped[date | None] = mapped_column(Date)
    avatar_path: Mapped[str | None] = mapped_column(String(64))  # 37 needed
    is_active: Mapped[bool] = mapped_column(Boolean, server_default=expression.true())

    country_id: Mapped[int | None] = mapped_column(ForeignKey('country.id'))
    country: Mapped[Country | None] = relationship(back_populates='users', lazy='joined')

    owned_organizations: Mapped[List['Organization'] | None] = relationship(back_populates='owner', lazy='joined')
    educations: Mapped[List['Education'] | None] = relationship(back_populates='user', lazy='joined')
    posts: Mapped[List['Post'] | None] = relationship(back_populates='user')
    comments: Mapped[List['Comment'] | None] = relationship(back_populates='user')
    reactions: Mapped[List['Reaction'] | None] = relationship(back_populates='user')

    followed_users: Mapped[List['User']] = relationship(
        secondary=follower_user,
        primaryjoin=(follower_user.c.follower_user_id == id),
        secondaryjoin=(follower_user.c.followed_user_id == id),
        backref=backref('followers', lazy='dynamic'), lazy='dynamic',  # TODO: Rewrite without dynamic
    )

    followed_orgs: Mapped[List['Organization'] | None] = relationship(
        secondary=follower_organization, back_populates='followers',
        lazy='dynamic',  # TODO: Rewrite without dynamic
    )

    def is_following_user(self, user):
        return self.followed_users.filter(
            follower_user.c.followed_user_id == user.id
        ).count() > 0

    def is_following_org(self, org):
        return self.followed_orgs.filter(
            follower_organization.c.followed_org_id == org.id
        ).count() > 0

    def follow_user(self, user):
        if not self.is_following_user(user):
            self.followed_users.append(user)

    def unfollow_user(self, user):
        if self.is_following_user(user):
            self.followed_users.remove(user)

    def follow_org(self, org):
        if not self.is_following_org(org):
            self.followed_orgs.append(org)

    def unfollow_org(self, org):
        if self.is_following_org(org):
            self.followed_orgs.remove(org)


class Organization(DefaultIdBase, CreateTimestampMixin):
    __tablename__ = 'organization'

    name: Mapped[str] = mapped_column(String(64))
    about: Mapped[str | None] = mapped_column(Text)  # Limit 512
    avatar_path: Mapped[str | None] = mapped_column(String(64))  # 37 needed

    institute_id: Mapped[int | None] = mapped_column(ForeignKey('institute.id'))
    institute: Mapped[Institute | None] = relationship(back_populates='organizations', lazy='joined')

    owner_id: Mapped[int] = mapped_column(ForeignKey('user.id'))
    owner: Mapped['User'] = relationship(back_populates='owned_organizations', lazy='joined')

    country_id: Mapped[int | None] = mapped_column(ForeignKey('country.id'))
    country: Mapped[Country | None] = relationship(back_populates='organizations', lazy='joined')

    posts: Mapped['Post'] = relationship(back_populates='organization')

    followers: Mapped[List['User'] | None] = relationship(
        secondary=follower_organization, back_populates='followed_orgs',
    )


class Post(DefaultIdBase, CreateTimestampMixin, UpdateTimestampMixin):
    __tablename__ = 'post'

    body: Mapped[str] = mapped_column(Text)

    organization_id: Mapped[int | None] = mapped_column(ForeignKey('organization.id'))
    organization: Mapped[Organization | None] = relationship(back_populates='posts', lazy='joined')

    user_id: Mapped[int] = mapped_column(ForeignKey('user.id'))
    user: Mapped['User'] = relationship(back_populates='posts', lazy='joined')

    comments: Mapped[List['Comment'] | None] = relationship(back_populates='post', )
    attachments: Mapped[List['Attachment'] | None] = relationship(back_populates='post', lazy='joined')
    reactions: Mapped[List['Reaction'] | None] = relationship(back_populates='post')


class Attachment(DefaultIdBase, CreateTimestampMixin):
    __tablename__ = 'attachment'

    post_id: Mapped[int] = mapped_column(ForeignKey('post.id'))
    post: Mapped['Post'] = relationship(back_populates='attachments')

    path: Mapped[str] = mapped_column(String(64))


class Comment(DefaultIdBase, CreateTimestampMixin):
    """
    Table that links Users and Posts tables
    Users-Comments-Posts
    """
    __tablename__ = 'comment'

    post_id: Mapped[int] = mapped_column(ForeignKey('post.id'))
    post: Mapped['Post'] = relationship(back_populates='comments')

    user_id: Mapped[int] = mapped_column(ForeignKey('user.id'))
    user: Mapped['User'] = relationship(back_populates='comments', lazy='joined')

    body: Mapped[str] = mapped_column(Text)


class Reaction(DefaultIdBase):
    """
    Table that links Users and Posts tables
    Users - Reactions - Posts
    """
    __tablename__ = 'reaction'

    post_id: Mapped[int] = mapped_column(ForeignKey('post.id'))
    post: Mapped['Post'] = relationship(back_populates='reactions')

    user_id: Mapped[int] = mapped_column(ForeignKey('user.id'))
    user: Mapped['User'] = relationship(back_populates='reactions', lazy='joined')

    like: Mapped[bool] = mapped_column(Boolean, default=1)


class Country(DefaultIdBase):
    __tablename__ = 'country'

    name: Mapped[str] = mapped_column(String(64))

    users: Mapped[List['User'] | None] = relationship(back_populates='country')
    organizations: Mapped[List['Organization'] | None] = relationship(back_populates='country')


class Institute(DefaultIdBase):
    __tablename__ = 'institute'

    name: Mapped[str] = mapped_column(String(128))

    organizations: Mapped[List['Organization'] | None] = relationship(back_populates='institute')
    educations: Mapped[List['Education'] | None] = relationship(back_populates='institute')


class Education(DefaultIdBase):
    __tablename__ = 'education'

    user_id: Mapped[int] = mapped_column(ForeignKey('user.id'))
    user: Mapped['User'] = relationship(back_populates='educations')

    entrance_year: Mapped[int] = mapped_column()
    graduation_year: Mapped[int | None] = mapped_column()
    academic_position: Mapped[str | None] = mapped_column(String(64))
    name: Mapped[str] = mapped_column(String(64))
    about: Mapped[str | None] = mapped_column(String(128))

    institute_id: Mapped[int | None] = mapped_column(ForeignKey('institute.id'))
    institute: Mapped[Institute | None] = relationship(back_populates='educations')
