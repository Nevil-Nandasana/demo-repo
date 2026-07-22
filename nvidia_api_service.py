import requests

class NvidiaApiService:
    def __init__(self, api_key, api_secret):
        self.api_key = api_key
        self.api_secret = api_secret
        self.base_url = 'https://api.nvidia.com'

    def get_chat_completion(self, prompt, model='meta/llama-3.1-70b-instruct'):
        headers = {
            'Authorization': f'Bearer {self.api_key}',
            'Content-Type': 'application/json'
        }
        data = {
            'prompt': prompt,
            'model': model
        }
        response = requests.post(f'{self.base_url}/chat/completions', headers=headers, json=data)
        return response.json()