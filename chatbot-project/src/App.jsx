import { useState, useRef, useEffect } from 'react'
import { Chatbot } from 'supersimpledev'
import ImageProfileChatbot from './assets/chatbot.png'
import ImageProfileUser from './assets/user.png'
import './App.css'

function ChatInput({ chatMessages, setChatMessages }) {
    const [inputText, setInputText] = useState("");

    function saveInputText(event) {
        setInputText(event.target.value);
    }

    function sendMessage() {
        const newChatMessages = [
            ...chatMessages,
            {
                message: inputText,
                sender: "user",
                id: crypto.randomUUID()
            }
        ];

        setChatMessages(newChatMessages);

        const response = Chatbot.getResponse(inputText);
        setChatMessages([
            ...newChatMessages,
            {
                message: response,
                sender: "chatbot",
                id: crypto.randomUUID()
            }
        ]);

        setInputText("");
    }

    return (
        <div className="chat-input-container">
            <input
                placeholder="Send a message to Chatbot"
                size="32"
                onChange={saveInputText}
                value={inputText}
                className="chat-input"
            />
            <button
                className="send-button"
                onClick={sendMessage}
            >Send</button>
        </div>
    );
}

function ChatMessage({ message, sender }) {
    return (
        <div className={sender === "user" ? "chat-message-user" : "chat-message-chatbot"}>
            {sender === "chatbot" && (
                <img
                    src={ImageProfileChatbot}
                    className="chat-message-profile"
                />
            )}
            <div className="chat-message-text">
                {message}
            </div>
            {sender === "user" && (
                <img
                    src={ImageProfileUser}
                    className="chat-message-profile"
                />
            )}
        </div>
    );
}

function ChatMessages({ chatMessages }) {
    const chatMessagesRef = useRef(null);

    useEffect(() => {
        const containerElement = chatMessagesRef.current;
        if (containerElement) {
            containerElement.scrollTop = containerElement.scrollHeight;
        }
    }, [chatMessages]);

    return (
        <div
            className="chat-messages-container"
            ref={chatMessagesRef}
        >
            {chatMessages.map((chatMessage) => {
                return (
                    <ChatMessage
                        message={chatMessage.message}
                        sender={chatMessage.sender}
                        key={chatMessage.id}
                    />
                );
            })}
        </div>
    )
}

function App() {
    const [chatMessages, setChatMessages] = useState([{
        message: "hello chatbot",
        sender: "user",
        id: "id1"
    },
        {
            message: "hello! How can I help you?",
            sender: "chatbot",
            id: "id2"
        },
        {
            message: "can you get me todays date?",
            sender: "user",
            id: "id3"
        },
        {
            message: "Today is August 19",
            sender: "chatbot",
            id: "id4"
        }]);

    return <div className="app-container">
        <ChatMessages
            chatMessages={chatMessages}
        />
        <ChatInput
            chatMessages={chatMessages}
            setChatMessages={setChatMessages}
        />
    </div>
}

export default App
