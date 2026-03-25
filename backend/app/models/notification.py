from typing import TYPE_CHECKING
from uuid import UUID as UUID_TYPE

from sqlalchemy import UUID, Boolean, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models._base import AbstractBase

if TYPE_CHECKING:
    from app.models import User



class Notification(AbstractBase):
    __tablename__ = "notifications"
    
    is_read: Mapped[bool] = mapped_column(Boolean, default=False, server_default="f")
    
    user_id: Mapped[UUID_TYPE] = mapped_column(
        UUID, 
        ForeignKey("users.id", ondelete="cascade")
    )
    user: Mapped["User"] = relationship(
        "User", 
        back_populates="notifications"
    )