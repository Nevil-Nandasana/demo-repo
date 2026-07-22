from nvidia_api_service import NvidiaApiService
from config import NVIDIA_API_KEY, NVIDIA_API_SECRET

if __name__ == '__main__':
    service = NvidiaApiService(NVIDIA_API_KEY, NVIDIA_API_SECRET)
    prompt = 'Hello, how are you?'
    response = service.get_chat_completion(prompt)
    print(response)