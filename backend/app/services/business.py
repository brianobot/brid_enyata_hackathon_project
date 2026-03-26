from faker import Faker
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models import User as UserDB

faker = Faker()


async def search_business(keyword: str, session: AsyncSession):
    stmt = select(UserDB).where(UserDB.business_name.contains(keyword))
    results = (await session.execute(stmt)).scalars().all()
    
    return {
        "count": 4,
        "total_pages": 1,
        "results": list(results) + [
            {
                "business_name": faker.company(),
                "year_founded": faker.year(),
                "email": faker.email(),
                "business_phone_number": faker.phone_number(),
                "business_address": faker.address(),
                "business_website": faker.url(),
                "business_description": faker.sentence(),
            }
            
            for _ in range(10)
          
        ] 
    }
    

async def get_verification_score(user: UserDB):
    return user.score
    

async def verify_cac(user: UserDB):
    pass


async def verify_tin(user: UserDB):
    pass


async def verify_bvn(user: UserDB):
    pass
    
    
async def verify_directors(user: UserDB):
    pass
