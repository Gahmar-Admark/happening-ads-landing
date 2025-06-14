import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getServiceSubCatById } from "../../../../services/service.js";

export default function ServiceDetail({ id }) {
  const [serviceData, setServiceData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getServiceSubCatById(id);
        if (res && res?.data) {
          setServiceData(res?.data);
        }
      } catch (error) {
        console.error('Failed to fetch service data:', error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <>
      <section className="light_grey_bg">
        <div className="container">
          <div className="heading_box text-center mb-5">
            <h2 className="page_heading text-uppercase" data-aos="fade-up" data-aos-delay="200">
              {serviceData?.title}
            </h2>
            <div className="text-center" data-aos="fade-up" data-aos-delay="400" dangerouslySetInnerHTML={{ __html: serviceData?.description }} />
          </div>

          {serviceData?.service?.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <div className="row align-items-center mb-5" key={item._id || index}>
                {isEven ? (
                  <>
                    <div className="col-lg-6">
                      <div className="service_detail_img">
                        <Image
                          className="img-fluid"
                          src={item.image || '/default.jpg'}
                          alt={item.title}
                          width={1920}
                          height={400}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="service_detail_box">
                        <h2>{item.title}</h2>
                        <div dangerouslySetInnerHTML={{ __html: item.description }} />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="col-lg-6 order-lg-2">
                      <div className="service_detail_img">
                        <Image
                          className="img-fluid"
                          src={item.image || '/default.jpg'}
                          alt={item.title}
                          width={1920}
                          height={400}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 order-lg-1">
                      <div className="service_detail_box">
                        <h2>{item.title}</h2>
                        <div dangerouslySetInnerHTML={{ __html: item.description }} />
                      </div>
                    </div>

                  </>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
