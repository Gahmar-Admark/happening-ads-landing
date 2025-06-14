"use client"

import Banner from "./banner";
import Aboutus from "./aboutus";
import Faq from "./faq";
import { useEffect} from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';



export default function About() {
  useEffect(() => {
    AOS.init({ once: true, duration: 800 });
  }, []);
  return (<>
      <Banner/> 
    <Aboutus/>
    <Faq/>
    </>
    
  );
}
