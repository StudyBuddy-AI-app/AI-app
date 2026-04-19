StudyBuddy AI

An AI-powered web application that helps students study through interactive conversations. Users can switch between Explain Mode for clear topic explanations and Quiz Mode for practice questions with answer checking.

📚 Project Overview

StudyBuddy AI is a Level 2 AI application designed to make studying easier and more engaging. It supports multi-turn conversations, remembers the current session’s chat history, and adapts responses based on the selected learning mode.

Features
💬 Chat with an AI study assistant
📖 Explain Mode – simple, student-friendly explanations
🧠 Quiz Mode – asks questions and checks answers
🔁 Session-based conversation memory
⚡ Fast and responsive frontend
🏗️ System Architecture

Frontend: React + Vite
Backend: FastAPI
LLM Provider: Gemini API

Flow of the Application
User enters a message in the React frontend
Frontend sends:
user message
selected mode
chat history
FastAPI backend builds the correct prompt
Backend sends request to Gemini API
Gemini generates a response
Backend returns the response
Frontend displays it in chat
React Frontend → FastAPI Backend → Gemini API

🛠️ Tech Stack
Frontend

React
Vite
CSS
Backend
FastAPI
Python
python-dotenv
CORS Middleware
AI Integration
Gemini API

✅ Why These Technologies?

React → Excellent for interactive UI and state management
Vite → Fast development environment
FastAPI → Lightweight and high-performance backend framework
Gemini API → Easy integration and reliable AI responses
python-dotenv → Secure API key management

📂 Project Structure

studybuddy-ai/
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── llm_service.py
│   │   ├── prompt_utils.py
│   │   └── schemas.py
│   │
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── api.js
│   │   ├── main.jsx
│   │   └── styles.css
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md

⚙️ Installation & Setup
Requirements

Make sure you have installed:

Python
Node.js
npm
Gemini API Key

1️⃣ Clone Repository
git clone YOUR_REPO_LINK
cd studybuddy-ai

2️⃣ Backend Setup
cd backend
python -m venv venv
Activate Virtual Environment

Windows

venv\Scripts\activate

Mac/Linux

source venv/bin/activate
Install Dependencies
pip install -r requirements.txt
Create .env File

Inside /backend

GEMINI_API_KEY=YOUR_API_KEY_HERE
Run Backend Server
python -m uvicorn app.main:app --reload --port 8001

Backend runs on:

http://127.0.0.1:8001

API Docs:

http://127.0.0.1:8001/docs
3️⃣ Frontend Setup

Open a new terminal:

cd frontend
npm install
npm run dev

Frontend runs on:

http://localhost:5173

(or sometimes 5174)

🚀 How to Use
Open frontend in browser
Choose a mode:
Explain Mode
Quiz Mode
Ask a study question
View AI responses

⚠️ Known Limitations

Chat history is temporary (lost after refresh)
No database integration
No authentication system
Requires internet connection
Depends on Gemini API availability
AI responses may occasionally be inaccurate
Not production-ready yet

🔮 Future Improvements

Database support for permanent chat history
User login/authentication
Better security practices
Scalable deployment architecture
Improved UI/UX
Progress tracking for students

🤖 AI Tools Used

AI tools assisted with:

Project planning
Debugging errors
Code structure generation
UI improvements
README formatting

All team members reviewed, understood, and tested the final implementation.

👥 Team Members
Member 1: MUHAMMAD SHAFIQ SAIF
Member 2: MUHAMMAD TABISH


