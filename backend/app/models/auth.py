from datetime import datetime
from typing import TYPE_CHECKING

from sqlalchemy.ext.mutable import MutableDict, MutableList
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Boolean, String, JSON

from app.models._base import AbstractBase

if TYPE_CHECKING:
    pass


class User(AbstractBase):
    __tablename__ = "users"

    email: Mapped[str] = mapped_column(String, unique=True, index=True)
    password: Mapped[str]
    
    last_name: Mapped[str]
    first_name: Mapped[str]
    
    # Business Details
    industry: Mapped[str | None]
    year_founded: Mapped[int | None]
    business_name: Mapped[str | None]
    employee_count: Mapped[int | None]
    business_website: Mapped[str | None]
    business_address: Mapped[str | None]
    business_description: Mapped[str | None]
    business_phone_number: Mapped[str | None]
    
    business_tin: Mapped[str | None]
    business_cac_number: Mapped[str | None]
    business_registration_date: Mapped[datetime | None]
    business_directors: Mapped[list[dict[str, str]] | None] = mapped_column(
        MutableList.as_mutable(JSON), 
        default=None
    )
    
    documents: Mapped[dict[str, str] | None] = mapped_column(
        MutableDict.as_mutable(JSON), 
        default=None
    )
    
    bvn_is_verified: Mapped[bool] = mapped_column(Boolean, default=False, server_default="f")
    cac_is_verified: Mapped[bool] = mapped_column(Boolean, default=False, server_default="f")
    tin_is_verified: Mapped[bool] = mapped_column(Boolean, default=False, server_default="f")
    address_is_verified: Mapped[bool] = mapped_column(Boolean, default=False, server_default="f")
    
    @hybrid_property
    def score(self) -> float:
        return 70

