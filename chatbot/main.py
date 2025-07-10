from dotenv import load_dotenv
import os
import requests

load_dotenv()

API_KEY = os.getenv("OPENROUTER_API_KEY")
print("API Key loaded:", API_KEY)  # Debug line

if not API_KEY:
    print("API key not found. Check your .env file.")
    exit()


API_URL = "https://openrouter.ai/api/v1/chat/completions"

def chat_with_openrouter(prompt):
    # Set headers for the API request
    headers = {
        "Authorization": f"Bearer {API_KEY}",  # API key for authentication
        "Content-Type": "application/json",  # Content type of the request
        # "HTTP-Referer": "https://yourappname.com",  # optional but recommended
        # "X-Title": "MindBloom Chatbot"              # optional title
    }

    # Set data for the API request
    data = {
        "model": "mistralai/mistral-7b-instruct",  # You can also try anthropic/claude-3 or mistralai/mistral-7b-instruct
        "messages": [
            {"role": "system", "content": "You are a kind and supportive mental health assistant. Respond calmly and positively."},
            {"role": "user", "content": prompt}
        ]
    }

    response = requests.post(API_URL, headers=headers, json=data)

    if response.status_code == 200:
        reply = response.json()["choices"][0]["message"]["content"]
        return reply.strip()
    else:
        print("Error:", response.status_code, response.text)
        return "Sorry, something went wrong with the AI."

# Console interface
if __name__ == "__main__":
    

    print("🧠 MindBloom Chatbot (type 'exit' to quit)")
    while True:
        user_input = input("You: ")
        if user_input.lower() in ["exit", "quit", "bye"]:
            print("Chatbot: Take care! 💚")
            break
        bot_reply = chat_with_openrouter(user_input)
        print("Chatbot:", bot_reply)
        

