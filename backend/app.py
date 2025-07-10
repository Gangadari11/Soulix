from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv

# Load .env variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Get your OpenRouter API key from .env
API_KEY = os.getenv("OPENROUTER_API_KEY")
API_URL = "https://openrouter.ai/api/v1/chat/completions"

def chat_with_openrouter(prompt, conversation_history=None):
    """
    Enhanced chat function with conversation history support
    """
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "https://mindbloom.app",
        "X-Title": "MindBloom Chatbot"
    }

    # Build messages array with conversation history
    messages = [
        {
            "role": "system", 
            "content": """You are a kind and supportive mental health assistant for MindBloom. 
            Respond calmly, positively, and with empathy. Provide helpful guidance while being 
            understanding and non-judgmental. Keep responses conversational and supportive.
            
            Important guidelines:
            - Always be compassionate and understanding
            - Encourage professional help when appropriate
            - Never provide medical diagnoses
            - Focus on emotional support and coping strategies
            - Keep responses concise but meaningful (under 200 words)
            - If someone mentions crisis situations, provide crisis resources
            """
        }
    ]
    
    # Add conversation history if provided
    if conversation_history:
        messages.extend(conversation_history)
    
    # Add current user message
    messages.append({"role": "user", "content": prompt})

    data = {
        "model": "mistralai/mistral-7b-instruct",
        "messages": messages,
        "max_tokens": 300,
        "temperature": 0.7
    }

    try:
        response = requests.post(API_URL, headers=headers, json=data, timeout=30)
        
        if response.status_code == 200:
            reply = response.json()["choices"][0]["message"]["content"]
            return {"success": True, "reply": reply.strip()}
        else:
            print(f"Error: {response.status_code}, {response.text}")
            return {
                "success": False, 
                "error": f"API Error: {response.status_code}",
                "reply": "I'm having trouble connecting right now. Please try again in a moment."
            }
    except requests.exceptions.Timeout:
        return {
            "success": False,
            "error": "Request timeout",
            "reply": "The request is taking too long. Please try again."
        }
    except Exception as e:
        print(f"Exception: {str(e)}")
        return {
            "success": False,
            "error": str(e),
            "reply": "Sorry, something went wrong with the AI. Please try again."
        }

@app.route('/api/chat', methods=['POST'])
def chat_endpoint():
    """
    Chat endpoint for React frontend
    """
    try:
        data = request.get_json()
        
        if not data or 'message' not in data:
            return jsonify({"error": "Message is required"}), 400
        
        user_message = data['message'].strip()
        conversation_history = data.get('history', [])
        
        if not user_message:
            return jsonify({"error": "Message cannot be empty"}), 400
        
        if len(user_message) > 500:
            return jsonify({"error": "Message too long (max 500 characters)"}), 400
        
        # Check for crisis keywords
        crisis_keywords = ['suicide', 'kill myself', 'end it all', 'hurt myself', 'self harm']
        if any(keyword in user_message.lower() for keyword in crisis_keywords):
            crisis_response = """I'm very concerned about what you've shared. Your life has value and there are people who want to help you.

🆘 **Immediate Help:**
• Crisis Text Line: Text HOME to 741741
• National Suicide Prevention Lifeline: 988
• Emergency Services: 911

Please reach out to a mental health professional, trusted friend, or family member right away. You don't have to go through this alone.

Would you like to talk about what's making you feel this way?"""
            
            return jsonify({
                "reply": crisis_response,
                "is_crisis": True
            })
        
        # Get AI response
        result = chat_with_openrouter(user_message, conversation_history)
        
        if result["success"]:
            return jsonify({"reply": result["reply"]})
        else:
            return jsonify({"error": result["reply"]}), 500
            
    except Exception as e:
        print(f"Chat endpoint error: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """
    Health check endpoint
    """
    return jsonify({
        "status": "healthy",
        "service": "MindBloom Chat API",
        "version": "1.0.0"
    })

@app.route('/api/models', methods=['GET'])
def get_available_models():
    """
    Get available AI models
    """
    models = [
        {
            "id": "mistralai/mistral-7b-instruct",
            "name": "Mistral 7B",
            "description": "Fast and efficient for general conversations"
        },
        {
            "id": "anthropic/claude-3-haiku",
            "name": "Claude 3 Haiku",
            "description": "Thoughtful and empathetic responses"
        },
        {
            "id": "openai/gpt-3.5-turbo",
            "name": "GPT-3.5 Turbo",
            "description": "Balanced performance and quality"
        }
    ]
    return jsonify({"models": models})

if __name__ == "__main__":
    if not API_KEY:
        print("❌ Error: OPENROUTER_API_KEY not found in environment variables")
        print("Please create a .env file with your API key")
        exit(1)
    
    print("🧠 MindBloom Chat API Server Starting...")
    print("🔑 API Key loaded successfully")
    print("🌐 Server will run on http://localhost:5000")
    print("📱 Make sure your React app points to this URL")
    
    app.run(debug=True, host='0.0.0.0', port=5000)
