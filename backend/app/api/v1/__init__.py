from fastapi import APIRouter
from .endpoints import data, ai

api_router = APIRouter()
api_router.include_router(data.router, prefix="/data", tags=["Data"])
api_router.include_router(ai.router, prefix="/ai", tags=["AI"])
