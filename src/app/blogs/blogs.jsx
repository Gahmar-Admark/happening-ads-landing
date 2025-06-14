import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Aboutbanner from "/public/assets/images/service_banner.jpg";
import { getAllBlogs } from "../../../services/service";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await getAllBlogs();
      setBlogs(res.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const skeletonArray = new Array(6).fill(null);

  return (
    <section className="blog_section light_grey_bg pb-2" id="middlecontent">
      <div className="container">
        <div className="row">
          {loading ? (
            skeletonArray.map((_, index) => (
              <div className="col-md-4 p-4 pt-0 pb-2 service_cntr" key={index}>
                <div className="service_box h-100 border-0 text-center">
                  <div className="skeleton-image mb-3" />
                  <div className="skeleton-text title mb-2" />
                  <div className="skeleton-text small" />
                </div>
              </div>
            ))
          ) : (
            blogs.map((item, index) => (
              <div className="col-md-4 p-4 pt-0 pb-2 service_cntr" key={item._id || index}>
                <div className="service_box h-100 border-0 text-center">
                  <Link href={`/blogs/blog-details/${item._id}`}>
                    <div className="service_inner_box position-relative p-0">
                      <div className="blog_img_box overflow-hidden">
                        <Image
                          src={item?.image || '/default.jpg'}
                          width={450}
                          height={450}
                          className="img-fluid"
                          alt={item?.title || 'Blog image'}
                        />
                      </div>
                      <div className="blogs_box">
                        <div className="service_caption">
                          <span className="date_text">
                            {item?.createdAt && new Date(item.createdAt).toLocaleString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: 'numeric',
                              minute: '2-digit',
                              hour12: true,
                            })}
                          </span>
                          <h5 className="card-title">{item?.title}</h5>
                          <Link href={`/blogs/blog-details/${item._id}`}>
                            Read More
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
