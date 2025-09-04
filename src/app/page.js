"use client";
import { useRef, useEffect, useState } from "react";

export default function Home() {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const handleInteraction = () => {
      if (videoRef.current) {
        videoRef.current.muted = false;
        videoRef.current.volume = 0.7;
        setIsMuted(false);

        // call play() directly inside the gesture handler
        videoRef.current.play().catch(err => {
          console.warn("Still blocked:", err);
        });
      }

      // remove listeners after first gesture
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("keydown", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
    };

    document.addEventListener("click", handleInteraction);
    document.addEventListener("keydown", handleInteraction);
    document.addEventListener("touchstart", handleInteraction);

    return () => {
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("keydown", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
    };
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !videoRef.current.muted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <video
        ref={videoRef}
        src="https://res.cloudinary.com/dvqzu9oin/video/upload/v1756970995/websitevdo_-_Sachin_Web_1080p_h264_j5we1d.mp4"
        autoPlay
        loop
        muted
        playsInline
        controls={false}
        style={{
          width: "100%",
          height: "100vh",
          objectFit: "cover",
          margin: 0,
        }}
      />
      
      {/* Mute/Unmute Button */}
      <button
        onClick={toggleMute}
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          border: 'none',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
          color: 'white',
          cursor: 'pointer',
          zIndex: 10,
          transition: 'background-color 0.3s ease',
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'}
        onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.6)'}
        title={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? '🔇' : '🔊'}
      </button>
    </div>
  );
}
