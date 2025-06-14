"use client";

import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import portfolioimg1 from "/public/assets/images/portfolio_img1.jpg";
import portfolioimg2 from "/public/assets/images/portfolio_img2.jpg";
import portfolioimg3 from "/public/assets/images/portfolio_img3.jpg";
import portfolioimg4 from "/public/assets/images/portfolio_img4.jpg";
import portfolioimg5 from "/public/assets/images/portfolio_img5.jpg";
import portfolioimg6 from "/public/assets/images/portfolio_img6.jpg";
import portfolioimg7 from "/public/assets/images/portfolio_img7.jpg";
import portfolioimg8 from "/public/assets/images/portfolio_img8.jpg";
import portfolioimg9 from "/public/assets/images/portfolio_img9.jpg";
import portfolioimg10 from "/public/assets/images/portfolio_img10.png";

import portfoliogalleryimg1 from "/public/assets/images/portfolio_gallery_img1.jpg";
import portfoliogalleryimg2 from "/public/assets/images/portfolio_gallery_img2.jpg";
import portfoliogalleryimg3 from "/public/assets/images/portfolio_gallery_img3.jpg";
import portfoliogalleryimg4 from "/public/assets/images/portfolio_gallery_img4.jpg";
import portfoliogalleryimg5 from "/public/assets/images/portfolio_gallery_img5.jpg";
import portfoliogalleryimg6 from "/public/assets/images/portfolio_gallery_img6.jpg";
import portfoliogalleryimg7 from "/public/assets/images/portfolio_gallery_img7.jpg";
import portfoliogalleryimg8 from "/public/assets/images/portfolio_gallery_img8.jpg";
import portfoliogalleryimg9 from "/public/assets/images/portfolio_gallery_img9.jpg";
import portfoliogalleryimg10 from "/public/assets/images/portfolio_gallery_img10.jpg";
import portfoliogalleryimg11 from "/public/assets/images/portfolio_gallery_img11.jpg";
import portfoliogalleryimg12 from "/public/assets/images/portfolio_gallery_img12.jpg";
import portfoliogalleryimg13 from "/public/assets/images/portfolio_img6.jpg";
import portfoliogalleryimg14 from "/public/assets/images/portfolio_gallery_img14.jpg";
import portfoliogalleryimg15 from "/public/assets/images/portfolio_gallery_img15.jpg";
import portfoliogalleryimg16 from "/public/assets/images/portfolio_gallery_img16.jpg";
import portfoliogalleryimg17 from "/public/assets/images/portfolio_gallery_img17.jpg";
import portfoliogalleryimg18 from "/public/assets/images/portfolio_gallery_img18.jpg";
import portfoliogalleryimg19 from "/public/assets/images/portfolio_gallery_img19.jpg";
import portfoliogalleryimg20 from "/public/assets/images/portfolio_gallery_img20.jpeg";
import portfoliogalleryimg21 from "/public/assets/images/portfolio_gallery_img21.jpg";
import portfoliogalleryimg22 from "/public/assets/images/portfolio_gallery_img22.jpg";
import portfoliogalleryimg23 from "/public/assets/images/portfolio_gallery_img23.jpg";
import portfoliogalleryimg24 from "/public/assets/images/portfolio_gallery_img24.jpg";
import portfoliogalleryimg25 from "/public/assets/images/portfolio_img10.png";


export default function portfolioPage() {
  
  // State for managing modal - track which project is selected
  const [showModal, setShowModal] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [modalFullScreen, setModalFullScreen] = useState(false);
const [showLightbox, setShowLightbox] = useState(false);
const [currentImageIndex, setCurrentImageIndex] = useState(0);


const openLightbox = (imageIndex) => {
  setCurrentImageIndex(imageIndex);
  setShowLightbox(true);
  document.body.style.overflow = 'hidden'; // Prevent body scroll
};

const closeLightbox = () => {
  setShowLightbox(false);
  setCurrentImageIndex(0);
  document.body.style.overflow = 'auto'; // Restore body scroll
};

const nextImage = () => {
  if (projectGalleries[selectedProjectId]) {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === projectGalleries[selectedProjectId].length - 1 ? 0 : prevIndex + 1
    );
  }
};

const previousImage = () => {
  if (projectGalleries[selectedProjectId]) {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? projectGalleries[selectedProjectId].length - 1 : prevIndex - 1
    );
  }
};

// Add keyboard navigation (optional)
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
}, [showLightbox, selectedProjectId]);

