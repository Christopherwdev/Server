const express = require('express');
const router = express.Router();
const { sendMessage, startNewChat } = require('../controllers/chatController');

// Start a new chat session
router.post('/new', startNewChat);

// Send a message in an existing chat
router.post('/message', sendMessage);

module.exports = router;