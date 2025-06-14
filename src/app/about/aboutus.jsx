"use client"

import Image from 'next/image';
import Aboutimg from "/public/assets/images/about_us_img.jpg";
import HowweWorks from "/public/assets/images/howweworks_img.png";

import { useEffect, useState } from 'react';
import { getAboutUs } from "../../../services/service.js";

export default function Aboutus() {

  const [aboutUs, setAboutUs] = useState([]);

  useEffect(() => {
    // Dynamically import Bootstrap JS on client side
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  useEffect(() => {
    getAboutUs()
      .then((data) => {
        console.log('Fetched About us:', data); // 👈 Check the actual structure
        setAboutUs(data.data);
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <section className="light_grey_bg" id="middlecontent">
        <div className="container">
          {/* Header Section */}
          <div className="row align-items-center">
            <div className="col-lg-4 col-md-12">
              <div className="about_img_box position-relative" data-aos="fade-right" data-aos-delay="300">
                <span className="pattern_logo career_pattern_logo"> <Image className="img-fluid" src="/assets/images/pattern_logo.png" alt="Ahmar" width={200} height={45} /></span>
                <Image className='w-100' src={aboutUs?.topSection?.image} width={340} height={530} />
              </div>
            </div>
            <div className="col-lg-8 col-md-12">
              <div className="ps-lg-4 ps-md-0 pt-md-5">
                <h2 className="page_heading border-0 creative_heading text-uppercase">
                  <span className="first_line d-block" data-aos="fade-up" data-aos-delay="200">{aboutUs?.topSection?.title}</span>
                  <span className="second_line" data-aos="fade-up" data-aos-delay="400">{aboutUs?.topSection?.sub_title}</span>
                </h2>
                <div
                  className="text-muted"
                  data-aos="fade-up"
                  data-aos-delay="400"
                  dangerouslySetInnerHTML={{ __html: aboutUs?.topSection?.description }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {Array.isArray(aboutUs?.middleSections) && aboutUs.middleSections.map((section, index) => (
        <div className="container py-5" key={index}>
          <h2 className="page_heading text-center mb-5" data-aos="fade-up" data-aos-delay="200">{section.title}</h2>
          <div className="row">
            <div className="col-md-6">
              <div className="text-muted" data-aos="fade-up" data-aos-delay="400" dangerouslySetInnerHTML={{ __html: section.description1 }} />
              {/* <p className="text-muted" data-aos="fade-up" data-aos-delay="600">{section.description2}</p> */}
            </div>
            <div className="col-md-6">
              {/* <p className="text-muted" data-aos="fade-up" data-aos-delay="400">{section.description1}</p> */}
              <div className="text-muted" data-aos="fade-up" data-aos-delay="400" dangerouslySetInnerHTML={{ __html: section.description2 }} />
            </div>
          </div>
        </div>
      ))}
      <section className="howitworks_section">
        <div className="container">
          <h2 className="page_heading text-center mb-5" data-aos="fade-up" data-aos-delay="200">{aboutUs?.bottomSection?.title}</h2>
          <div className="row">
            <div className="col-md-12">
              <div className="howweworks_img" data-aos="slide-right" data-aos-delay="200">
                <Image className='img-fluid' src={aboutUs?.bottomSection?.image} width={1462} height={434} />
              </div>
            </div>
          </div>
        </div>
      </section>



    </>
  );
}