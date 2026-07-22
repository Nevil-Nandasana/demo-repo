document.addEventListener('DOMContentLoaded', () => {
    const chatWindow = document.getElementById('chat-window');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const apiSelector = document.getElementById('api-selector');

    const API_BASE_URL = 'http://127.0.0.1:5000'; // Flask backend URL

    // Load selected API from local storage or default to 'groq'
    const savedApiProvider = localStorage.getItem('selectedApiProvider');
    if (savedApiProvider) {
        apiSelector.value = savedApiProvider;
    }

    // Save selected API to local storage on change
    apiSelector.addEventListener('change', () => {
        localStorage.setItem('selectedApiProvider', apiSelector.value);
    });

    function appendMessage(sender, message) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(sender === 'user' ? 'user-message' : 'ai-message');
        messageDiv.textContent = message;
        chatWindow.appendChild(messageDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight; // Auto-scroll to bottom
    }

    async function sendMessage() {
        const message = userInput.value.trim();
        if (message === '') return;

        appendMessage('user', message);
        userInput.value = ''; // Clear input

        const selectedApi = apiSelector.value;

        try {
            const response = await fetch(`${API_BASE_URL}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: message,
                    api_provider: selectedApi
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            appendMessage('ai', data.response);

        } catch (error) {
            console.error('Error sending message:', error);
            appendMessage('ai', `Error: ${error.message}. Please check the backend and API keys.`);
        }
    }

    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});
