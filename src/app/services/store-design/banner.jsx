// components/AboutBanner.js
import Link from 'next/link';
import Image from 'next/image';
import Aboutbanner from "/public/assets/images/store_banner.jpg";
import { getServiceSubCatById } from "../../../../services/service.js";
import { useEffect, useState, useCallback } from 'react';
import Loader from '../../component/Loader.js'; // Import your Loader component

export default function AboutBanner({ id }) {
  const [position, setPosition] = useState(0);
  const [serviceData, setServiceData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true); // Set loading to true when fetch starts
      const res = await getServiceSubCatById(id);
      if (res?.data) {
        setServiceData(res.data);
      }
    } catch (error) {
      console.error('Failed to fetch service data:', error);
      setServiceData(null);
    } finally {
      setIsLoading(false); // Set loading to false when fetch completes
    }
  }, [id]);

  useEffect(() => {
    if (id && !serviceData) {
      fetchData();
    }
  }, [id, fetchData, serviceData]);

  // useEffect(() => {
  //   let animationFrame;
  //   let startTime = null;
  //   const duration = 2000;
  //   const maxTranslation = 10;

  //   const animate = (timestamp) => {
  //     if (!startTime) startTime = timestamp;
  //     const elapsed = timestamp - startTime;
  //     const progress = (elapsed % duration) / duration;
  //     const newPosition = Math.sin(progress * Math.PI * 2) * maxTranslation;
  //     setPosition(newPosition);
  //     animationFrame = requestAnimationFrame(animate);
  //   };

  //   animationFrame = requestAnimationFrame(animate);

  //   return () => {
  //     cancelAnimationFrame(animationFrame);
  //   };
  // }, []);

  // Return loader while data is loading
  if (isLoading) {
    return <Loader loadingText="Loading banner..." />;
  }

  return (
    <div className="banner-wrapper service_detail_banner position-relative text-white">
      <Image 
        className='img-fluid' 
        src={serviceData?.bannerImage || Aboutbanner} 
        width={1920} 
        height={395} 
        alt="Banner Image"
      />
    </div>
  );
}