// Clean up on component unmount
useEffect(() => {
  return () => {
    document.body.style.overflow = 'auto';
  };
}, []);

  // Image mapping object to easily reference images by name
  const images = {
    portfolioimg1,
    portfolioimg2,
    portfolioimg3,
    portfolioimg4,
    portfolioimg5,
    portfolioimg6,
    portfolioimg7,
    portfolioimg8,
    portfolioimg9,
    portfolioimg10
  };

  // Sample project data with dynamic image properties and descriptions
  const socialMediaProjects = [
    { 
      id: 1, 
      title: "Store Design", 
      image: "portfolioimg1",
    },
    { 
      id: 2, 
      title: "Retail Branding", 
      image: "portfolioimg2",
    },
    { 
      id: 3, 
      title: "Activations", 
      image: "portfolioimg3",
    }
  ];

  const brandingProjects = [
    { 
      id: 4, 
      title: "DIGITAL MARKETING", 
      image: "portfolioimg4",
    },
    { 
      id: 5, 
      title: "CAMPAIGNS POST DESIGN", 
      image: "portfolioimg5",
    },
    { 
      id: 6, 
      title: "META ADS", 
      image: "portfolioimg6",
    }
  ];

  const eventsProjects = [
    { 
      id: 7, 
      title: "EVENTS", 
      image: "portfolioimg7",
    },
    { 
      id: 8, 
      title: "Product Launch", 
      image: "portfolioimg8",
    },
    { 
      id: 9, 
      title: "Festive Events", 
      image: "portfolioimg9",
    }
  ];

  const experentialProjects = [
    { 
      id: 10, 
      title: "In/Out Shop Activation", 
      image: "portfolioimg10",
    },
  ];

  // Define gallery images for each project
  const projectGalleries = {
    1: [portfoliogalleryimg1, portfoliogalleryimg2, portfoliogalleryimg3, portfoliogalleryimg4, portfoliogalleryimg5, portfoliogalleryimg6],
    2: [portfoliogalleryimg7, portfoliogalleryimg8, portfoliogalleryimg9],
    3: [portfoliogalleryimg10],
    4: [portfoliogalleryimg11],
    5: [portfoliogalleryimg12],
    6: [portfoliogalleryimg13],
    7: [portfoliogalleryimg14, portfoliogalleryimg15, portfoliogalleryimg16, portfoliogalleryimg17, portfoliogalleryimg18],
    8: [portfoliogalleryimg19, portfoliogalleryimg20],
    9: [portfoliogalleryimg20, portfoliogalleryimg21, portfoliogalleryimg22, portfoliogalleryimg23, portfoliogalleryimg24],
    10: [portfoliogalleryimg25]
  };
  
  // Define content for each project
  const projectContent = {
    1: {
      title: "STORE DESIGN",
      subtitle: "Creating Impactful Retail Experience",
      description: "A branch of marketing, retail store design, is considered part of the overall brand of the store. Aspects like strategic interior and exterior themes, graphics and signages, and stall designing help promote the retail spaces. Let us look into the aspects governing store design."
    },
    2: {
      title: "RETAIL BRANDING",
      subtitle: "Amplifying Your Presence",
    },
    3: {
      title: "Activations",
      subtitle: "Engaging Your Audience Beyond the Store",
    },
    4: {
      title: "CAMPAIGNS POST DESIGN",
      subtitle: "Happeningads builds brand awareness through campaigns",
    },
    5: {
      title: "DIGITAL MARKETING",
      subtitle: "Happeningads uses online advertising to increase sales through promotional marketin",
      boldtitle: "GOOGLE ADS / SEO"
    },
    6: {
      title: "META ADS",
      subtitle: "Happeningads builds brand awareness through campaignWe uses advertising on Meta to Increase Brand Awareness",
    },
    7: {
      title: "EVENTS",
      subtitle: "Where Innovation Meets Collaboration for Unmatched Business Growth",
      boldtitle: "Uniting Excellence"
    },
    8: {
      title: "PRODUCT LAUNCH",
      subtitle: "Elevate Your Product Launch with Happening Ads",
    },
    9: {
      title: "FESTIVE EVENTS",
      subtitle: "Transform Your Festival Events into Spectacular Experiences",
    },
    10: {
      title: "In/Out Shop Activation",
    },
  };

  // Function to handle scrolling in modal
  useEffect(() => {
    if (showModal) {
      // Prevent body scrolling when modal is open
      document.body.style.overflow = 'hidden';
      
      // Add event listener for modal scrolling
      const handleScroll = () => {
        const modalElement = document.querySelector('.modal-container');
        if (modalElement) {
          const scrollPosition = modalElement.scrollTop;
          const modalHeight = modalElement.scrollHeight - modalElement.clientHeight;
          
          // If scrolled more than 70% up, expand to full screen
          if (scrollPosition > modalHeight * 0.3) {
            setModalFullScreen(true);
          } else {
            setModalFullScreen(false);
          }
        }
      };

      const modalElement = document.querySelector('.modal-container');
      if (modalElement) {
        modalElement.addEventListener('scroll', handleScroll);
      }

      return () => {
        document.body.style.overflow = 'auto';
        if (modalElement) {
          modalElement.removeEventListener('scroll', handleScroll);
        }
      };
    }
  }, [showModal]);

  // Function to open modal
  const openModal = (projectId) => {
    setSelectedProjectId(projectId);
    setShowModal(true);
    setModalFullScreen(false); // Reset full screen state when opening
  };

  // Function to close modal
  const closeModal = () => {
    setShowModal(false);
    setModalFullScreen(false);
  };

  return (
    <>
      {/* Social Media Campaign Section */}
      <section className="light_grey_bg" id="middlecontent">
        <div className="container">
          <div className="heading_box text-center mb-5">
            <h2 className="page_heading text-uppercase" data-aos="fade-up" data-aos-delay="200">Branding Works</h2>
          </div>
          <div className="row">
            {socialMediaProjects.map(project => (
              <div key={project.id} className="col-lg-4 col-md-6 mb-4">
                <div className="portfolio_box position-relative">
                  <div 
                    className="portfolio_img_box" 
                    data-aos="fade-up" 
                    data-aos-delay="200"
                    onClick={() => openModal(project.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <Image 
                      className='img-fluid' 
                      src={images[project.image]} 
                      width={600} 
                      height={600}
                      alt={project.title}
                    />
                  </div>
                  <div className="portfolio_details_box">
                    <h5 data-aos="fade-up" data-aos-delay="400">{project.title}</h5>
                    <button 
                      className="global_btn" 
                      data-aos="fade-up" 
                      data-aos-delay="600"
                      onClick={() => openModal(project.id)}
                    >
                      View Work
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Branding Works Section */}
      <section className="py-5">
        <div className="container">
          <div className="heading_box text-center mb-5">
            <h2 className="page_heading text-uppercase">Digital Marketing</h2>
          </div>
          <div className="row">
            {brandingProjects.map(project => (
              <div key={project.id} className="col-lg-4 col-md-6 mb-4">
                <div className="portfolio_box position-relative">
                  <div 
                    className="portfolio_img_box" 
                    data-aos="fade-up" 
                    data-aos-delay="200"
                    onClick={() => openModal(project.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <Image 
                      className='img-fluid' 
                      src={images[project.image] || portfolioimg1} 
                      width={600} 
                      height={600}
                      alt={project.title}
                    />
                  </div>
                  <div className="portfolio_details_box">
                    <h5 data-aos="fade-up" data-aos-delay="400">{project.title}</h5>
                    <button 
                      className="global_btn" 
                      data-aos="fade-up" 
                      data-aos-delay="600"
                      onClick={() => openModal(project.id)}
                    >
                      View Work
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="light_grey_bg" id="middlecontent">
        <div className="container">
          <div className="heading_box text-center mb-5">
            <h2 className="page_heading text-uppercase" data-aos="fade-up" data-aos-delay="200">Event</h2>
          </div>
          <div className="row">
            {eventsProjects.map(project => (
              <div key={project.id} className="col-lg-4 col-md-6 mb-4">
                <div className="portfolio_box position-relative">
                  <div 
                    className="portfolio_img_box" 
                    data-aos="fade-up" 
                    data-aos-delay="200"
                    onClick={() => openModal(project.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <Image 
                      className='img-fluid' 
                      src={images[project.image]} 
                      width={600} 
                      height={600}
                      alt={project.title}
                    />
                  </div>
                  <div className="portfolio_details_box">
                    <h5 data-aos="fade-up" data-aos-delay="400">{project.title}</h5>
                    <button 
                      className="global_btn" 
                      data-aos="fade-up" 
                      data-aos-delay="600"
                      onClick={() => openModal(project.id)}
                    >
                      View Work
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="heading_box text-center mb-5">
            <h2 className="page_heading text-uppercase">Experential Marketing</h2>
          </div>
          <div className="row">
            {experentialProjects.map(project => (
              <div key={project.id} className="col-lg-4 col-md-6 mb-4">
                <div className="portfolio_box position-relative">
                  <div 
                    className="portfolio_img_box" 
                    data-aos="fade-up" 
                    data-aos-delay="200"
                    onClick={() => openModal(project.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <Image 
                      className='img-fluid' 
                      src={images[project.image] || portfolioimg1} 
                      width={600} 
                      height={600}
                      alt={project.title}
                    />
                  </div>
                  <div className="portfolio_details_box">
                    <h5 data-aos="fade-up" data-aos-delay="400">{project.title}</h5>
                    <button 
                      className="global_btn" 
                      data-aos="fade-up" 
                      data-aos-delay="600"
                      onClick={() => openModal(project.id)}
                    >
                      View Work
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    {/* Modal with fullscreen transition */}
{showModal && selectedProjectId && (
  <div className={`portfolio-modal ${modalFullScreen ? 'fullscreen' : 'bottom'}`}>
    <div className="modal-backdrop" onClick={closeModal}></div>
    <div className="modal-container">
      <div className="modal-header text-center">
        <h3 className="text-center w-100">{projectContent[selectedProjectId].title}</h3>
        <button type="button" className="close-btn" onClick={closeModal}>
          <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1.63599L13.7279 14.3639" stroke="#333333" strokeWidth="2" strokeLinecap="round"></path>
            <path d="M13.7285 1.63599L1.00059 14.3639" stroke="#333333" strokeWidth="2" strokeLinecap="round"></path>
          </svg>
        </button>
      </div>
      <div className="modal-body text-center">
        <h5>{projectContent[selectedProjectId].subtitle}</h5>
        <p className='text-center'>{projectContent[selectedProjectId].description}</p>
        <div className="row portfolio_container">
          {projectGalleries[selectedProjectId] && projectGalleries[selectedProjectId].map((image, index) => (
            <div className="col-lg-4 mb-4" key={index}>
              <div className="portfolio_popup_img" onClick={() => openLightbox(index)}>
                <Image
                  src={image}
                  alt={`portfolio-image-${index}`}
                  width={239}
                  height={425}
                  className="img-fluid w-100"
                  style={{ cursor: 'pointer' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)}

{/* Lightbox Modal */}
{showLightbox && (
  <div className="lightbox-overlay">
    <div className="lightbox-container">
      <button className="lightbox-close" onClick={closeLightbox}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      
      {/* Previous Button */}
      {projectGalleries[selectedProjectId] && projectGalleries[selectedProjectId].length > 1 && (
        <button className="lightbox-nav lightbox-prev" onClick={previousImage}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
      
      {/* Current Image */}
      <div className="lightbox-image-container">
        <Image
          src={projectGalleries[selectedProjectId][currentImageIndex]}
          alt={`lightbox-image-${currentImageIndex}`}
          width={800}
          height={600}
          className="lightbox-image"
        />
      </div>
      
      {/* Next Button */}
      {projectGalleries[selectedProjectId] && projectGalleries[selectedProjectId].length > 1 && (
        <button className="lightbox-nav lightbox-next" onClick={nextImage}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
      
      {/* Image Counter */}
      {projectGalleries[selectedProjectId] && projectGalleries[selectedProjectId].length > 1 && (
        <div className="lightbox-counter">
          {currentImageIndex + 1} / {projectGalleries[selectedProjectId].length}
        </div>
      )}
    </div>
  </div>
)}



      {/* CSS for modal with fullscreen capabilities */}
      <style jsx>{`
        .portfolio-modal {
          position: sticky;
          left: 0;
          width: 100%;
          z-index: 1050;
          transition: all 0.3s ease-out;
          overflow-y:auto;
        }
        .portfolio-modal {
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;  /* Firefox */
}
.portfolio-modal::-webkit-scrollbar { 
    display: none;  /* Safari and Chrome */
}
        .portfolio-modal.bottom {
          bottom: 0px;
          height:100vh;
        }
        
        .portfolio-modal.fullscreen {
          bottom: 0;
          height: 100vh;
        }
        
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 1049;
        }
        
        .modal-container {
          position: relative;
          background-color: #fff;
          border-radius: 45px 45px 0 0;
          box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.1);
          padding: 30px 0 0;
          z-index: 1051;
          height: 100%;
          max-width: 1320px;
          margin: auto;
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        
        .modal-container::-webkit-scrollbar {
          display: none;  /* Chrome, Safari, Opera */
        }
        
        .portfolio-modal.bottom .modal-container {
          animation: slideUp 0.3s ease-out;
          border-radius: 45px 45px 0 0;
        }
        
        .portfolio-modal.fullscreen .modal-container {
          animation: expandFull 0.3s ease-out;
          border-radius: 0;
          height: 100vh;
        }
        
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        
        @keyframes expandFull {
          from { border-radius: 45px 45px 0 0; }
          to { border-radius: 0; }
        }
        
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 1px solid #eee;
          z-index: 2;
        }
        
        .modal-header h3 {
          margin: 0 0 10px;
          font-size: 32px;
          font-weight: 500;
        }
        
        .close-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 5px;
          position: absolute;
          right: 20px;
          top: 20px;
        }
        
        .close-btn:hover svg path {
          stroke: #0056b3;
        }
        
        .modal-body {
          padding: 0 12px;
        }
        
        @media (max-width: 991px) {
          .modal-container {
            padding: 20px;
          }
        }
      `}</style>

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
  
  .lightbox-close:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  .lightbox-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.5);
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
    padding: 15px;
    border-radius: 50%;
    transition: background-color 0.3s ease;
    z-index: 10001;
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
      font-size:15px;
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
      .lightbox-container{width:77vw;}

  }
`}</style>
    </>
  );
}