import os
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # Enable CORS for frontend interaction

# Load API keys from environment variables
GROQ_API_KEY = os.environ.get("GROQ_API_KEY")
OPENROUTER_API_KEY = os.environ.get("OPENROUTER_API_KEY")
NVIDIA_API_KEY = os.environ.get("NVIDIA_API_KEY")

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get('message')
    api_provider = data.get('api_provider', 'groq').lower() # Default to groq

    if not user_message:
        return jsonify({'error': 'Message is required'}), 400

    response_message = ""
    try:
        if api_provider == 'groq':
            if not GROQ_API_KEY:
                return jsonify({'error': 'Groq API key not configured'}), 500
            # Placeholder for Groq API call logic
            # Example using a hypothetical Groq client:
            # from groq import Groq
            # client = Groq(api_key=GROQ_API_KEY)
            # chat_completion = client.chat.completions.create(
            #     messages=[{"role": "user", "content": user_message}],
            #     model="llama3-8b-8192"
            # )
            # response_message = chat_completion.choices[0].message.content
            response_message = f"Response from Groq for: {user_message}"

        elif api_provider == 'openrouter':
            if not OPENROUTER_API_KEY:
                return jsonify({'error': 'OpenRouter API key not configured'}), 500
            # Placeholder for OpenRouter API call logic
            # Example using requests library:
            # import requests
            # headers = {
            #     "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            #     "Content-Type": "application/json"
            # }
            # payload = {
            #     "model": "openai/gpt-3.5-turbo", # Or another OpenRouter model
            #     "messages": [{"role": "user", "content": user_message}]
            # }
            # res = requests.post("https://openrouter.ai/api/v1/chat/completions", headers=headers, json=payload)
            # res.raise_for_status()
            # response_message = res.json()['choices'][0]['message']['content']
            response_message = f"Response from OpenRouter for: {user_message}"

        elif api_provider == 'nvidia':
            if not NVIDIA_API_KEY:
                return jsonify({'error': 'NVIDIA API key not configured'}), 500
            # Placeholder for NVIDIA API call logic
            # Example using a hypothetical NVIDIA client:
            # from nvidia.nim_client import NIMClient
            # client = NIMClient(api_key=NVIDIA_API_KEY)
            # chat_completion = client.chat.completions.create(
            #     messages=[{"role": "user", "content": user_message}],
            #     model="nv-llama3-8b-8192"
            # )
            # response_message = chat_completion.choices[0].message.content
            response_message = f"Response from NVIDIA for: {user_message}"

        else:
            return jsonify({'error': 'Invalid API provider selected'}), 400

    except Exception as e:
        app.logger.error(f"Error processing chat request with {api_provider}: {e}")
        return jsonify({'error': f'Failed to get response from {api_provider}: {str(e)}'}), 500

    return jsonify({'response': response_message})

if __name__ == '__main__':
    # Example usage: set environment variables before running
    # export GROQ_API_KEY="your_groq_api_key"
    # export OPENROUTER_API_KEY="your_openrouter_api_key"
    # export NVIDIA_API_KEY="your_nvidia_api_key"
    app.run(debug=True, port=5000)
