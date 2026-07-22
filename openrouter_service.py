import os
import requests

class OpenRouterService:
    """
    A service class for interacting with the OpenRouter API for chat completions.
    """
    def __init__(self, api_key: str = None, base_url: str = "https://openrouter.ai/api/v1"):
        """
        Initializes the OpenRouterService.

        Args:
            api_key (str, optional): Your OpenRouter API key. If not provided,
                                     it will be fetched from the OPENROUTER_API_KEY
                                     environment variable.
            base_url (str, optional): The base URL for the OpenRouter API.
                                      Defaults to "https://openrouter.ai/api/v1".
        """
        self.api_key = api_key if api_key else os.getenv("OPENROUTER_API_KEY")
        if not self.api_key:
            raise ValueError("OpenRouter API key not provided and not found in OPENROUTER_API_KEY environment variable.")
        self.base_url = base_url
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }

    def chat_completion(self, messages: list, model: str = "openrouter/auto", **kwargs) -> dict:
        """
        Sends a chat completion request to the OpenRouter API.

        Args:
            messages (list): A list of message objects, e.g.,
                             [{"role": "user", "content": "Hello!"}]
            model (str, optional): The model to use for the completion.
                                   Defaults to "openrouter/auto".
            **kwargs: Additional parameters to pass to the API request body,
                      e.g., temperature, max_tokens, stream, etc.

        Returns:
            dict: The JSON response from the OpenRouter API.

        Raises:
            requests.exceptions.RequestException: For network-related errors.
            ValueError: For API errors or invalid responses.
        """
        endpoint = f"{self.base_url}/chat/completions"
        payload = {
            "model": model,
            "messages": messages,
            **kwargs
        }

        try:
            response = requests.post(endpoint, headers=self.headers, json=payload)
            response.raise_for_status()  # Raise an exception for HTTP errors (4xx or 5xx)
            return response.json()
        except requests.exceptions.HTTPError as e:
            error_message = f"HTTP error occurred: {e.response.status_code} - {e.response.text}"
            raise ValueError(error_message) from e
        except requests.exceptions.ConnectionError as e:
            raise requests.exceptions.RequestException(f"Connection error occurred: {e}") from e
        except requests.exceptions.Timeout as e:
            raise requests.exceptions.RequestException(f"Request timed out: {e}") from e
        except requests.exceptions.RequestException as e:
            raise requests.exceptions.RequestException(f"An unexpected request error occurred: {e}") from e
        except ValueError as e:
            raise ValueError(f"Failed to parse API response: {e}") from e

# Example Usage (for demonstration purposes, not part of the module itself)
if __name__ == "__main__":
    # Set your API key as an environment variable or pass it directly
    # os.environ["OPENROUTER_API_KEY"] = "YOUR_OPENROUTER_API_KEY"

    try:
        # Initialize the service (it will try to get the key from env var)
        # For testing, you can pass it directly: service = OpenRouterService(api_key="YOUR_KEY")
        service = OpenRouterService()

        messages = [
            {"role": "user", "content": "What is the capital of France?"}
        ]

        print("Sending chat completion request...")
        response = service.chat_completion(messages=messages, model="openrouter/auto", temperature=0.7)

        print("\nAPI Response:")
        print(response)

        if response and "choices" in response and response["choices"]:
            print("\nAssistant's Reply:")
            print(response["choices"][0]["message"]["content"])

    except ValueError as e:
        print(f"Error: {e}")
    except requests.exceptions.RequestException as e:
        print(f"Network or API request error: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
