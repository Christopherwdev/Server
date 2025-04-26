let currentChatId = null;
const chatContainer = document.getElementById('chat-container');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const statusDiv = document.getElementById('status');

// Start a new chat session when the page loads
async function startNewChat() {
    try {
        const response = await fetch('/api/chat/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        if (data.success) {
            currentChatId = data.chatId;
            updateStatus('Connected to chat session');
        } else {
            throw new Error(data.error || 'Failed to start chat session');
        }
    } catch (error) {
        updateStatus('Error: ' + error.message, true);
    }
}

// Send a message to the AI
async function sendMessage(message) {
    if (!currentChatId) {
        updateStatus('No active chat session', true);
        return;
    }

    try {
        appendMessage(message, 'user');
        disableInput(true);
        
        const response = await fetch('/api/chat/message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chatId: currentChatId,
                message: message
            })
        });

        const data = await response.json();
        if (data.success) {
            appendMessage(data.response, 'ai');
        } else {
            throw new Error(data.error || 'Failed to get response');
        }
    } catch (error) {
        updateStatus('Error: ' + error.message, true);
    } finally {
        disableInput(false);
    }
}

// UI Helper Functions
function appendMessage(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', `${sender}-message`);
    messageDiv.textContent = message;
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function updateStatus(message, isError = false) {
    statusDiv.textContent = message;
    statusDiv.style.color = isError ? '#dc3545' : '#666';
}

function disableInput(disabled) {
    messageInput.disabled = disabled;
    sendButton.disabled = disabled;
}

// Event Listeners
sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
        sendMessage(message);
        messageInput.value = '';
    }
});

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const message = messageInput.value.trim();
        if (message) {
            sendMessage(message);
            messageInput.value = '';
        }
    }
});

// Initialize chat session when page loads
startNewChat();
