import { useEffect, useRef, useState } from "react";

const JitsiMeeting = ({ roomId }) => {
  const containerRef = useRef(null);
  const [api, setApi] = useState(null);

  useEffect(() => {
    const domain = "meet.jit.si";
    const options = {
      roomName: roomId,
      width: "100%",
      height: 600,
      parentNode: containerRef.current,
    };

    let jitsiApi;

    const script = document.createElement("script");
    script.src = "https://meet.jit.si/external_api.js";
    script.async = true;
    script.onload = () => {
      jitsiApi = new window.JitsiMeetExternalAPI(domain, options);
      setApi(jitsiApi);
    };
    document.body.appendChild(script);

    return () => {
      if (jitsiApi) {
        jitsiApi.dispose(); // ✅ Cleanup Jitsi instance
      }
    };
  }, [roomId]);

  // Handle leaving meeting
  const handleLeave = () => {
    if (api) {
      api.dispose();
      setApi(null); // Clear instance
      if (containerRef.current) {
        containerRef.current.innerHTML = ""; // Clear iframe
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Meeting container */}
      <div ref={containerRef} className="w-full max-w-4xl rounded-lg overflow-hidden shadow-lg" />

      {/* Leave button */}
      {api && (
        <button
          onClick={handleLeave}
          className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
        >
          Leave Meeting
        </button>
      )}
    </div>
  );
};

export default JitsiMeeting;
