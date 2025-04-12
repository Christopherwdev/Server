# LLM Chat Backend

A Node.js Express server that provides a REST API for chat interactions using Google's Gemini AI model. This backend service enables text-based conversations with the Gemini AI model through a simple API interface.

## Features

- Express.js REST API
- Google Gemini AI integration
- Chat session management
- CORS enabled for cross-origin requests
- Environment-based configuration

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- Google Cloud API key with Gemini AI access

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd llm-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Google API key:
```env
GOOGLE_API_KEY=your_api_key_here
PORT=3000
```

## Running the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### 1. Create New Chat Session

Creates a new chat session with Gemini AI.

- **URL:** `/api/chat/new`
- **Method:** `POST`
- **Response:**
```json
{
    "success": true,
    "chatId": "1234567890",
    "message": "New chat session created"
}
```

### 2. Send Message

Send a message to an existing chat session.

- **URL:** `/api/chat/message`
- **Method:** `POST`
- **Request Body:**
```json
{
    "chatId": "1234567890",
    "message": "Your message here"
}
```
- **Response:**
```json
{
    "success": true,
    "response": "AI's response text"
}
```

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- `400` - Bad Request (missing parameters)
- `404` - Chat session not found
- `500` - Server error

Example error response:
```json
{
    "success": false,
    "error": "Error message here"
}
```

## Directory Structure

```
├── server.js           # Main application entry point
├── routes/
│   └── chat.js        # Chat route definitions
├── controllers/
│   └── chatController.js # Chat logic implementation
└── .env               # Environment variables
```

## Development

To modify or extend the application:

1. Routes are defined in `routes/chat.js`
2. Business logic is implemented in `controllers/chatController.js`
3. Server configuration is in `server.js`

## Security Considerations

- Keep your Google API key secure and never commit it to version control
- The application uses in-memory storage for chat sessions (not suitable for production)
- CORS is enabled for all origins (customize as needed)