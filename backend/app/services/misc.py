import uuid
from typing import BinaryIO, cast

from fastapi import HTTPException, UploadFile, status
from types_aiobotocore_s3 import S3Client

from app.logger import logger
from app.schemas import misc as misc_schemas
from app.settings import Settings

settings = Settings()  # type: ignore


UPLOAD_PREFIXES: dict = {
    misc_schemas.UploadTarget.IDENTIFICATION_CARD: "IDENTIFICATION_CARD",
    misc_schemas.UploadTarget.TESTS: "TESTS",
}


async def upload_large_file(
    client: S3Client, file: BinaryIO, bucket_name: str, file_key: str
):
    mpu = await client.create_multipart_upload(Bucket=bucket_name, Key=file_key)
    part_size = 8 * 1024 * 1024  # 8MB chunks
    parts = []

    try:
        part_number = 1
        while True:
            data = file.read(part_size)
            if not data:
                break

            part = await client.upload_part(
                Bucket=bucket_name,
                Key=file_key,
                PartNumber=part_number,
                UploadId=mpu["UploadId"],
                Body=data,
            )
            parts.append({"PartNumber": part_number, "ETag": part["ETag"]})
            part_number += 1

        await client.complete_multipart_upload(
            Bucket=bucket_name,
            Key=file_key,
            UploadId=mpu["UploadId"],
            MultipartUpload={"Parts": parts},
        )
    except Exception as err:
        logger.error("🔥 Error Occurred While Uploading Large File: ", err)
        await client.abort_multipart_upload(...)
        raise


async def file_upload(
    file: UploadFile,
    client: S3Client,
    upload_target: misc_schemas.UploadTarget,
    chunk_size: int = 8 * 1024 * 1024,  # 8MB chunks
) -> misc_schemas.FileUploadResponse:
    filename = str(uuid.uuid4()) + "_" + cast(str, file.filename)
    file_key = (
        f"{UPLOAD_PREFIXES.get(upload_target, 'FILE')}/{filename.replace(' ', '_')}"
    )

    inner_file = file.file
    inner_file.seek(0, 2)
    file_size = inner_file.tell()
    inner_file.seek(0)

    try:
        if file_size > chunk_size:
            await upload_large_file(
                client, inner_file, settings.AWS_BUCKET_NAME, file_key
            )
        else:
            await client.put_object(
                Bucket=settings.AWS_BUCKET_NAME, Key=file_key, Body=inner_file
            )

    except Exception as err:
        logger.info(err)
        logger.error(f"Error Uploading File: Upload Status {err}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred while uploading the file",
        )
    else:
        file_url = f"{settings.CLOUD_FRONT_URL}/{file_key}"
        return misc_schemas.FileUploadResponse(url=file_url)
