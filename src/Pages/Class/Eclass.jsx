import { useEffect, useRef, useState } from "react";

const JitsiMeeting = ({ roomName, userName }) => {
  const containerRef = useRef(null);
  const [api, setApi] = useState(null);

  useEffect(() => {
    const domain = "meet.jit.si";
    let jitsiApi;

    const loadJitsi = () => {
      if (window.JitsiMeetExternalAPI) {
        const options = {
          roomName: roomName,
          parentNode: containerRef.current,
          userInfo: {
            displayName: userName,
          },
          configOverwrite: {
            prejoinPageEnabled: false, // skip pre-join
          },
          interfaceConfigOverwrite: {
            SHOW_JITSI_WATERMARK: false,
            TOOLBAR_BUTTONS: ["microphone", "camera", "hangup", "chat"],
          },
          width: "100%",
          height: 600,
        };

        jitsiApi = new window.JitsiMeetExternalAPI(domain, options);
        setApi(jitsiApi);
      }
    };

    // Load script dynamically if not already there
    if (!window.JitsiMeetExternalAPI) {
      const script = document.createElement("script");
      script.src = "https://meet.jit.si/external_api.js";
      script.async = true;
      script.onload = loadJitsi;
      document.body.appendChild(script);
    } else {
      loadJitsi();
    }

    return () => {
      if (jitsiApi) {
        jitsiApi.dispose();
      }
    };
  }, [roomName, userName]);

  const handleLeave = () => {
    if (api) {
      api.dispose();
      setApi(null);
      if (containerRef.current) {
        containerRef.current.innerHTML = ""; // clear iframe
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Meeting container */}
      <div
        ref={containerRef}
        className="w-full max-w-4xl rounded-lg overflow-hidden shadow-lg"
        style={{ height: "80vh" }}
      />

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
