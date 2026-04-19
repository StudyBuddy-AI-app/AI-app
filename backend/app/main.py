from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os

from .schemas import ChatRequest, ChatResponse
from .llm_service import generate_reply

app = FastAPI(title="StudyBuddy AI Backend")

origins = [
    "http://localhost:5174"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "StudyBuddy AI backend is running"}


@app.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    api_key = os.getenv("GEMINI_API_KEY")

    if not api_key:
        raise HTTPException(
            status_code=500,
            detail="GEMINI_API_KEY is missing in backend/.env"
        )

    if not request.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty")

    try:
        reply = generate_reply(
            mode=request.mode,
            message=request.message,
            history=request.history
        )
        return ChatResponse(reply=reply)
    except Exception as e:
        print("FULL BACKEND ERROR:", repr(e))
        raise HTTPException(status_code=500, detail=f"Backend error: {str(e)}")