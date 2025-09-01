'use client';
import AboutBanner from "./home/banner";
import Bloglisting from "./blogs/blogs";
// import htmlFile from '../../public/index.html';

export default function Home() {
  return (
    <iframe
      src="/index.html"
      style={{ width: "100%", height: "118vh", border: "none"  }}
    />
  );
}