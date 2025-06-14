// components/Loader.js
"use client";

import { useState, useEffect } from 'react';

const Loader = ({ loadingText = "Loading..." }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95; 
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loader-container">
      <div className="loader-content">
        <div className="spinner"></div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="loading-text">{loadingText} {Math.round(progress)}%</p>
      </div>
      
      <style jsx>{`
        .loader-container {
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
          transition: width 0.3s ease;
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

export default Loader;