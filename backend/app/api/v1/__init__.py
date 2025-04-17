from fastapi import APIRouter
from .endpoint import data

api_router = APIRouter()
api_router.include_router(data.router, prefix="/data", tags=["Data"])
