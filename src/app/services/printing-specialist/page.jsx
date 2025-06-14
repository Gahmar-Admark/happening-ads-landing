"use client"
import Banner from "./banner";
import ServiceDetails from "./servicedetails";
import { useEffect, useState ,useContext} from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';



export default function About() {
    useEffect(() => {
      AOS.init({ once: true, duration: 800 });
    }, []);
  return (<>
    <Banner/>
    <ServiceDetails/>
    </>
    
  );
}
