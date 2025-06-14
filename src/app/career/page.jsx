"use client"
import Banner from "./banner";
import Career from "./career";
import { useEffect, useState ,useContext} from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';


export default function career() {
useEffect(() => {
AOS.init({ once: true, duration: 800 });
}, []);
  return (<>
      <Banner/>

    <Career/>
    </>
    
  );
}
