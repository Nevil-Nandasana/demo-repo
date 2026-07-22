export interface ChatAPI {
  sendMessage(message: string): Promise<string>;
  getResponse(prompt: string): Promise<string>;
  setApiKey(apiKey: string): void;
}