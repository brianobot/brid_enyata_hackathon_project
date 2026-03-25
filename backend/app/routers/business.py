from typing import Annotated

from fastapi.routing import APIRouter
from pydantic import EmailStr, ValidationError
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi.security import OAuth2PasswordRequestForm
from fastapi import BackgroundTasks, Body, Depends, HTTPException, status

from app.settings import Settings
from app.models import User as UserDB
from app.dependencies import get_current_user, get_db
from app.services import business as business_services

settings = Settings()  # type: ignore

router = APIRouter(prefix="/businesses", tags=["Business"])


# Declare Depends for better reusuabilty
DBDep = Annotated[AsyncSession, Depends(get_db)]
EmailBody = Annotated[EmailStr, Body(embed=True)]
CurrentUserDep = Annotated[UserDB, Depends(get_current_user)]


@router.get("/search")
async def search_businesses(keyword: str, db: DBDep):
    return await business_services.search_business(keyword, db)
    

@router.get("/verification/score")
async def get_business_verification_score(user: CurrentUserDep):
    return await business_services.get_verification_score(user)
    
    
@router.post("/verification/cac")
async def verify_business_cac(user: CurrentUserDep):
    return await business_services.verify_cac(user)


@router.post("/verification/tin")
async def verify_business_tin(user: CurrentUserDep):
    return await business_services.verify_tin(user)


@router.post("/verification/bvn")
async def verify_business_bvn(user: CurrentUserDep):
    return await business_services.verify_bvn(user)
    

@router.post("/verification/directors")
async def verify_business_directors(user: CurrentUserDep):
    return await business_services.verify_directors(user)
