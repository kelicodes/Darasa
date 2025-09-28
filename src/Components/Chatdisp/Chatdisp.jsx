import { useContext } from "react"; 
import "./Chatdisp.css";

import { ShopContext } from "../../Context/ShopContext";

const Chatdisp = () => {
  const { chats, users,accessChats } = useContext(ShopContext);
  const safeChats = chats || [];
  const safeUsers = users || [];
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const currentUserId = currentUser?._id;

  

const getChatWithUser = (userId) => {
  return safeChats.find(
    (chat) =>
      !chat.isGroupChat &&
      chat.users.some((u) => u._id === userId) &&
      chat.users.some((u) => u._id === currentUserId)
  );
};


  return (
    <div className="chatdisp">
      <h4>Users</h4>
      {safeUsers
        .filter((u) => u._id !== currentUserId)
        .map((user) => {
          const existingChat = getChatWithUser(user._id);
          const chatName = existingChat
            ? existingChat.users.find((u) => u._id !== currentUserId)?.name
            : user.name;

          return (
            <div
              key={user._id}
              className="user"
              onClick={() => {
            
                accessChats(user._id)
              }}
            >
              <img
                src={user.profilepic}
                alt={user.name}
                className="profile-pic"
              />
              <p>{chatName}</p>
              {existingChat?.latestmsg && (
                <small>
                  {existingChat.latestmsg.sender.name}: {existingChat.latestmsg.content}
                </small>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default Chatdisp;
