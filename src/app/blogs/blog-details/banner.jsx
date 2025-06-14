// components/AboutBanner.js
import Link from 'next/link';
import Image from 'next/image';
import Aboutbanner from "/public/assets/images/store_banner.jpg";
import { useEffect, useState} from 'react';


export default function AboutBanner() {
  const [position, setPosition] = useState(0);
      
  useEffect(() => {
    let animationFrame;
    let startTime = null;
    const duration = 2000; // 2 seconds for full animation cycle
    const maxTranslation = 10; // Maximum translation in pixels
    
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      
      // Calculate position using sine wave for smooth, continuous motion
      // This creates a smooth up and down animation that loops seamlessly
      const progress = (elapsed % duration) / duration;
      const newPosition = Math.sin(progress * Math.PI * 2) * maxTranslation;
      
      setPosition(newPosition);
      animationFrame = requestAnimationFrame(animate);
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);
  return (
    <div className="banner-wrapper service_detail_banner position-relative text-white">
       <Image className='img-fluid' src={Aboutbanner} width={1920} height={395}/> 
     
   
    </div>

  );
}