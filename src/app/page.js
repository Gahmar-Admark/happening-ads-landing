"use client";
import AboutBanner from "./home/banner";
import Bloglisting from "./blogs/blogs";
// import htmlFile from '../../public/index.html';

export default function Home() {
  return (
    <video
      src="https://res.cloudinary.com/dvqzu9oin/video/upload/v1756968731/gahmar/videoplayback_sjnxoo.mp4"
      autoPlay
      loop
      muted
      controls={false}
      style={{ width: '100%', height: '100vh', objectFit: 'cover', margin: 0 }}
    />
  );
}
