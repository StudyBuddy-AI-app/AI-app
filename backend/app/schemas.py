from pydantic import BaseModel
from typing import List, Literal


class ChatMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str


class ChatRequest(BaseModel):
    mode: Literal["explain", "quiz"]
    message: str
    history: List[ChatMessage] = []


class ChatResponse(BaseModel):
    reply: str