from typing import Annotated

from fastapi import BackgroundTasks, Body, Depends, HTTPException, status
from fastapi.routing import APIRouter
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import EmailStr, ValidationError
from sqlalchemy.ext.asyncio import AsyncSession

from app.dependencies import get_current_user, get_db
from app.models import User as UserDB
from app.schemas import business as business_schemas
from app.services import business as business_services
from app.settings import Settings

settings = Settings()  # type: ignore

router = APIRouter(prefix="/businesses", tags=["Business"])


# Declare Depends for better reusuabilty
DBDep = Annotated[AsyncSession, Depends(get_db)]
EmailBody = Annotated[EmailStr, Body(embed=True)]
CurrentUserDep = Annotated[UserDB, Depends(get_current_user)]


@router.get("/search")
async def search_businesses(keyword: str, db: DBDep):
    return await business_services.search_business(keyword, db)