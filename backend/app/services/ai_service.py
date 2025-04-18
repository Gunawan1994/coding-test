import os
import requests
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")

def generate_ai_response(question: str) -> dict:
    if not API_KEY:
        return {"answer": "API key tno found .env"}

    url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"
    headers = {"Content-Type": "application/json"}
    payload = {
        "contents": [
            {
                "parts": [{"text": question}]
            }
        ]
    }

    try:
        response = requests.post(f"{url}?key={API_KEY}", headers=headers, json=payload)
        response.raise_for_status()
        result = response.json()
        generated_text = result["candidates"][0]["content"]["parts"][0]["text"]
        return {"answer": generated_text}
    except Exception as e:
        return {"answer": f"Error to get answer from gemini: {e}"}
