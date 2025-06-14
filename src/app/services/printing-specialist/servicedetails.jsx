// components/AboutBanner.js
import Link from 'next/link';
import Image from 'next/image';
import Storeimg from "/public/assets/images/printingimg.jpg";
import Storeimg2 from "/public/assets/images/printingimg2.jpg";

import { useEffect, useState} from 'react';


export default function ServiceDetail() {
  
  return (
    <>
  <section className="light_grey_bg">
        <div className="container">
          {/* Branding Services Section */}
          <div className="heading_box text-center mb-5">
            <h2 className="page_heading text-uppercase" data-aos="fade-up" data-aos-delay="200">Printing Specialist
</h2>
            <p className="text-center" data-aos="fade-up" data-aos-delay="400">At Haappeningads, we provide premium printing solutions using state-of-the-art technology. <br></br>Our prints feature vibrant colors and sharp details, and we focus on precision and on-time delivery to<br></br> ensure exceptional quality every time.


</p>
          </div>
          
          <div className="row align-items-center">
            <div className="col-lg-6">
            <div className="service_detail_img">
         <Image className='img-fluid' src={Storeimg} width={1920} height={400}/> 
            </div>
            </div>
             <div className="col-lg-6">
            <div className="service_detail_box">
            <h2>Crafting Visual Impact</h2>
            <p>Printing specialists play a vital role in enhancing your brand's appeal by bringing marketing materials to life through advanced printing techniques and exceptional attention to detail.</p>
            </div>
            </div>

           

          </div>
        </div>
      </section>

 <section className="digital_section service_secopnd_section">
        <div className="container">
          
          <div className="row align-items-center">
          
             <div className="col-lg-6">
            <div className="service_detail_box">
            <h2>Flex/Vinyl Printing</h2>
            <p>Flex and vinyl printing offer bold, durable graphics, ideal for creating impactful banners, signs, and displays.</p>
            </div>
            </div>

             <div className="col-lg-6">
            <div className="service_detail_img">
         <Image className='img-fluid' src={Storeimg2} width={1920} height={400}/> 
            </div>
            </div>

          </div>
        </div>
      </section>

      </>
  );
}