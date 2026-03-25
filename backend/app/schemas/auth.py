from datetime import datetime
from typing import Annotated
from uuid import UUID

from pydantic import AfterValidator, BaseModel, EmailStr, Field, model_validator


class Token(BaseModel):
    token_type: str
    access_token: str
    refresh_token: str
    access_expires_at: datetime | None = None
    refresh_expires_at: datetime | None = None


class TokenData(BaseModel):
    username: str


class RefreshTokenModel(BaseModel):
    refresh_token: Annotated[str, Field(min_length=32)]


class UserSignUpData(BaseModel):
    last_name: Annotated[str, Field(max_length=100)]
    first_name: Annotated[str, Field(max_length=100)]
    business_name: Annotated[str, Field(max_length=255)]
    password: Annotated[str, Field(min_length=8, max_length=50)]
    email: Annotated[EmailStr, Field(max_length=254), AfterValidator(str.lower)]


class UserVerificationModel(BaseModel):
    email: EmailStr
    code: Annotated[str, Field(min_length=6, max_length=6)]


class PasswordResetData(BaseModel):
    code: str
    email: Annotated[EmailStr, Field(max_length=254), AfterValidator(str.lower)]
    new_password: Annotated[str, Field(min_length=8)]


class UserSignInData(BaseModel):
    email: Annotated[EmailStr, Field(max_length=100), AfterValidator(str.lower)]
    password: Annotated[str, Field(min_length=8)]


class UserModel(BaseModel):
    id: UUID

    email: EmailStr
    last_name: str
    first_name: str
    
    business_name: str
    
    date_created: datetime
    date_updated: datetime


class UserDetailModel(UserModel):
    industry: str | None
    year_founded: int | None
    employee_count: int | None
    business_website: str | None
    business_address: str | None
    business_description: str | None
    business_phone_number: str | None
    
    business_tin: str | None
    business_cac_number: str | None
    documents: dict[str, str] | None
    business_registration_date: datetime | None
    business_directors: list[dict[str, str]] | None
    

class UpdateUserModel(BaseModel):
    business_name: Annotated[str | None, Field(max_length=255)] = None
    old_password: Annotated[str | None, Field(min_length=8)] = None
    new_password: Annotated[str | None, Field(min_length=8)] = None
    first_name: Annotated[str | None, Field(max_length=100)] = None
    last_name: Annotated[str | None, Field(max_length=100)] = None
    
    industry: str | None = None
    year_founded: int | None = None
    employee_count: int | None = None
    business_website: str | None = None
    business_address: str | None = None
    business_description: str | None = None
    business_phone_number: str | None = None
    
    business_tin: str | None = None
    business_cac_number: str | None = None
    documents: dict[str, str] | None = None
    business_registration_date: datetime | None = None
    business_directors: list[dict[str, str]] | None = None
    
    @model_validator(mode="after")
    def check_password_dependency(self) -> "UpdateUserModel":
        if self.new_password and not self.old_password:
            raise ValueError("old_password is required if new_password is provided.")
        return self
