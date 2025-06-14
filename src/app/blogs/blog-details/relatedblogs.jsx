 
 
 import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Aboutbanner from "/public/assets/images/service_banner.jpg";

// Service Card Component
export default function Relatedblogs() {
  
  return (
  <section className="blog_section light_grey_bg pb-2">
    <div className="container">
          <div className="heading_box text-center mb-5">
            <h2 className="page_heading text-uppercase" data-aos="fade-up" data-aos-delay="200">Related Blogs</h2>
          </div>
          
          <div className="row">
    
      <div className="col-md-4 p-4 pt-0 pb-2 service_cntr">
      <div className="service_box h-100 border-0 text-center">
        <Link href="/blogs/blog-details">
          <div className="service_inner_box position-relative p-0">
            <div className="blog_img_box  overflow-hidden">
            <Image 
              src={Aboutbanner} 
              width={450}
              height={450}
              className="img-fluid"
            />
            </div>
            <div className="blogs_box">
              <div className="service_caption">
                <span className="date_text">December-27-2024</span>
                <h5 className="card-title">Elevating Your Brand's Presence.</h5>
                <Link href="/blogs/blog-details" className="btn btn-link">
                  Read More
                </Link>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>

       <div className="col-md-4 p-4 pt-0 pb-2 service_cntr">
      <div className="service_box h-100 border-0 text-center">
        <Link href="/blogs/blog-details">
          <div className="service_inner_box position-relative p-0">
            <div className="blog_img_box  overflow-hidden">
            <Image 
              src={Aboutbanner} 
              width={450}
              height={450}
              className="img-fluid"
            />
            </div>
            <div className="blogs_box">
              <div className="service_caption">
                <span className="date_text">December-27-2024</span>
                <h5 className="card-title">Elevating Your Brand's Presence.</h5>
                <Link href="/blogs/blog-details" className="btn btn-link">
                  Read More
                </Link>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
       <div className="col-md-4 p-4 pt-0 pb-2 service_cntr">
      <div className="service_box h-100 border-0 text-center">
        <Link href="/blogs/blog-details">
          <div className="service_inner_box position-relative p-0">
            <div className="blog_img_box  overflow-hidden">
            <Image 
              src={Aboutbanner} 
              width={450}
              height={450}
              className="img-fluid"
            />
            </div>
            <div className="blogs_box">
              <div className="service_caption">
                <span className="date_text">December-27-2024</span>
                <h5 className="card-title">Elevating Your Brand's Presence.</h5>
                <Link href="/blogs/blog-details" className="btn btn-link">
                  Read More
                </Link>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>

    </div>
    </div>
</section>
  );
};


