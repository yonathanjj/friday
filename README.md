Friday AI Assistant

An open-source, web-based personal AI assistant inspired by Iron Man's F.R.I.D.A.Y. This project aims to create an intelligent, voice-activated conversational AI that runs in the browser, providing a seamless and interactive experience.

Project Status: 🚧 In Development 🚧

This project is currently in its early stages. The core functionality is in place, but it is not yet a finished product.

What's Working:

Wake Word Activation: The assistant listens for "Hey Friday" to begin interaction.

Speech-to-Text: Utilizes the browser's Web Speech API to transcribe voice commands.

Core AI Brain: A Python Flask backend processes requests and communicates with the Google Gemini API for intelligent responses.

Realistic Voice: Text-to-Speech is handled by the ElevenLabs API to provide a high-quality, female voice for Friday.

Dynamic UI: A minimalist, animated waveform provides visual feedback for listening and speaking states.

The Vision: The End Goal

The ultimate goal is to move beyond a simple question-and-answer bot and create a true personal assistant that feels as intuitive and capable as Tony Stark's F.R.I.D.A.Y.

The end goal is an assistant that is:

Always-On & Ambient: A permanent browser tab or lightweight desktop app that is always available but never intrusive.

Context-Aware: Remembers previous parts of the conversation to provide coherent and intelligent follow-up responses.

Proactive & Personalized: Learns user preferences over time to offer suggestions and assistance without being asked.

Capable of Task Automation: Can integrate with other APIs to perform actions like managing calendars, sending emails, controlling smart home devices, or retrieving real-time information (weather, news).

Visually Engaging: Provides rich visual feedback that complements the conversation, displaying data, images, or status updates directly on the interface.

Technology Stack

This project is built with a modern, accessible tech stack.

Frontend:

HTML5 & CSS3

JavaScript (ES6+)

GSAP (GreenSock Animation Platform): For smooth UI animations.

Web Speech API: For browser-based speech recognition.

Backend:

Python 3

Flask: A lightweight micro web framework for the API server.

Flask-CORS: To handle cross-origin requests from the frontend.

AI Services:

Google Gemini API: For natural language understanding and response generation.

ElevenLabs API: For generating high-quality, realistic text-to-speech audio.

How to Run This Project
Prerequisites

Python 3.x installed.

API keys for Google Gemini and ElevenLabs.

1. Backend Setup

First, set up and run the Python backend server.

```bash
# 1. Navigate to the project's root directory
cd path/to/friday

# 2. Create and activate a Python virtual environment
python -m venv .venv
# On Windows:
.\\.venv\\Scripts\\Activate.ps1
# On macOS/Linux:
# source .venv/bin/activate

# 3. Install required Python packages
pip install -r backend/requirements.txt

# 4. Create the .env file in the root directory
# Add your secret keys to this file:
# GEMINI_API_KEY=your_gemini_key_here
# ELEVENLABS_API_KEY=your_elevenlabs_key_here

# 5. Start the backend server
cd backend
python app.py
```

The backend will now be running on http://127.0.0.1:5000. Keep this terminal open.

2. Frontend Setup

Next, serve the frontend files using a simple web server.

```bash
# 1. Open a NEW terminal window
# 2. Navigate to the project's root directory
cd path/to/friday

# 3. Start the simple Python web server
python -m http.server
```

The frontend will now be served on http://localhost:8000.

3. Accessing Friday

Open your web browser (Chrome recommended for best Web Speech API support) and navigate to:
http://localhost:8000/frontend/

Your browser will ask for microphone permission. You must allow it for the assistant to work. You can now start talking to Friday