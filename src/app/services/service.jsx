import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getServiceCategories } from "../../../services/service.js";
import { useEffect, useState } from 'react';

// Service Card Component
const ServiceCard = ({ title, imageSrc, altText, url , description }) => {

  const linkUrl = url || '#';
  console.log('linkUrl', linkUrl);
  

  return (
    <div className="col-md-4 p-4 pt-0 pb-2 service_cntr">
      <div className="service_box h-100 border-0 text-center">
        <Link href={linkUrl}>
          <div className="service_inner_box overflow-hidden position-relative p-0 border-animation-wrapper">
            <Image
              src={imageSrc}
              alt={altText}
              width={450}
              height={450}
              className="img-fluid"
            />
            <div className="service_hover_box">
              <div className="service_caption">
                <h5 className="card-title" data-aos="fade-up" data-aos-delay="400">{title}</h5>
                <p className="card-description" data-aos="fade-up" data-aos-delay="600">{description}</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

// Main Services Page Component
export default function ServicePage() {
  const [serviceCategory, setServiceCategory] = useState(null);

  useEffect(() => {
    fetchServiceCategory()
  }, []);

  const fetchServiceCategory = async () => {
    try {
      const res = await getServiceCategories();
      console.log(res, "res res res res res");

      setServiceCategory(res.data);
    } catch (error) {
      console.error('Error fetching banner:', error);
    }
  };

  if (!serviceCategory) return null;

  return (
    <>
      {serviceCategory && serviceCategory.map((category) => (
        <section className="digital_section pt-5" id="middlecontent">
          <div className="container">
            <div className="heading_box text-center mb-5">
              <h2 className="page_heading text-uppercase" data-aos="fade-up" data-aos-delay="400">{category?.title}</h2>
              <p className="text-center" data-aos="fade-up" data-aos-delay="600">{category?.description}</p>
            </div>

            <div className="row">
              {category?.sub_categories.map((service) => (
                <ServiceCard
                  key={service._id}
                  title={service.title}
                  imageSrc={service.image}
                  altText={'alt_tag'}
                  description={service.description}
                  url={`/services/store-design/${service._id}`}
                />
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}