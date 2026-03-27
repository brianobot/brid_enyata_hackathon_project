from contextlib import asynccontextmanager
from datetime import UTC, datetime

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.requests import Request
from fastapi.responses import JSONResponse
from slowapi import Limiter
from slowapi.util import get_remote_address
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.middleware.trustedhost import TrustedHostMiddleware

from app.logger import logger
from app.api_router import api
from app.settings import Settings
from app.utils import setup_s3_client
from app.middlewares import log_request_middleware

settings = Settings()  # type: ignore


@asynccontextmanager
async def lifespan(app: FastAPI):
    s3_gen = setup_s3_client()
    s3_client = await s3_gen.__anext__()
    app.state.s3_client = s3_client

    try:
        yield
    finally:
        try:
            await s3_gen.__anext__()
        except StopAsyncIteration:
            pass


def initiate_app():
    app = FastAPI(
        title="Interverify API",
        version="0.1.0",
        summary="Verify Business API",
        lifespan=lifespan,
    )

    origins = [
        # Add allowed origins here
        "http://localhost:4000",
        "http://localhost:5173",
        "https://interverify.netlify.app"
        "https://brid-enyata-hackathon-project.vercel.app",
    ]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # tweak this to see the most efficient size
    app.add_middleware(GZipMiddleware, minimum_size=100)
    app.add_middleware(
        TrustedHostMiddleware,
        allowed_hosts=[
            "test",
            "127.0.0.1",
            "localhost",
            # Add allowed hosts here
            "0551-102-90-98-19.ngrok-free.app",
            "brid-enyata-hackathon-project.onrender.com",
        ],
    )
    app.add_middleware(BaseHTTPMiddleware, dispatch=log_request_middleware)

    limiter = Limiter(key_func=get_remote_address)
    app.state.limiter = limiter

    app.include_router(api)
    return app


app = initiate_app()


@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "detail": exc.detail,
            "path": request.url.path,
            "timestamp": datetime.now(UTC).isoformat(),
        },
    )


@app.exception_handler(404)
async def custom_404_handler(request: Request, __: Exception):
    return JSONResponse(
        status_code=404,
        content={
            "detail": "This route does not exist",
            "path": request.url.path,
            "timestamp": datetime.now(UTC).isoformat(),
        },
    )


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unexpected error: {str(exc)}")

    return JSONResponse(
        status_code=500,
        content={
            "path": request.url.path,
            "detail": "An unexpected error occurred",
        },
    )
