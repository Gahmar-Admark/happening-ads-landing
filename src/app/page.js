"use client";
import { useRef, useEffect } from "react";

export default function Home() {
  const videoRef = useRef(null);

  useEffect(() => {
    const handleInteraction = () => {
      if (videoRef.current) {
        videoRef.current.muted = false;
        videoRef.current.volume = 0.7;

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

  return (
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
  );
}
