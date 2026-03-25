from enum import StrEnum

from pydantic import BaseModel


class UploadTarget(StrEnum):
    TESTS = "TESTS"  # this is here specially for support tests and not polluting the real object on aws
    IDENTIFICATION_CARD = "IDENTIFICATION_CARD"


class FileUploadResponse(BaseModel):
    url: str
