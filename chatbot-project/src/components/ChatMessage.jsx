import ImageProfileChatbot from '../assets/chatbot.png'
import ImageProfileUser from '../assets/user.png'
import './ChatMessage.css'

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

export default ChatMessage;