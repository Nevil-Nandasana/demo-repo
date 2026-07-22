import os
from groq import Groq

class GroqService:
    """
    A dedicated service for interacting with the Groq API for chat completions.
    """
    def __init__(self):
        self.api_key = os.getenv("GROQ_API_KEY")
        if not self.api_key:
            raise ValueError("GROQ_API_KEY environment variable not set.")
        self.client = Groq(api_key=self.api_key)

    def get_chat_completion(self, messages: list, model: str = "llama-3.1-70b-versatile") -> str:
        """
        Sends a list of messages to the Groq API for chat completion.

        Args:
            messages (list): A list of message dictionaries, e.g.,
                             [{"role": "user", "content": "Hello!"}]
            model (str): The Groq model to use for completion. Defaults to "llama-3.1-70b-versatile".

        Returns:
            str: The content of the assistant's reply.

        Raises:
            Exception: If the API call fails or returns an unexpected response.
        """
        try:
            chat_completion = self.client.chat.completions.create(
                messages=messages,
                model=model,
            )
            if chat_completion.choices and chat_completion.choices[0].message:
                return chat_completion.choices[0].message.content
            else:
                raise Exception("No completion message received from Groq API.")
        except Exception as e:
            print(f"Error calling Groq API: {e}")
            raise

if __name__ == "__main__":
    # Example Usage:
    # Ensure you have GROQ_API_KEY set in your environment variables
    # e.g., export GROQ_API_KEY="your_groq_api_key_here"

    try:
        groq_service = GroqService()

        # Define a list of messages for the conversation
        conversation_messages = [
            {"role": "system", "content": "You are a helpful AI assistant."},
            {"role": "user", "content": "Explain the concept of quantum entanglement in simple terms."}
        ]

        print("Sending request to Groq API...")
        response_content = groq_service.get_chat_completion(conversation_messages)
        print("\nGroq API Response:")
        print(response_content)

        # Another example with a different model (if available and desired)
        # conversation_messages_2 = [
        #     {"role": "user", "content": "What is the capital of France?"}
        # ]
        # response_content_2 = groq_service.get_chat_completion(conversation_messages_2, model="llama-3.1-8b-instant")
        # print("\nGroq API Response (llama-3.1-8b-instant):")
        # print(response_content_2)

    except ValueError as ve:
        print(f"Configuration Error: {ve}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
