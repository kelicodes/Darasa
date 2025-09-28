import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";

export const useAccessChats = () => {
  try{
  const { token, chats, setChats } = useContext(ShopContext);
  const navigate = useNavigate();
  const BASE_URL = "http://localhost:4000";

  const accessChat = async (userId) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/chat/accesschats/${userId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data && data._id) {
        setChats((prev) => {
          // Avoid duplicates
          if (prev.find((c) => c._id === data._id)) return prev;
          return [...prev, data];
        });

        navigate(`/chat/${data._id}`);
      }
    } catch (err) {
      console.error("accessChat failed", err);
    }
  };

  return accessChat;
}catch (err) {
    console.error("Error in accessChats:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
