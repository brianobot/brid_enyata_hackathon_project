from fastapi import APIRouter

from app.routers.auth import router as auth_router
from app.routers.business import router as business_router

api = APIRouter(prefix="/v1")


api.include_router(auth_router)
api.include_router(business_router)
