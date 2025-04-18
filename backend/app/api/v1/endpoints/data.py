from fastapi import APIRouter
from app.services.data_service import get_dummy_data
from app.core.config import load_dummy_data

router = APIRouter()

@router.get("/data")
def get_data():
    return get_dummy_data(load_dummy_data())