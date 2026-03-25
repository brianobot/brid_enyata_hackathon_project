from typing import TYPE_CHECKING

from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from app.models._base import AbstractBase

if TYPE_CHECKING:
    pass


class User(AbstractBase):
    __tablename__ = "users"

    email: Mapped[str] = mapped_column(String, unique=True, index=True)
    password: Mapped[str]
    
    last_name: Mapped[str]
    first_name: Mapped[str]
    business_name: Mapped[str]
    

