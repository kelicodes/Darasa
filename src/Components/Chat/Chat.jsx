import { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";   
import { io } from "socket.io-client";
import axios from "axios";
import { ShopContext } from "../../Context/ShopContext";
import "./Chat.css";

const Chat = () => {
  const { chatId } = useParams();   
  const [msg, setMsg] = useState([]);
  const { BASE_URL, token, user } = useContext(ShopContext); 
  const [input, setInput] = useState("");
  const socketRef = useRef(null);

  // ✅ 1. Connect socket
  useEffect(() => {
    socketRef.current = io(BASE_URL, { withCredentials: true });

    if (user) {
      socketRef.current.emit("setup", user);

      socketRef.current.on("connected", () => {
        console.log("socket connected");
      });

      // ✅ Listen for messages from backend
      socketRef.current.on("new message", (newMessage) => {
        setMsg((prev) => [...prev, newMessage]);
      });
    }

    return () => {
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, [BASE_URL, user]);

  // ✅ 2. Fetch old messages when chatId changes
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/msg/allmsg/${chatId}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        if (data.success) {
          setMsg(data.messages);
        }
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };

    if (chatId) fetchMessages();
  }, [chatId, BASE_URL, token]);

  // ✅ 3. Send new message
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      const { data } = await axios.post(
        `${BASE_URL}/msg/sendmsg`,
        {
          content: input,
          chatId: chatId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (data.success) {
        setMsg((prev) => [...prev, data.message]);
        setInput("");

        // ✅ Emit message to socket so others get it
        socketRef.current.emit("new message", data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="chat-container">
      <div className="msg">
        {msg.map((message, index) => {
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
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
