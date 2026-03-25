from typing import Annotated

from fastapi import APIRouter, Body, File, UploadFile
from fastapi.requests import Request

from app.schemas import misc as misc_schemas
from app.services import misc as misc_services

router = APIRouter(prefix="/misc", tags=["Misc"])


@router.post("/upload")
async def upload_file(
    request: Request,
    file: Annotated[UploadFile, File(...)],
    upload_target: Annotated[misc_schemas.UploadTarget, Body()],
):
    s3_client = request.app.state.s3_client
    return await misc_services.file_upload(
        file=file, upload_target=upload_target, client=s3_client
    )
