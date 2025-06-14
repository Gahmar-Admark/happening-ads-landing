// pages/index.js
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Aboutbanner from "/public/assets/images/service_banner.jpg";
import { getBlogById } from "../../../../services/service.js";
import './[id]/style.css';

export default function BlogPost({ id }) {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getBlogById(id);
        if (res && res.data) {
          setBlog(res.data);
        }
      } catch (error) {
        console.error('Failed to fetch service data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  return (
    <section className="blog_section">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12">
            <article className="bg-white rounded-3 shadow-sm p-4 mb-4">
              {loading ? (
                <div className="skeleton-wrapper">
                  <div className="skeleton skeleton-meta" />
                  <div className="skeleton skeleton-image" />
                  <div className="skeleton skeleton-title" />
                  <div className="skeleton skeleton-text" />
                  <div className="skeleton skeleton-text short" />
                </div>
              ) : (
                <>
                  <div className="d-flex align-items-center mb-3 text-muted small">
                    <i className="far fa-calendar-alt me-2"></i>
                    <span className="me-3">
                      {blog?.createdAt &&
                        new Date(blog.createdAt).toLocaleString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit',
                          hour12: true,
                        })}
                    </span>

                    <i className="fas fa-tag me-2"></i>
                    <span className="me-3">{blog?.category?.name}</span>
                  </div>

                  <div className="mb-4">
                    <img
                      src={blog?.image}
                      alt={blog?.title}
                      className="img-fluid rounded"
                      style={{ maxHeight: '400px', objectFit: 'cover' }}
                    />
                  </div>

                  <h1 className="h2 fw-600 mb-3">{blog?.title}</h1>
                  <div dangerouslySetInnerHTML={{ __html: blog?.description }} />
                </>
              )}
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
