# from fastapi import FastAPI, Request
# from fastapi.middleware.cors import CORSMiddleware
# import uvicorn
# import json
# import time

# app = FastAPI()

# # Load dummy data
# with open("../source/dummyData.json", "r") as f:
#     DUMMY_DATA = json.load(f)

# @app.get("/api/data")
# def get_data():
#     """
#     Returns dummy data (e.g., list of users).
#     """
#     time.sleep(2)
#     return DUMMY_DATA

# @app.post("/api/ai")
# async def ai_endpoint(request: Request):
#     """
#     Accepts a user question and returns a placeholder AI response.
#     (Optionally integrate a real AI model or external service here.)
#     """
#     body = await request.json()
#     user_question = body.get("question", "")
    
#     # Placeholder logic: echo the question or generate a simple response
#     # Replace with real AI logic as desired (e.g., call to an LLM).
#     return {"answer": f"This is a placeholder answer to your question: {user_question}"}

# if __name__ == "__main__":
#     uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1 import api_router

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
