from aiobotocore.config import AioConfig
from aiobotocore.session import get_session

from app.settings import Settings

settings = Settings()  # type: ignore


async def setup_s3_client():
    session = get_session()
    config = AioConfig(
        retries={"max_attempts": 3},
        max_pool_connections=50,
        connect_timeout=30,
        read_timeout=300,
    )
    async with session.create_client(
        "s3",
        config=config,
        region_name=settings.AWS_REGION,
        aws_access_key_id=settings.AWS_ACCESS_KEY,
        aws_secret_access_key=settings.AWS_SECRET_KEY,
    ) as client:
        yield client
