  "use client";
  import { useState, useEffect, useRef, useCallback } from 'react';
  import dynamic from 'next/dynamic';
  import { Suspense } from 'react';

  // Optimized SVG Loader Component
  const SvgLoader = ({ progress = 0 }) => {
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
            min-height: 400px;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            border-radius: 8px;
            padding: 2rem;
            transform: translateZ(0);
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
            background: linear-gradient(90deg, #ed3237, #ff6b6b);
            border-radius: 4px;
            transition: width 0.5s ease-out;
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

  // Low-res placeholder image
  const PlaceholderSvg = () => (
    <img
      src="/assets/placeholder-lrge.svg"
      alt="Banner placeholder"
      className="img-fluid"
      width="100%"
      height="auto"
      style={{ filter: 'blur(4px)', opacity: 0.5, transform: 'translateZ(0)' }}
    />
  );

  // Optimized Dynamic SVG Import with lazy loading
  const LargeSvg = dynamic(() => import('./lrge.svg'), {
    ssr: false,
    loading: () => <PlaceholderSvg />
  });

  export default function AboutBanner() {
    const svgRef = useRef(null);
    const containerRef = useRef(null);
    const [isSvgLoaded, setIsSvgLoaded] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const progressTimerRef = useRef(null);

    // Debounced Intersection Observer for lazy loading
    useEffect(() => {
      let timeout;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            timeout = setTimeout(() => {
              setIsVisible(true);
              observer.disconnect();
            }, 100); // Debounce visibility change
          }
        },
        { threshold: 0.1 }
      );

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }

      return () => {
        observer.disconnect();
        if (timeout) clearTimeout(timeout);
      };
    }, []);

    // Throttled progress simulation
    useEffect(() => {
      if (isVisible && !isSvgLoaded) {
        progressTimerRef.current = setInterval(() => {
          setLoadingProgress((prev) => {
            if (prev >= 95) {
              clearInterval(progressTimerRef.current);
              return prev;
            }
            return prev + 2; // Slower increments for less frequent updates
          });
        }, 200); // Throttled to 200ms
      }

      return () => {
        if (progressTimerRef.current) {
          clearInterval(progressTimerRef.current);
        }
      };
    }, [isVisible, isSvgLoaded]);

    // Handle SVG load completion
    const handleSvgLoad = useCallback(() => {
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
      }
      setLoadingProgress(100);
      setTimeout(() => {
        setIsSvgLoaded(true);
      }, 200);
    }, []);

    // Fallback for SVG load detection
    useEffect(() => {
      if (isVisible && !isSvgLoaded) {
        const timeout = setTimeout(() => {
          if (!isSvgLoaded) {
            console.warn('SVG load timeout, forcing completion');
            handleSvgLoad();
          }
        }, 5000);
        return () => clearTimeout(timeout);
      }
    }, [isVisible, isSvgLoaded, handleSvgLoad]);

    // Setup interactive elements after SVG loads
    useEffect(() => {
      if (isSvgLoaded && svgRef.current) {
        requestAnimationFrame(() => {
          const clickableElement = svgRef.current.querySelector("#office_building");
          if (clickableElement) {
            clickableElement.style.cursor = "pointer";
            clickableElement.style.transition = "opacity 0.2s ease";
            
            const handleClick = () => setIsModalOpen(true);
            const handleHover = () => clickableElement.style.opacity = "0.8";
            const handleHoverOut = () => clickableElement.style.opacity = "1";

            clickableElement.addEventListener("click", handleClick);
            clickableElement.addEventListener("mouseenter", handleHover);
            clickableElement.addEventListener("mouseleave", handleHoverOut);

            return () => {
              clickableElement.removeEventListener("click", handleClick);
              clickableElement.removeEventListener("mouseenter", handleHover);
              clickableElement.removeEventListener("mouseleave", handleHoverOut);
            };
          }
        });
      }
    }, [isSvgLoaded]);

    const closeModal = useCallback(() => {
      setIsModalOpen(false);
    }, []);

    // Handle escape key for modal
    useEffect(() => {
      const handleEscape = (event) => {
        if (event.key === 'Escape' && isModalOpen) {
          closeModal();
        }
      };

      if (isModalOpen) {
        document.addEventListener('keydown', handleEscape);
        document.body.style.overflow = 'hidden';
      }

      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = 'unset';
      };
    }, [isModalOpen, closeModal]);

    return (
      <div className="banner_svg_vector" ref={containerRef}>
        {!isSvgLoaded && isVisible && <SvgLoader progress={loadingProgress} />}
        
        <div 
          className={`svg-container ${isSvgLoaded ? 'loaded' : 'loading'}`}
          style={{ 
            opacity: isSvgLoaded ? 1 : 0,
            transform: isSvgLoaded ? 'translateY(0)' : 'translateY(20px)',
            willChange: 'opacity',
            transform: 'translateZ(0)',
          }}
        >
          {isVisible && (
            <Suspense fallback={<PlaceholderSvg />}>
              <LargeSvg 
                ref={svgRef}
                className="img-fluid"
                width="100%"
                height="auto"
                preserveAspectRatio="xMidYMid meet"
                onLoad={handleSvgLoad}
                onError={() => {
                  console.error('SVG failed to load');
                  handleSvgLoad();
                }}
                style={{
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden'
                }}
              />
            </Suspense>
          )}
        </div>

        {isModalOpen && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-button" onClick={closeModal} aria-label="Close modal">
                ×
              </button>
              <video 
                width="100%" 
                height="100%" 
                controls 
                autoPlay 
                muted 
                playsInline
                preload="metadata"
              >
                <source src="/assets/video/office_building_1.mp4" type="video/mp4" />
                <source src="/assets/video/office_building_1.webm" type="video/webm" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        )}
        
        <style jsx>{`
          .banner_svg_vector {
            position: relative;
            width: 100%;
            min-height: 400px;
            transform: translateZ(0);
          }

          .svg-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            transition: opacity 0.5s ease-out;
            transform: translateZ(0);
          }

          .svg-container.loaded {
            position: relative;
          }

          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            transform: translateZ(0);
          }

          .modal-content {
            background-color: #000;
            border-radius: 12px;
            width: 90vw;
            height: 80vh;
            max-width: 1200px;
            position: relative;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
          }

          .modal-content video {
            width: 100%;
            height: 100%;
            object-fit: contain;
            border-radius: 12px;
          }

          .close-button {
            position: absolute;
            top: 15px;
            right: 20px;
            background: rgba(255, 255, 255, 0.9);
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #333;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1001;
            transition: background 0.2s ease, color 0.2s ease;
          }

          .close-button:hover {
            background: rgba(237, 50, 55, 0.9);
            color: white;
          }

          @media (max-width: 768px) {
            .modal-content {
              width: 95vw;
              height: 85vh;
            }
            
            .close-button {
              top: 10px;
              right: 15px;
              width: 35px;
              height: 35px;
              font-size: 20px;
            }
          }
        `}</style>
      </div>
    );
  }