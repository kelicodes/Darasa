// CreateMeetingButton.jsx
import { useNavigate } from "react-router-dom";

const CreateMeetingButton = () => {
  const navigate = useNavigate();

  const createMeeting = () => {
    // Generate random room ID (you could also use user ID, timestamp, etc.)
    const roomId = "room-" + Math.random().toString(36).substring(2, 10);

    // Redirect user to the new meeting page
    navigate(`/meeting/${roomId}`);
  };

  return (
    <button 
      onClick={createMeeting} 
      className="bg-blue-600 text-white px-4 py-2 rounded-lg"
    >
      Create Meeting
    </button>
  );
};

export default CreateMeetingButton;
