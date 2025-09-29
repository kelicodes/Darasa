import { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";
import { ShopContext } from "../../Context/ShopContext";
import "./Chat.css";

const Chat = () => {
  const { chatId } = useParams();
  const { BASE_URL, token, user } = useContext(ShopContext);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typingUsers, setTypingUsers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socketRef = useRef(null);

  // --- Connect to socket ---
  useEffect(() => {
    socketRef.current = io(BASE_URL, { withCredentials: true });

    if (user) {
      socketRef.current.emit("setup", user);

      socketRef.current.on("connected", () => {
        console.log("Socket connected");
      });

      // --- Listen for incoming messages ---
      socketRef.current.on("new message", (newMessage) => {
        setMessages((prev) => [...prev, newMessage]);
      });

      // --- Typing indicators ---
      socketRef.current.on("typing", ({ userId }) => {
        setTypingUsers((prev) => [...new Set([...prev, userId])]);
      });

      socketRef.current.on("stop typing", ({ userId }) => {
        setTypingUsers((prev) => prev.filter((id) => id !== userId));
      });

      // --- Online users ---
      socketRef.current.on("online-users", (users) => {
        setOnlineUsers(users);
      });

      // --- Join the current chat room ---
      if (chatId) {
        socketRef.current.emit("JOIN_CHAT", chatId);
      }
    }

    return () => {
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, [BASE_URL, user, chatId]);

  // --- Fetch old messages ---
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/msg/allmsg/${chatId}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        if (data.success) {
          setMessages(data.messages);
        }
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };

    if (chatId) fetchMessages();
  }, [chatId, BASE_URL, token]);

  // --- Handle sending message ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      const { data } = await axios.post(
        `${BASE_URL}/msg/sendmsg`,
        { content: input, chatId },
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );

      if (data.success) {
        setMessages((prev) => [...prev, data.message]);
        setInput("");
        socketRef.current.emit("new message", data.message);
        socketRef.current.emit("stop typing", chatId);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // --- Handle typing ---
  const handleTyping = () => {
    socketRef.current.emit("typing", chatId);
    clearTimeout(window.typingTimeout);
    window.typingTimeout = setTimeout(() => {
      socketRef.current.emit("stop typing", chatId);
    }, 1000);
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <p>
          Online Users:{" "}
          {onlineUsers
            .map((id) => (id === user?._id ? "You" : id))
            .join(", ")}
        </p>
      </div>

      <div className="msg">
        {messages.map((message, index) => {
          const isOwnMessage = message.sender?._id === user?._id;
          return (
            <div
              key={index}
              className={`message ${isOwnMessage ? "own" : "other"}`}
            >
              {!isOwnMessage && (
                <span className="sender-name">{message.sender?.name}</span>
              )}
              <span className="message-text">
                {message.content || message.text}
              </span>
            </div>
          );
        })}
      </div>

      {/* Typing Indicator */}
      {typingUsers.length > 0 && (
        <p className="typing-indicator">Someone is typing...</p>
      )}

      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            handleTyping();
          }}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
