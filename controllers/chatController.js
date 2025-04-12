// Switch to other providers e.g. OpenRouter if needed. 
// Gemini is used for convenience because it's free.

const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

// Store chat histories in memory (for demo purposes)
// In production, use a proper database
const chatSessions = new Map();

const startNewChat = async (req, res) => {
    try {
        const chatId = Date.now().toString(); // Simple unique ID generation
        const chat = model.startChat();
        chatSessions.set(chatId, chat);
        
        res.status(201).json({
            success: true,
            chatId,
            message: 'New chat session created'
        });
    } catch (error) {
        console.error('Error starting new chat:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to start new chat session'
        });
    }
};

const sendMessage = async (req, res) => {
    try {
        const { chatId, message } = req.body;
        
        if (!chatId || !message) {
            return res.status(400).json({
                success: false,
                error: 'ChatID and message are required'
            });
        }

        const chat = chatSessions.get(chatId);
        if (!chat) {
            return res.status(404).json({
                success: false,
                error: 'Chat session not found'
            });
        }

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();

        res.status(200).json({
            success: true,
            response: text
        });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to process message'
        });
    }
};

module.exports = {
    startNewChat,
    sendMessage
};