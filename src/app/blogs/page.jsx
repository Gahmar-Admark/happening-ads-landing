"use client"
import Banner from "./banner";
import Bloglisting from "./blogs";
import { useEffect, useState ,useContext} from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';



export default function Blog() {
    useEffect(() => {
      AOS.init({ once: true, duration: 800 });
    }, []);
  return (<>
    <Banner/>

    <Bloglisting/>
    </>
    
  );
}
