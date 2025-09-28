import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./Eclass.css";

const Eclass = () => {
  const [roomName, setRoomName] = useState("");

  const startMeeting = () => {
    const unique = uuidv4(); // generate unique room
    setRoomName(unique);
  };

  return (
    <div className="eclass">
      {!roomName && (
        <button onClick={startMeeting}>
          START
        </button>
      )}

      {roomName && (
        <iframe
          src={`https://meet.jit.si/${roomName}`}
          allow="camera; microphone; fullscreen; display-capture"
          style={{ width: "100%", height: "100%", border: "0" }}
          title="Jitsi Meeting"
        />
      )}
    </div>
  );
};

export default Eclass;
