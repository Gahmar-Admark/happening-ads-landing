"use client"
import Banner from "./banner";
import Portfolio from "./portfolio";
import { useEffect, useState ,useContext} from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';



export default function PortfolioAds() {
useEffect(() => {
  AOS.init({ once: true, duration: 800 });
}, []);
  return (<>
    <Banner/>
    <Portfolio/>
    </>
    
  );
}
