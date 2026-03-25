from sqlalchemy.ext.asyncio import AsyncSession


async def search_business(keyword: str, session: AsyncSession):
    return {
        "count": 4,
        "total_pages": 1,
        "results": [
            {
                "name": "Sample Business Name",
                "year_fouded": 2010,
                "email": "business@jot.com",
                "phone_number": "07018977031",
                "address": "No 2345 Alien Highway",
            },
            {
                "name": "Sample Business Name",
                "year_fouded": 2010,
                "email": "business@jot.com",
                "phone_number": "07018977031",
                "address": "No 2345 Alien Highway",
            },
            {
                "name": "Sample Business Name",
                "year_fouded": 2010,
                "email": "business@jot.com",
                "phone_number": "07018977031",
                "address": "No 2345 Alien Highway",
            },
            {
                "name": "Sample Business Name",
                "year_fouded": 2010,
                "email": "business@jot.com",
                "phone_number": "07018977031",
                "address": "No 2345 Alien Highway",
            },
        ]
    }