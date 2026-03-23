import base64

from typing import Any
from httpx import AsyncClient

from app.settings import Settings
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
    auth_url = "https://qa.interswitchng.com/passport/oauth/token?grant_type=client_credentials"
    response = await client.post(
        auth_url,
        data=payload,
        headers=headers
    )
    
    response_data = response.json()
    return response_data.get("access_token"), response_data.get("expires_in")
    
    
async def make_auth_request(client: AsyncClient, url: str, method: str, data: dict[str, Any]):
    access_token = redis_manager.get_json_item("interswitch-xxx-files", {}).get("value") # type: ignore
    if not access_token:
        access_token, ttl = await get_access_token(client)
        redis_manager.cache_json_item("interswitch-xxx-files", {"value": access_token}, ttl=ttl)
    
    request_method = getattr(client, method, client.post)
    response = await request_method(
        url, 
        data=data, 
        headers={"Authorization": f"Bearer {access_token}"},
    )
    return response.json
    

async def main():
    async with AsyncClient() as client:
        access_token = await get_access_token(client)
        print("Valid Access Token: ", access_token is not None)
    

if __name__ == "__main__":
    import asyncio
    asyncio.run(main())