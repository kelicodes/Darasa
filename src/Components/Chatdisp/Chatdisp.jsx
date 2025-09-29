import { useContext } from "react"; 
import "./Chatdisp.css";

import { ShopContext } from "../../Context/ShopContext";

const Chatdisp = () => {
  const { chats, users,accessChats } = useContext(ShopContext);
  console.log(users)
  const safeChats = chats ;
  const safeUsers = users ;
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
  .filter((u) => String(u._id) !== String(currentUser._id)) // exclude self
  .map((user) => {
    const existingChat = getChatWithUser(user._id);
    const chatName = existingChat
      ? existingChat.users.find((u) => String(u._id) !== String(currentUser._id))?.name
      : user.name;

    return (
      <div
        key={user._id}
        className="user"
        onClick={() => accessChats(user._id)}
      >
        <img
          src={user.profilepic}
          alt={user.name}
          className="profile-pic"
        />
         <div className="user-info">
    <p className="username">{chatName}</p>
    {existingChat?.latestmsg && (
      <small className="lastmsg">{existingChat.latestmsg.content}</small>
    )}
  </div>
      </div>
    );
  })}

    </div>
  );
};

export default Chatdisp;
