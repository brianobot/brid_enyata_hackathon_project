from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models import User as UserDB


async def search_business(keyword: str, session: AsyncSession):
    stmt = select(UserDB).where(UserDB.business_name.contains(keyword))
    results = (await session.execute(stmt)).scalars().all()
    
    return {
        "count": 4,
        "total_pages": 1,
        "results": list(results) + [
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
    

async def get_verification_score(user: UserDB):
    return 70.23
    

async def verify_cac(user: UserDB):
    pass


async def verify_tin(user: UserDB):
    pass


async def verify_bvn(user: UserDB):
    pass
    
    
async def verify_directors(user: UserDB):
    pass
