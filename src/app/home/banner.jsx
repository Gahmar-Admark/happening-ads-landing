"use client";
import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

const SvgLoader = ({ onSvgLoaded }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + Math.min(Math.random() * 10 + 5, 95 - prev);
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Update progress to 100% when SVG is loaded
  useEffect(() => {
    if (onSvgLoaded) {
      setProgress(100);
    }
  }, [onSvgLoaded]);

  return (
    <div className="svg-loader-container">
      <div className="loader-content">
        <div className="spinner"></div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="loading-text">Loading banner... {Math.round(progress)}%</p>
      </div>
      
      <style jsx>{`
        .svg-loader-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          border-radius: 8px;
          padding: 2rem;
        }
        
        .loader-content {
          text-align: center;
          max-width: 300px;
          width: 100%;
        }
        
        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #e3e3e3;
          border-top: 4px solid #ed3237;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 1rem;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .progress-bar {
          width: 100%;
          height: 8px;
          background-color: #e0e0e0;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 1rem;
        }
        
        .progress-fill {
          height: 100%;
          background: #ed3237;
          border-radius: 4px;
          transition: width 0.2s ease;
        }
        
        .loading-text {
          margin: 0;
          color: #666;
          font-size: 14px;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};

const LargeSvg = dynamic(() => import('./lrge.svg'), {
  ssr: false,
  loading: () => <SvgLoader />
});

export default function AboutBanner() {
  const svgRef = useRef(null);
  const [isSvgLoaded, setIsSvgLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isSvgLoaded && svgRef.current) {
      const clickableElement = svgRef.current.querySelector("#office_building");
      if (clickableElement) {
        clickableElement.style.cursor = "pointer";
        const handleClick = () => {
          setIsModalOpen(true);
          console.log("office_building clicked");
        };
        clickableElement.addEventListener("click", handleClick);

        return () => {
          clickableElement.removeEventListener("click", handleClick);
        };
      } else {
        console.warn("Element with ID 'office_building' not found in SVG");
      }
    }
  }, [isSvgLoaded]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="banner_svg_vector">
      <LargeSvg 
        className="img-fluid"
        width="100%"
        height="auto"
        ref={svgRef}
        preserveAspectRatio="xMidYMid meet"
        onLoad={() => {
          console.log("SVG loaded");
          setIsSvgLoaded(true);
        }}
      />
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={closeModal}>
              ×
            </button>
            <video width="320" height="240" controls autoplay muted playsinline>
              <source src="/assets/video/office_building_1.mp4" type="video/mp4" />
              <source src="/assets/video/office_building_1.mp4" type="video/ogg" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
      
      <style jsx>{`
        .banner_svg_vector {
          position: relative;
          width: 100%;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal-content {
          background-color: white;
          padding: 2rem;
          border-radius: 8px;
          width: calc(100vw - 64px);
          position: relative;
          height: calc(100vh - 64px);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .modal-content video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .close-button {
          position: absolute;
          top: 10px;
          right: 15px;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #666;
        }

        .close-button:hover {
          color: #ed3237;
        }
      `}</style>
    </div>
  );
}