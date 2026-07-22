const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Unified chat API endpoint
app.post('/chat', (req, res) => {
  console.log('Received chat request:', req.body);

  // For now, return a static dummy response adhering to the unified chat API interface
  const dummyResponse = {
    id: 'chatcmpl-dummy-id',
    object: 'chat.completion',
    created: Math.floor(Date.now() / 1000),
    model: req.body.model || 'gpt-3.5-turbo',
    choices: [
      {
        index: 0,
        message: {
          role: 'assistant',
          content: 'This is a dummy response from the backend server. Your message was: "' + 
                     (req.body.messages && req.body.messages.length > 0 ? 
                      req.body.messages[req.body.messages.length - 1].content : 
                      'No message provided') + '"'
        },
        finish_reason: 'stop'
      }
    ],
    usage: {
      prompt_tokens: 0,
      completion_tokens: 0,
      total_tokens: 0
    }
  };

  res.json(dummyResponse);
});

// Basic health check endpoint
app.get('/', (req, res) => {
  res.send('Chat backend server is running!');
});

app.listen(port, () => {
  console.log(`Chat backend server listening at http://localhost:${port}`);
});
