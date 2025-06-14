"use client";

import React, { useState, useEffect } from 'react';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import logo from '/public/assets/images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBehance,
  faFacebook,
  faInstagram,
  faLinkedin,
  faXTwitter,
  faYoutube
} from '@fortawesome/free-brands-svg-icons';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { getSettings } from "../../../services/service.js";

const Footer = () => {
    const pathname = usePathname();
  if (pathname === '/') {
    return null;
  }
  

  const [showScrollTop, setShowScrollTop] = useState(false);
  const [settings, setSettings] = useState('');

  // Check scroll position to show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    getSettings()
      .then((data) => {
        console.log('Fetched About us:', data);
        setSettings(data);
      })
      .catch(console.error);
  }, []);

  // Function to scroll to top with smooth animation
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer>
      <div className="container">
        {/* Links Section */}
        <div className="row">
          <div className="col-lg-4 col-md-4 col-12 mb-4 mb-md-0">
            <div className="footer_logo">
              <Image src={settings?.footerLogo || logo} alt="Logo" width={180} height={32} />
              <p className="text-start mt-4">{settings?.about}</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-5 mb-4 mb-md-0 pd_left">
            <h5 className="footer_headinmg mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link href="/about" className="text-decoration-none">About</Link></li>
              <li className="mb-2"><Link href="/services" className="text-decoration-none">Services</Link></li>
              <li className="mb-2"><Link href="/portfolio-ads" className="text-decoration-none">Portfolio</Link></li>
              <li className="mb-2"><Link href="/career" className="text-decoration-none">Career</Link></li>
              <li className="mb-2"><Link href="/blogs" className="text-decoration-none">Blog</Link></li>
              <li className="mb-2"><Link href="/contactus" className="text-decoration-none">Contact</Link></li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-3 col-7">
            <h5 className="footer_headinmg mb-3">Get in Touch</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><a href={`tel:${settings?.phone}`} className="text-decoration-none">+91 {settings?.phone}</a></li>
              <li className="mb-2"><a href={`mailto:${settings?.email}`} className="text-decoration-none">{settings?.email}</a></li>
              <li className="mb-2"><a href="#" className="text-decoration-none">{settings?.address1}</a></li>
              <li className="mb-2"><a href="#" className="text-decoration-none">{settings?.address2}</a></li>
            </ul>
          </div>
          <div className="col-lg-2 col-md-12 col-6">
            <div className="social_box">
              <h5 className="footer_headinmg mb-3">Follow us on</h5>
              <div className="d-flex social_icon gap-3 mt-2">
                <a href={settings?.instagram} target="_blank" className="me-3"><FontAwesomeIcon icon={faInstagram} /></a>
                <a href={settings?.linkedIn} target="_blank" className="me-3"><FontAwesomeIcon icon={faLinkedin} /></a>
                <a href={settings?.facebook} target="_blank" className="me-3"><FontAwesomeIcon icon={faFacebook} /></a>
                <a href={settings?.twitter} target="_blank" className="me-3"><FontAwesomeIcon icon={faXTwitter} /></a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <div
        className={`scroll-to-top ${showScrollTop ? 'show' : ''}`}
        onClick={scrollToTop}
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </div>

      {/* CSS for scroll-to-top button */}
      <style jsx>{`
        .scroll-to-top {
          position: fixed;
          bottom: 20px;
          right: 15px;
          width: 40px;
          height: 40px;
          background-color: #333;
          color: white;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          z-index: 999;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }

        .scroll-to-top.show {
          opacity: 1;
          visibility: visible;
        }

        .scroll-to-top:hover {
          background-color: #555;
          transform: translateY(-3px);
        }
      `}</style>
    </footer>
  );
};

export default Footer;