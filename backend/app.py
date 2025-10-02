import os
import google.generativeai as genai
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# --- FLASK APP SETUP ---
app = Flask(__name__)
# Enable CORS for all routes, allowing your frontend to communicate with this backend
CORS(app)

# --- GEMINI API SETUP ---
try:
    # Configure the Gemini API with the key from the environment
    genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

    # Model configuration
    generation_config = {
        "temperature": 0.7,
        "top_p": 1,
        "top_k": 1,
        "max_output_tokens": 2048,
    }

    # Safety settings to filter harmful content
    safety_settings = [
        {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
        {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
        {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
        {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    ]

    # Initialize the Generative Model
    model = genai.GenerativeModel(
        model_name="gemini-1.0-pro",
        generation_config=generation_config,
        safety_settings=safety_settings
    )
    print("Gemini model initialized successfully.")

except Exception as e:
    print(f"Error initializing Gemini model: {e}")
    model = None


# --- API ROUTE ---
@app.route('/api/ask', methods=['POST'])
def ask_friday():
    if model is None:
        return jsonify({"error": "Gemini model is not initialized. Check API key."}), 500

    # Get the message from the frontend request
    data = request.get_json()
    user_message = data.get('message')

    if not user_message:
        return jsonify({"error": "No message provided."}), 400

    try:
        # Start a chat session and send the message
        convo = model.start_chat(history=[])
        convo.send_message(user_message)

        # Get the AI's response
        ai_response = convo.last.text

        # Return the response to the frontend
        return jsonify({"reply": ai_response})

    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": "Failed to get response from AI."}), 500


# --- RUN THE APP ---
if __name__ == '__main__':
    # Flask runs on port 5000 by default
    app.run(debug=True, port=5000)