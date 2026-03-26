import base64

from typing import Any
from httpx import AsyncClient

from app.settings import Settings
from app.models import User as UserDB
from app.redis_manager import redis_manager

settings = Settings() # type: ignore


INTERSWITCH_CLIENT_ID = settings.INTERSWITCH_CLIENT_ID
INTERSWITCH_CLIENT_SECRET = settings.INTERSWITCH_CLIENT_SECRET


async def auth_headers():
    concat_str = f"{INTERSWITCH_CLIENT_ID}:{INTERSWITCH_CLIENT_SECRET}".encode('utf-8')
    encoded_client_data = base64.b64encode(concat_str).decode("utf-8")
    return {
        "Authorization": f"Basic {encoded_client_data}",
        "Content-Type": "application/x-www-form-urlencoded"
    }
    

async def get_access_token(client: AsyncClient):
    headers = await auth_headers()
    payload = {"grant_type": "client_credentials"}
    auth_url = "https://passport-v2.k8.isw.la/passport/oauth/token?grant_type=client_credentials"
    response = await client.post(
        auth_url,
        data=payload,
        headers=headers
    )
    
    response_data = response.json()
    return response_data.get("access_token"), response_data.get("expires_in")
    
    
async def make_auth_request(client: AsyncClient, url: str, method: str, data: dict[str, Any] | None = None):
    access_token = redis_manager.get_json_item("interswitch-xxx-files", {}).get("value") # type: ignore
    if not access_token:
        print("⚠️ Fetching Access Token From the Server")
        access_token, ttl = await get_access_token(client)
        redis_manager.cache_json_item("interswitch-xxx-files", {"value": access_token}, ttl=ttl)
    
    request_method = getattr(client, method, client.post)
    request_kwargs = {
        "headers": {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {access_token}"
        }
    }
    
    if data:
        request_kwargs["json"] = data
        
    response = await request_method(
        url, 
        **request_kwargs # type: ignore
    )
    return response.json()
    

async def verify_nin(client: AsyncClient, nin: str, first_name: str, last_name: str):
    payload = {
        "nin": nin,
        "lastName": last_name,
        "firstName": first_name,
    }
    url = "https://api-marketplace-routing.k8.isw.la/marketplace-routing/api/v1/verify/identity/nin"
    return await make_auth_request(client, url, "post", payload)


async def verify_cac(client: AsyncClient, company_name: str):
    url = f"https://api-marketplace-routing.k8.isw.la/marketplace-routing/api/v1/verify/identity/cac-lookup?companyName={company_name}"
    return await make_auth_request(client, url, "get")


async def verify_bvn(client: AsyncClient, bvn: str):
    url = f"https://api-marketplace-routing.k8.isw.la/marketplace-routing/api/v1/verify/identity/cac-lookup?companyName={company_name}"
    return await make_auth_request(client, url, "get")
    

async def verify_business(user: UserDB):
    # run all the checks needed to verify a business here
    pass
    
    
async def main():
    async with AsyncClient(timeout=20) as client:
        # access_token = await get_access_token(client)
        # print("Access Token: ", access_token)
        response = await verify_cac(client, "Neem")
        print("Response: ", response)


if __name__ == "__main__":
    import asyncio
    asyncio.run(main())