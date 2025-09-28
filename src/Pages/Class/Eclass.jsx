import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./Eclass.css";

const Eclass = () => {
  const { roomId } = useParams();
  const containerRef = useRef(null);

  useEffect(() => {
    const domain = "meet.jit.si"; // you can self-host later
    const options = {
      roomName: roomId, // room is tied to the URL
      width: "100%",
      height: 600,
      parentNode: containerRef.current,
    };

    const script = document.createElement("script");
    script.src = "https://meet.jit.si/external_api.js";
    script.async = true;
    script.onload = () => {
      new window.JitsiMeetExternalAPI(domain, options);
    };
    document.body.appendChild(script);

    return () => {
      containerRef.current.innerHTML = "";
    };
  }, [roomId]);

  return (
    <div>
      <h2>Meeting: {roomId}</h2>
      <div ref={containerRef} style={{ width: "100%", height: "600px" }} />
    </div>
  );
};

export default Eclass;
