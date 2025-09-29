import { useState, useEffect, useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import { IoAddSharp } from "react-icons/io5";
import "./Groupdisp.css"
import axios from "axios";
import { toast } from "react-toastify";
import {Link} from "react-router-dom"

const Groupdisp = () => {
  const { BASE_URL, token, groups, setGroups, createGrp, navigate,accessGroups } = useContext(ShopContext);

  const [showModal, setShowModal] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [usersList, setUsersList] = useState([]); // all users from DB
  const [selectedUsers, setSelectedUsers] = useState([]);

  

  // --- Fetch all users from DB ---
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/user/allusers`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (data.success) setUsersList(data.users);
      } catch (err) {
        console.error("Error fetching users:", err);
        toast.error("Failed to load users");
      }
    };
    fetchUsers();
  }, [BASE_URL, token]);

  // --- Handle selecting users ---
  const toggleUser = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  // --- Handle group creation ---
  const handleCreateGroup = async () => {
    if (!groupName || selectedUsers.length < 1) {
      toast.error("Enter group name and select at least 1 user");
      return;
    }

    try {
      await createGrp({ name: groupName, users: selectedUsers });

      setShowModal(false);
      setGroupName("");
      setSelectedUsers([]);
    } catch (err) {
      console.error("Error creating group:", err);
      toast.error("Failed to create group");
    }
  };
  


  return (
    <div className="groupdisp">
      <div className="mybuttons">
        <Link to="/"><button>Chats</button></Link>
        <Link to="/group"><button>Groups</button></Link>
      </div>
      {groups
        .filter(Boolean) // remove undefined or null entries
        .map((group, index) => (
          <div key={group._id || index} onClick={() => accessGroups(group._id)} className="group">
            <p>Group: {group.chatname}</p>
          </div>
        ))}

      {/* Icon to open modal */}
      <div className="creategrp">
        <IoAddSharp
          size={30}
          style={{ cursor: "pointer" }}
          onClick={() => setShowModal(true)}
        />
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Create Group</h3>

            <input
              type="text"
              placeholder="Group Name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />

            <div className="users-list">
              {usersList.map((user) => (
                <div key={user._id}>
                  <input
                    type="checkbox"
                    id={user._id}
                    checked={selectedUsers.includes(user._id)}
                    onChange={() => toggleUser(user._id)}
                  />
                  <label htmlFor={user._id}>{user.name}</label>
                </div>
              ))}
            </div>

            <button onClick={handleCreateGroup}>Create</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Groupdisp;
