import { ChatAPI } from './chat-api.interface';

class OpenRouterAdapter implements ChatAPI {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  sendMessage(message: string): Promise<string> {
    // Implement OpenRouter API call logic
    return fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${this.apiKey}` },
      body: JSON.stringify({ model: 'openrouter-model', messages: [{ role: 'user', content: message }] })
    }).then(res => res.json()).then(data => data.choices[0].message.content);
  }

  getResponse(prompt: string): Promise<string> {
    return this.sendMessage(prompt);
  }

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }
}