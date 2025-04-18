from fastapi import APIRouter
from app.schema.ai import AIRequest, AIResponse
from app.services.ai_service import generate_ai_response

router = APIRouter()

@router.post(
    "/",
    tags=["AI"],
    summary="Ask anything",
    response_model=AIResponse
)
async def ai_endpoint(body: AIRequest):
    return generate_ai_response(body.question)
