"use client"
import Banner from "../banner";
import BlogDetails from "../blogdetails";
import Relatedblogs from "../relatedblogs";

import { useEffect, useState, useContext } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useParams } from "next/navigation";


export default function Detail() {
   const params = useParams()

  useEffect(() => {
    AOS.init({ once: true, duration: 800 });
  }, []);
  return (<>
    <Banner />
    <BlogDetails id={params.id}/>
    {/* <Relatedblogs /> */}
  </>

  );
}
