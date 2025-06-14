"use client";

import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { getGallery } from "../../../services/service.js";
import Image from 'next/image';

export default function PortfolioPage() {
  // State for managing modal - track which project is selected
  const [showModal, setShowModal] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [modalFullScreen, setModalFullScreen] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [projectGalleries, setProjectGalleries] = useState([]);

  const openLightbox = (projectId, imageIndex = 0) => {
    setSelectedProjectId(projectId);
    setCurrentImageIndex(imageIndex);
    setShowLightbox(true);
    document.body.style.overflow = 'hidden'; // Prevent body scroll
  };

  const closeLightbox = () => {
    setShowLightbox(false);
    setSelectedProjectId(null);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'auto'; // Restore body scroll
  };

  const nextImage = () => {
    if (selectedProjectId && projectGalleries[selectedProjectId]) {
      setCurrentImageIndex(prevIndex => 
        (prevIndex + 1) % projectGalleries[selectedProjectId].length
      );
    }
  };

  const previousImage = () => {
    if (selectedProjectId && projectGalleries[selectedProjectId]) {
      setCurrentImageIndex(prevIndex => 
        (prevIndex - 1 + projectGalleries[selectedProjectId].length) % 
        projectGalleries[selectedProjectId].length
      );
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await getGallery();
      setProjectGalleries(res.data);
      console.log(res.data);
    } catch (error) {
      console.error('Error fetching gallery:', error);
    }
  };

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (showLightbox) {
        if (e.key === 'Escape') {
          closeLightbox();
        } else if (e.key === 'ArrowRight') {
          nextImage();
        } else if (e.key === 'ArrowLeft') {
          previousImage();
        }
      }
    };

      document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [showLightbox, selectedProjectId, currentImageIndex, projectGalleries]);

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <>
      <section className="light_grey_bg" id="middlecontent">
        <div className="container">
          <div className="row">
            {projectGalleries.map((project, index) => (
              <div key={index} className="col-lg-4 col-md-6 mb-4">
                <div className="portfolio_box position-relative">
                  <div
                    className="portfolio_img_box"
                    data-aos="fade-up"
                    data-aos-delay="200"
                    onClick={() => openLightbox(index, 0)}
                    style={{ cursor: 'pointer' }}
                  >
                    <Image
                      className='img-fluid'
                      src={project?.image || ''}
                      width={600}
                      height={600}
                      alt={project.title || ''}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {showLightbox && selectedProjectId !== null && projectGalleries[selectedProjectId] && (
        <div className="lightbox-overlay">
          <div className="lightbox-container">
            <button className="lightbox-close" onClick={closeLightbox}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Current Image */}
            <div className="lightbox-image-container">
              <Image
                src={projectGalleries[selectedProjectId].image}
                alt={`Gallery image ${currentImageIndex + 1}`}
                width={800}
                height={600}
                className="lightbox-image"
              />
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .lightbox-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          animation: fadeIn 0.3s ease-in-out;
        }
        
        .lightbox-container {
          position: relative;
          max-width: 90vw;
          max-height: 90vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .lightbox-image-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .lightbox-image {
          max-width: 100%;
          max-height: 90vh;
          object-fit: contain;
          border-radius: 8px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
        }
        
        .lightbox-close {
          position: absolute;
          top: -50px;
          right: -10px;
          background: none;
          border: none;
          color: white;
          font-size: 24px;
          cursor: pointer;
          padding: 10px;
          border-radius: 50%;
          transition: background-color 0.3s ease;
          z-index: 10001;
        }
        
        .lightbox-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.5);
          border: none;
          color: white;
          font-size: 32px;
          cursor: pointer;
          padding: 15px;
          border-radius: 50%;
          transition: background-color 0.3s ease;
          z-index: 10001;
          width: 55px;
          height: 55px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .lightbox-nav:hover {
          background-color: rgba(0, 0, 0, 0.8);
        }
        
        .lightbox-prev {
          left: -60px;
        }
        
        .lightbox-next {
          right: -60px;
        }
        
        .lightbox-counter {
          position: absolute;
          bottom: -50px;
          left: 50%;
          transform: translateX(-50%);
          color: white;
          font-size: 16px;
          background: rgba(0, 0, 0, 0.7);
          padding: 8px 16px;
          border-radius: 20px;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @media (max-width: 768px) {
          .lightbox-nav {
            padding: 10px;
            font-size: 15px;
            width: 40px;
            height: 40px;
          }
          img.lightbox-image {
            object-fit: cover;
            height: auto;
            width: 378px;
          }
          .lightbox-prev {
            left: -40px;
          }
          
          .lightbox-next {
            right: -40px;
          }
          
          .lightbox-close {
            top: -49px;
            right: -29px;
          }
          
          .lightbox-counter {
            bottom: -40px;
            font-size: 14px;
          }
          .lightbox-container {
            width: 77vw;
          }
        }
      `}</style>
    </>
  );
}