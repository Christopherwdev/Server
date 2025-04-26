<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rie Vision</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <style>
        :root {
            --ios-blue: #007aff;
            --ios-light-blue: #5ac8fa;
            --ios-bg: rgba(242, 242, 247, 1);
            --ios-card: rgba(255, 255, 255, 0.7);
            --ios-text: #1c1c1e;
            --ios-secondary-text: #8e8e93;
            --ios-border: rgba(209, 209, 214, 0.5);
            --panel-width: 49.5%;
            --panel-gap: 1%;
            --tab-height: 44px;
            --header-height: 64px;
            --blur-amount: 15px;
            --chat-width: 400px;
            --chat-height: 400px;
            --chat-border-radius: 15px;
        }

        .dark-mode {
            --ios-bg: rgba(28, 28, 30, 1);
            --ios-card: rgba(44, 44, 46, 0.9);
            --ios-text: #ffffff;
            --ios-secondary-text: #8e8e93;
            --ios-border: rgba(99, 99, 102, 0.5);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        body {
            background-color: var(--ios-bg);
            color: var(--ios-text);
            overflow: hidden;
            height: 100vh;
            transition: background-color 0.3s ease;
        }

        .app-container {
            height: 100vh;
            display: flex;
            flex-direction: column;
        }

        .app-header {
            height: var(--header-height);
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 20px;
            background-color: var(--ios-card);
            backdrop-filter: blur(var(--blur-amount));
            -webkit-backdrop-filter: blur(var(--blur-amount));
            border-bottom: 1px solid var(--ios-border);
            z-index: 10;
        }

        .app-title {
            font-size: 20px;
            font-weight: 600;
        }

        .header-actions {
            display: flex;
            gap: 15px;
        }

        .action-button {
            background: none;
            border: none;
            color: var(--ios-blue);
            font-size: 24px;
            cursor: pointer;
            padding: 8px;
            border-radius: 100px;
            transition: background-color 0.2s ease;
        }

        .action-button:hover {
            background-color: rgba(0, 122, 255, 0.1);
        }

        .main-content {
            flex: 1;
            display: flex;
            overflow: hidden;
        }

        .panel {
            position: relative;
            flex: 1;
            height: 100%;
            max-width: var(--panel-width);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            background-color: var(--ios-bg);
            transition: max-width 0.3s ease;
        }

        .panel-gap {
            width: var(--panel-gap);
            height: 100%;
            position: relative;
            cursor: col-resize;
            background-color: var(--ios-border);
            user-select: none;
            -webkit-user-select: none;
            z-index: 100;
        }

        .panel-gap::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 4px;
            height: 50px;
            background-color: var(--ios-secondary-text);
            border-radius: 4px;
            opacity: 0.3;
            pointer-events: none;
        }

        .tabs {
            height: var(--tab-height);
            display: flex;
            background-color: var(--ios-card);
            backdrop-filter: blur(var(--blur-amount));
            -webkit-backdrop-filter: blur(var(--blur-amount));
            border-bottom: 1px solid var(--ios-border);
            position: sticky;
            top: 0;
            z-index: 5;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
        }

        .tabs::-webkit-scrollbar {
            display: none;
        }

        .tab {
            padding: 0 15px;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 15px;
            font-weight: 500;
            color: var(--ios-secondary-text);
            border-bottom: 2px solid transparent;
            cursor: pointer;
            transition: all 0.2s ease;
            white-space: nowrap;
        }

        .tab.active {
            color: var(--ios-blue);
            border-bottom-color: var(--ios-blue);
        }

        .tab:hover:not(.active) {
            background-color: rgba(0, 0, 0, 0.05);
        }

        .content-area {
            flex: 1;
            position: relative;
            overflow: hidden;
        }

        .iframe-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: none;
        }

        .iframe-container.active {
            display: block;
        }

        .doc-iframe {
            width: 100%;
            height: 100%;
            border: none;
        }

        /* Loading animation */
        .loader-container {
            display: none;
            align-items: center;
            justify-content: center;
            height: 100%;
        }

        .loader {
            width: 40px;
            height: 40px;
            border: 4px solid rgba(0, 122, 255, 0.3);
            border-radius: 50%;
            border-top: 4px solid var(--ios-blue);
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% {
                transform: rotate(0deg);
            }

            100% {
                transform: rotate(360deg);
            }
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
            .main-content {
                flex-direction: column;
            }

            .panel {
                max-width: 100%;
                height: 50%;
            }

            .panel-gap {
                width: 100%;
                height: var(--panel-gap);
                cursor: row-resize;
            }

            .panel-gap::after {
                width: 50px;
                height: 4px;
            }
        }

        /* Theme transition animation */
        .theme-transition {
            animation: theme-fade 0.5s ease;
        }

        @keyframes theme-fade {
            0% {
                opacity: 0;
            }

            100% {
                opacity: 1;
            }
        }

        /* Chatbot styles */
        .chat-toggler {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background-color: var(--ios-blue);
            color: white;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            cursor: pointer;
            z-index: 1000;
            transition: transform 0.2s ease;
            margin: 0px auto;
            padding: 0px;
        }

        .chat-toggler:hover {
            transform: scale(1.05);
        }

        .chat-window {
            position: fixed;
            bottom: 90px;
            right: 20px;
            width: var(--chat-width);
            height: var(--chat-height);
            background-color: var(--ios-card);
            border-radius: var(--chat-border-radius);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
            display: flex;
            flex-direction: column;
            z-index: 1000;
            transform: translateY(20px);
            opacity: 0;
            visibility: hidden;
            transition: transform 0.3s ease, opacity 0.3s ease, visibility 0.3s ease;
            overflow: hidden;
            backdrop-filter: blur(var(--blur-amount));
            -webkit-backdrop-filter: blur(var(--blur-amount));
            border: 1px solid var(--ios-border);
            cursor: grab;
            /* Show a grab cursor for dragging */
            z-index: 1000;
        }

        .chat-window.active {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }

        .chat-window.dragging {
            cursor: grabbing;
            /* Change cursor to grabbing while dragging */
        }

        .chat-header {
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 15px;
            border-bottom: 1px solid var(--ios-border);
            background-color: var(--ios-card);
        }

        .chat-title {
            font-size: 16px;
            font-weight: 600;
        }

        .chat-actions {
            display: flex;
            gap: 10px;
        }

        .chat-action {
            background: none;
            border: none;
            color: var(--ios-blue);
            font-size: 18px;
            cursor: pointer;
            padding: 5px;
        }

        .chat-container {
            flex: 1;
            padding: 15px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .message {

            padding: 10px 12px;
            border-radius: 18px;
            font-size: 14px;
            line-height: 1.4;
            position: relative;
        }

        .user-message {
            max-width: 80%;
            align-self: flex-end;
            background-color: var(--ios-blue);
            color: white;
            border-bottom-right-radius: 4px;
        }

        .ai-message {
            align-self: flex-start;
            border: 1px solid var(--ios-border);
            border-bottom-left-radius: 4px;
            gap: 10px;
            padding: 5px 15px;
            margin-bottom: 10px;
            line-height: 1.6;
        }

        .ai-message p {
            margin: 10px 0;
        }

        .ai-message h1,
        .ai-message h2,
        .ai-message h3 {
            margin: 15px 0;
        }

        .ai-message ul,
        .ai-message ol {
            margin: 10px 0;
            padding-left: 20px;
        }

        .ai-message blockquote {
            margin: 15px 0;
            padding: 10px 15px;
            border-left: 4px solid var(--ios-border);
            background-color: rgba(0, 0, 0, 0.05);
            font-style: italic;
            color: var(--ios-secondary-text);
        }

        .chat-input-area {
            padding: 10px 15px;
            border-top: 1px solid var(--ios-border);
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .chat-input {
            flex: 1;
            padding: 10px 15px;
            border-radius: 18px;
            border: 1px solid var(--ios-border);
            background-color: var(--ios-bg);
            color: var(--ios-text);
            font-size: 16px;
        }

        .chat-input:focus {
            outline: none;
            border-color: var(--ios-blue);
        }

        .send-button {
            background: none;
            border: none;
            color: var(--ios-blue);
            font-size: 24px;
            cursor: pointer;
            padding: 5px;
        }

        .send-button:disabled {
            color: var(--ios-secondary-text);
            cursor: not-allowed;
        }

        .status {
            font-size: 12px;
            color: var(--ios-secondary-text);
            text-align: center;
            padding: 5px 0;
        }

        /* Prevent text selection while dragging */
        .no-select {
            user-select: none;
            -webkit-user-select: none;
        }
    </style>
</head>

<body>
    <div class="app-container">
        <header class="app-header">
            <h1 class="app-title">Rie Vision</h1>
            <div class="header-actions">
                <button class="action-button tooltip" id="theme-toggle" style="width: 50px; height: 50px;">
                    <i class="bi bi-moon"></i>
                    <!-- <span class="tooltip-text">Toggle Dark Mode</span> -->
                </button>
            </div>
        </header>

        <div class="main-content">
            <div class="panel" id="left-panel">
                <div class="tabs" id="left-tabs">
                    <div class="tab active" data-tab="bio-unit5-left">Bio Unit 5</div>
                    <div class="tab" data-tab="chem-unit5-left">Chem Unit 5</div>
                    <div class="tab" data-tab="phy-unit5-left">Phy Unit 5</div>
                </div>
                <div class="content-area">
                    <div class="iframe-container active" id="bio-unit5-left">
                        <div class="loader-container">
                            <div class="loader"></div>
                        </div>
                        <iframe class="doc-iframe"
                            src="https://docs.google.com/document/d/1ReF9Fcp3l3c6Ztpx4jcZrlA5xAOKimL-DNM5vZ4T6LM/edit?tab=t.0&rm=minimal"></iframe>
                    </div>
                    <div class="iframe-container" id="chem-unit5-left">
                        <div class="loader-container">
                            <div class="loader"></div>
                        </div>
                        <iframe class="doc-iframe"
                            src="https://docs.google.com/document/d/1pEi15vqTLsuMoe5NSg5TC-yPAp4cYVrfpEQ_zdF9vGo/edit?tab=t.0&rm=minimal"></iframe>
                    </div>
                    <div class="iframe-container" id="phy-unit5-left">
                        <div class="loader-container">
                            <div class="loader"></div>
                        </div>
                        <iframe class="doc-iframe"
                            src="https://docs.google.com/document/d/1unS8y0iX1s7IP1m7wNndzj0wy6a5YvASMquElbtPy-c/edit?rm=minimal&tab=t.0"></iframe>
                    </div>
                </div>
            </div>

            <div class="panel-gap" id="panel-resizer"></div>

            <div class="panel" id="right-panel">
                <div class="tabs" id="right-tabs">
                    <div class="tab active" data-tab="bio-unit5-right">Bio Unit 5</div>
                    <div class="tab" data-tab="chem-unit5-right">Chem Unit 5</div>
                    <div class="tab" data-tab="phy-unit5-right">Phy Unit 5</div>
                </div>
                <div class="content-area">
                    <div class="iframe-container active" id="bio-unit5-right">
                        <div class="loader-container">
                            <div class="loader"></div>
                        </div>
                        <iframe class="doc-iframe"
                            src="https://docs.google.com/document/d/1ReF9Fcp3l3c6Ztpx4jcZrlA5xAOKimL-DNM5vZ4T6LM/edit?tab=t.0&rm=minimal"></iframe>
                    </div>
                    <div class="iframe-container" id="chem-unit5-right">
                        <div class="loader-container">
                            <div class="loader"></div>
                        </div>
                        <iframe class="doc-iframe"
                            src="https://docs.google.com/document/d/1pEi15vqTLsuMoe5NSg5TC-yPAp4cYVrfpEQ_zdF9vGo/edit?tab=t.0&rm=minimal"></iframe>
                    </div>
                    <div class="iframe-container" id="phy-unit5-right">
                        <div class="loader-container">
                            <div class="loader"></div>
                        </div>
                        <iframe class="doc-iframe"
                            src="https://docs.google.com/document/d/1unS8y0iX1s7IP1m7wNndzj0wy6a5YvASMquElbtPy-c/edit?rm=minimal&tab=t.0"></iframe>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Chatbot UI -->
    <div class="chat-toggler" id="chat-toggler">
        <i class="bi bi-chat-dots-fill"></i>
    </div>

    <div class="chat-window" id="chat-window">
        <div class="chat-header">
            <div class="chat-title">AI (unlimited, feel free to use)</div>
            <div class="chat-actions">
                <button class="chat-action" id="minimize-chat">
                    <i class="bi bi-dash"></i>
                </button>
            </div>
        </div>
        <div class="chat-container" id="chat-container"></div>
        <div class="status" id="status">Initializing...</div>
        <div class="chat-input-area">
            <input type="text" class="chat-input" id="message-input" placeholder="Ask a question...">
            <button class="send-button" id="send-button">
                <i class="bi bi-send-fill"></i>
            </button>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            // Check for dark mode preference
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.classList.add('dark-mode');
                document.getElementById('theme-toggle').innerHTML = '<i class="bi bi-sun"></i>';
            }

            // Dark mode toggle
            const themeToggle = document.getElementById('theme-toggle');
            themeToggle.addEventListener('click', function () {
                document.body.classList.add('theme-transition');
                if (document.documentElement.classList.contains('dark-mode')) {
                    document.documentElement.classList.remove('dark-mode');
                    this.innerHTML = '<i class="bi bi-moon"></i>';
                } else {
                    document.documentElement.classList.add('dark-mode');
                    this.innerHTML = '<i class="bi bi-sun"></i>';
                }
                setTimeout(() => {
                    document.body.classList.remove('theme-transition');
                }, 500);
            });

            // Listen for color scheme changes
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
                if (event.matches) {
                    document.documentElement.classList.add('dark-mode');
                    themeToggle.innerHTML = '<i class="bi bi-sun"></i>';
                } else {
                    document.documentElement.classList.remove('dark-mode');
                    themeToggle.innerHTML = '<i class="bi bi-moon"></i>';
                }
            });

            
            // Tab switching functionality
            function setupTabs(tabsEl, panelId) {
                const tabs = tabsEl.querySelectorAll('.tab');
                tabs.forEach(tab => {
                    tab.addEventListener('click', function () {
                        // Remove active class from all tabs
                        tabs.forEach(t => t.classList.remove('active'));
                        // Add active class to clicked tab
                        this.classList.add('active');

                        // Show the corresponding content
                        const tabId = this.getAttribute('data-tab');
                        const contentContainer = document.getElementById(tabId);

                        // Hide all content containers
                        const containers = document.querySelectorAll(`#${panelId} .iframe-container`);
                        containers.forEach(c => c.classList.remove('active'));

                        // Show the selected container
                        if (contentContainer) {
                            contentContainer.classList.add('active');
                        }
                    });
                });
            }

            // Setup tabs for both panels
            setupTabs(document.getElementById('left-tabs'), 'left-panel');
            setupTabs(document.getElementById('right-tabs'), 'right-panel');

            // // Improved panel resizing
            // const panelResizer = document.getElementById('panel-resizer');
            // const leftPanel = document.getElementById('left-panel');
            // const rightPanel = document.getElementById('right-panel');
            // const mainContent = document.querySelector('.main-content');
            // let isResizing = false;
            // let initialWidth, initialX, initialY;

            // function startResize(e) {
            //     // Prevent text selection during resize
            //     document.body.classList.add('no-select');

            //     isResizing = true;
            //     initialWidth = leftPanel.offsetWidth;

            //     if (e.type === 'touchstart') {
            //         initialX = e.touches[0].clientX;
            //         initialY = e.touches[0].clientY;
            //     } else {
            //         initialX = e.clientX;
            //         initialY = e.clientY;
            //     }

            //     // Add event listeners for movement and end
            //     if (e.type === 'touchstart') {
            //         document.addEventListener('touchmove', resizeHandler, { passive: false });
            //         document.addEventListener('touchend', stopResize);
            //     } else {
            //         document.addEventListener('mousemove', resizeHandler);
            //         document.addEventListener('mouseup', stopResize);
            //     }

            //     panelResizer.style.opacity = '1';
            //     e.preventDefault();
            // }

            // function resizeHandler(e) {
            //     if (!isResizing) return;

            //     let currentX, currentY;

            //     if (e.type === 'touchmove') {
            //         currentX = e.touches[0].clientX;
            //         currentY = e.touches[0].clientY;
            //         // Prevent scrolling while resizing
            //         e.preventDefault();
            //     } else {
            //         currentX = e.clientX;
            //         currentY = e.clientY;
            //     }

            //     const containerWidth = mainContent.offsetWidth;
            //     const containerHeight = mainContent.offsetHeight;

            //     if (window.innerWidth > 768) {
            //         // Horizontal resizing
            //         const dx = currentX - initialX;
            //         const newLeftWidth = Math.max(200, Math.min(initialWidth + dx, containerWidth - 200));
            //         const percentWidth = (newLeftWidth / containerWidth) * 100;

            //         document.documentElement.style.setProperty('--panel-width', percentWidth + '%');
            //     } else {
            //         // Vertical resizing
            //         const dy = currentY - initialY;
            //         const initialHeight = containerHeight * (parseFloat(leftPanel.style.height || '50') / 100);
            //         const newLeftHeight = Math.max(150, Math.min(initialHeight + dy, containerHeight - 150));
            //         const percentHeight = (newLeftHeight / containerHeight) * 100;

            //         leftPanel.style.height = percentHeight + '%';
            //         rightPanel.style.height = (100 - percentHeight) + '%';
            //     }

            //     // Use requestAnimationFrame for smoother resizing
            //     if (!window.requestAnimationFrame) {
            //         // Apply changes immediately if requestAnimationFrame is not available
            //         applyResize();
            //     } else {
            //         requestAnimationFrame(applyResize);
            //     }
            // }

            // function applyResize() {
            //     // This function intentionally left empty as we're modifying CSS variables
            //     // which apply immediately. It's here for potential future optimizations.
            // }

            // function stopResize() {
            //     isResizing = false;
            //     document.body.classList.remove('no-select');

            //     // Remove event listeners
            //     document.removeEventListener('mousemove', resizeHandler);
            //     document.removeEventListener('mouseup', stopResize);
            //     document.removeEventListener('touchmove', resizeHandler);
            //     document.removeEventListener('touchend', stopResize);

            //     panelResizer.style.opacity = '';
            // }

            // // Add event listeners for both mouse and touch
            // panelResizer.addEventListener('mousedown', startResize);
            // panelResizer.addEventListener('touchstart', startResize, { passive: false });

            // Handle iframe loading
            const iframes = document.querySelectorAll('.doc-iframe');
            iframes.forEach(iframe => {
                iframe.addEventListener('load', function () {
                    const loaderContainer = this.previousElementSibling;
                    if (loaderContainer && loaderContainer.classList.contains('loader-container')) {
                        loaderContainer.style.display = 'none';
                    }
                });
            });

            // Chatbot functionality
            const chatToggler = document.getElementById('chat-toggler');
            // const chatWindow = document.getElementById('chat-window');
            const minimizeChat = document.getElementById('minimize-chat');

            chatToggler.addEventListener('click', function () {
                chatWindow.classList.toggle('active');
                chatWindow.style.left = "0px";
                chatWindow.style.top = "0px";
            });

            minimizeChat.addEventListener('click', function () {
                chatWindow.classList.remove('active');
            });

            // Text selection in iframes
            iframes.forEach(iframe => {
                iframe.addEventListener('load', function () {
                    // Attempt to add selection listener to the iframe
                    try {
                        const iframeDoc = this.contentDocument || this.contentWindow.document;

                        // Listen for mouseup event which typically indicates text selection
                        iframeDoc.addEventListener('mouseup', function () {
                            try {
                                const selection = iframeDoc.getSelection();
                                const selectedText = selection.toString().trim();

                                if (selectedText && selectedText.length > 5) {
                                    // Only process significant selections (more than 5 chars)
                                    chatWindow.classList.add('active'); // Open chat window
                                    console.log(selectedText);
                                    sendSelectedTextToChat(selectedText);
                                }
                            } catch (err) {
                                console.log("Error getting selection from iframe:", err);
                            }
                        });
                    } catch (err) {
                        console.log("Cannot access iframe content due to same-origin policy:", err);
                        // Google Docs iframes are cross-origin, so direct access may be blocked
                        // We would need a different approach if this doesn't work
                    }
                });
            });

            function sendSelectedTextToChat(selectedText) {
                const messageInput = document.getElementById('message-input');
                messageInput.value = `Can you explain this: "${selectedText}"`;

                // Focus on the input to allow the user to modify the question if needed
                messageInput.focus();
            }

            // Chat API implementation
            let currentChatId = null;
            const chatContainer = document.getElementById('chat-container');
            const messageInput = document.getElementById('message-input');
            const sendButton = document.getElementById('send-button');
            const statusDiv = document.getElementById('status');

            // Start a new chat session when the page loads
            async function startNewChat() {
                try {
                    const response = await fetch('https://server-ef04.onrender.com/api/chat/new', {
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

                    const response = await fetch('https://server-ef04.onrender.com/api/chat/message', {
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
                messageDiv.innerHTML = marked.parse(message);
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

            // Event Listeners for chat
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

            const chatWindow = document.getElementById('chat-window'); // Chat window element
            let isDragging = false;
            let startX = 0, startY = 0; // Initial touch/mouse starting positions
            let offsetX = 0, offsetY = 0; // Offset for the window's new position

            // Start dragging
            function startDrag(e) {
                isDragging = true;
                chatWindow.classList.add('dragging');

                // Determine the starting point
                const event = e.type === 'touchstart' ? e.touches[0] : e;
                startX = event.clientX - chatWindow.offsetLeft;
                startY = event.clientY - chatWindow.offsetTop;

                // Prevent text selection
                document.body.style.userSelect = 'none';
            }

            // Perform dragging
            function drag(e) {
                if (!isDragging) return;

                const event = e.type === 'touchmove' ? e.touches[0] : e;
                offsetX = event.clientX - startX;
                offsetY = event.clientY - startY;

                // Update the position of the chat window
                chatWindow.style.left = `${Math.max(0, Math.min(window.innerWidth - chatWindow.offsetWidth, offsetX))}px`;
                chatWindow.style.top = `${Math.max(0, Math.min(window.innerHeight - chatWindow.offsetHeight, offsetY))}px`;

                // Prevent scrolling on mobile during drag
                e.preventDefault();
            }

            // Stop dragging
            function stopDrag() {
                isDragging = false;
                chatWindow.classList.remove('dragging');

                // Allow text selection again
                document.body.style.userSelect = '';
            }

            // Event listeners for mouse and touch events
            chatWindow.addEventListener('mousedown', startDrag);
            chatWindow.addEventListener('touchstart', startDrag, { passive: false });

            document.addEventListener('mousemove', drag);
            document.addEventListener('touchmove', drag, { passive: false });

            document.addEventListener('mouseup', stopDrag);
            document.addEventListener('touchend', stopDrag);
        });
    </script>
</body>

</html>
