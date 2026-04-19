from google import genai
from .prompt_utils import build_system_prompt


def generate_reply(mode: str, message: str, history: list) -> str:
    client = genai.Client()
    system_prompt = build_system_prompt(mode)

    conversation_text = ""
    for item in history:
        role = item.role.capitalize()
        conversation_text += f"{role}: {item.content}\n"

    full_prompt = f"""
{system_prompt}

Previous conversation:
{conversation_text if conversation_text else "No previous conversation."}

New user message:
User: {message}

Respond as the assistant.
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=full_prompt
    )

    if hasattr(response, "text") and response.text:
        return response.text.strip()

    return "Sorry, I could not generate a response."