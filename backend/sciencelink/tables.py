import sqlalchemy as sa
from sqlalchemy.ext.declarative import declarative_base

from .database import Base
from .database import engine


class User(Base):
    __tablename__ = 'users'

    id = sa.Column(sa.Integer, primary_key=True)
    email = sa.Column(sa.Text, unique=True)
    username = sa.Column(sa.Text, unique=True)
    password_hash = sa.Column(sa.Text)


Base.metadata.create_all(bind=engine)  # Not a very good solution
