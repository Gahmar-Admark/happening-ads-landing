// Modified Navbar.js component with captcha functionality

"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBehance, faFacebook, faInstagram, faLinkedin, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faClose, faLocationDot, faPhone, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { sendContactData, getSettings } from "../../../services/service";
import { toast } from 'react-toastify';

export default function Navbar() {
  const [settings, setSettings] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [contactFormOpen, setContactFormOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [captchaText, setCaptchaText] = useState('');
  const menuRef = useRef(null);
  const contactFormRef = useRef(null);
  const pathname = usePathname();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    email: '',
    number: '',
    company: '',
    lookingFor: '',
    message: '',
    captcha: ''
  });

  // Set mounted state after component mounts
  useEffect(() => {
    setIsMounted(true);
    // Generate initial captcha when component mounts
    generateCaptcha();
  }, []);

  useEffect(() => {
    getSettings()
      .then((data) => {
        console.log('Fetched About us:', data); // 👈 Check the actual structure
        setSettings(data);
      })
      .catch(console.error);
  }, []);

  // Function to generate random captcha
  const generateCaptcha = () => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(captcha);
  };

  // Refresh captcha
  const refreshCaptcha = () => {
    generateCaptcha();
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission with captcha validation
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate captcha
    if (formData.captcha !== captchaText) {
      toast.error('Captcha verification failed. Please try again.');
      refreshCaptcha();
      setFormData({
        ...formData,
        captcha: ''
      });
      return;
    }

    try {
      const { captcha, ...payloadWithoutCaptcha } = formData;
      const result = await sendContactData(payloadWithoutCaptcha);
      console.log(result, "result");
      toast.success('Form submitted successfully!');

      setFormData({
        name: '',
        designation: '',
        email: '',
        number: '',
        company: '',
        lookingFor: '',
        message: '',
        captcha: ''
      });
      setContactFormOpen(false);

    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to submit form. Please try again later.');
      console.error('Submit Error:', error);
    }
  };

  // Add scroll event listener to detect when header should become sticky
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Add click outside listener to close menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && menuOpen) {
        setMenuOpen(false);
      }
      if (contactFormRef.current && !contactFormRef.current.contains(event.target) && contactFormOpen) {
        setContactFormOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen, contactFormOpen]);

  // Function to close menu when a link is clicked
  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  // Function to check if current path matches the link
  const isActive = (path) => {
    return pathname === path;
  };

  // Add body class to prevent scrolling when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }

    // Cleanup function
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [menuOpen]);

  return (
    <>
      <header className={`${isSticky ? 'sticky-header' : ''}`}>
        <nav className={`navbar ${isSticky ? 'navbar-sticky' : ''}`}>
          <div className="container-fluid d-flex justify-content-between align-items-center">
            <Link href="/" className="navbar-brand fw-bold">
              <Image
                src={settings?.logo || "/assets/images/logo.png"}
                className="img-fluid"
                alt="Logo"
                width={220}
                height={50}
              />
            </Link>
            <button
              className="btn menu_icon border-0 p-0"
              onClick={() => setMenuOpen(true)}
              aria-label="Open Menu"
            >
              <span className="humburger">
                <span className="arrow-t"></span>
                <span className="arrow-m"></span>
                <span className="arrow-b"></span>
              </span>
            </button>
          </div>
        </nav>

        {/* Background Overlay - Added this div for menu background overlay */}
        <div className={`menu-background-overlay ${menuOpen ? 'active' : ''}`}></div>

        {/* Overlay Slide Menu */}
        <div className={`menu-overlay ${menuOpen ? 'show' : ''}`} ref={menuRef}>
          {/* Left Sidebar */}
          <div className="menu-sidebar">
            <ul className="list-unstyled">
              <li>
                <Link
                  href="/about"
                  className={isActive('/about') ? 'active' : ''}
                  onClick={handleLinkClick}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className={isActive('/services') ? 'active' : ''}
                  onClick={handleLinkClick}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio-ads"
                  className={isActive('/portfolio-ads') ? 'active' : ''}
                  onClick={handleLinkClick}
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="/career"
                  className={isActive('/career') ? 'active' : ''}
                  onClick={handleLinkClick}
                >
                  Career
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className={isActive('/blogs') ? 'active' : ''}
                  onClick={handleLinkClick}
                >
                  Blogs
                </Link>
              </li>
              <li>
                <Link
                  href="/contactus"
                  className={isActive('/contactus') ? 'active' : ''}
                  onClick={handleLinkClick}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Right Content */}
          <div className="menu-content position-relative">

            {/* Content Section */}
            <div className="right_menu_cntr">
              <div className="mb-3">
                <Image className="img-fluid"
                  src={settings?.logo || "/assets/images/logo.png"}
                  alt="Ahmar"
                  width={200}
                  height={45}
                />
              </div>

              <div className="d-flex flex-column align-items-start mb-2">
                <p className="mb-0">
                  <span className="contact_icon">
                    <FontAwesomeIcon icon={faLocationDot} />
                  </span> {settings?.address1 || ''} </p>
                <p className="mb-0">
                  <span className="contact_icon">
                    <FontAwesomeIcon icon={faLocationDot} />
                  </span> {settings?.address2 || ''} </p>
              </div>

              <div className="pt-4">
                <p className="text-warning fw-semibold my-3">We'd love to hear from you</p>

                <div className="d-flex align-items-center mb-2">
                  <p className="mb-0"><span className="contact_icon"><FontAwesomeIcon icon={faEnvelope} /></span> {settings?.email || ''}</p>
                </div>

                <div className="d-flex align-items-center mb-4">
                  <p className="mb-0"><span className="contact_icon"><FontAwesomeIcon icon={faPhone} /></span>+91 {settings?.phone || ''}</p>
                </div>
              </div>

              {/* Social Links */}
              <div className="menu-social d-flex mt-5">
                <a href={settings?.instagram} target="_blank" className="me-3"><FontAwesomeIcon icon={faInstagram} /></a>
                <a href={settings?.linkedIn} target="_blank" className="me-3"><FontAwesomeIcon icon={faLinkedin} /></a>
                <a href={settings?.facebook} target="_blank" className="me-3"><FontAwesomeIcon icon={faFacebook} /></a>
                <a href={settings?.twitter} target="_blank" className="me-3"><FontAwesomeIcon icon={faXTwitter} /></a>
              </div>
            </div>

            <span className="pattern_logo"> <Image className="img-fluid" src="/assets/images/pattern_logo.png" alt="Ahmar" width={200} height={45} /></span>
          </div>
          {/* Close button */}
          <div className="text-end">
            <button
              className="btn fs-2 nav_close_btn"
              onClick={() => setMenuOpen(false)}
              aria-label="Close Menu"
            >
              <FontAwesomeIcon icon={faClose} />
            </button>
          </div>

        </div>
      </header>

      {/* Contact Button */}
      <div className="getintouch_btn">
        <button className="d-flex align-items-center touch_btn" onClick={() => setContactFormOpen(true)}>
          Get In Touch
        </button>
      </div>

      {/* Contact Form Popup - Only render when component is mounted */}
      {isMounted && (
        <div className={`contact-form-overlay ${contactFormOpen ? 'show' : ''}`}>
          <div className="contact-form-container" ref={contactFormRef}>
            <div className="contact-form-header d-flex justify-content-between align-items-center mb-4">
              <h3 className="m-0">Get In Touch</h3>
              <button
                className="btn close-form-btn"
                onClick={() => setContactFormOpen(false)}
                aria-label="Close Form"
              >
                <FontAwesomeIcon icon={faClose} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="row contact_form_cntr g-3">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Designation"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <div className="input-group">
                    <div className="input-group-text">
                      <span className="flag-icon">
                        <Image
                          src="/assets/images/flag.png"
                          alt="india flag"
                          width={20}
                          height={20}
                        /></span> +91
                    </div>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Phone Number"
                      name="number"
                      value={formData.number}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <select
                    className="form-select"
                    name="lookingFor"
                    value={formData.lookingFor}
                    onChange={handleChange}
                  >
                    <option value="">Looking for</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile App Development">Mobile App Development</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Message/Comment"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="col-md-6">
                  <div className="captcha-container">
                    {/* Added Captcha Display with Refresh Button */}
                    <div className="captcha_cntr">
                      <div className="captcha-display d-flex justify-content-between align-items-center bg-light rounded">
                        <div className="captcha-text font-monospace letter-spacing-1">{captchaText}</div>
                        <button
                          type="button"
                          className="btn btn-sm"
                          onClick={refreshCaptcha}
                          aria-label="Refresh Captcha"
                        >
                          <FontAwesomeIcon icon={faRefresh} />
                        </button>
                      </div>
                      <div className="d-flex align-items-center">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter captcha code"
                          name="captcha"
                          value={formData.captcha}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-12 text-center mt-4">
                      <button type="submit" className="btn btn-warning px-4 py-2 rounded-pill">
                        Submit now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add CSS for sticky header and contact form popup */}
      <style jsx>{`
        .sticky-header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          background-color: white;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease-in-out;
          padding: 10px 30px;
        }
        
        .navbar-sticky {
          padding: 0;
        }
        
        /* Menu Background Overlay Styles */
        .menu-background-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.7);
          z-index: 999;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease, visibility 0.3s ease;
        }
        
        .menu-background-overlay.active {
          opacity: 1;
          visibility: visible;
        }
        
        /* Body style when menu is open */
        :global(body.menu-open) {
          overflow: hidden;
        }
        
        /* Contact Form Popup Styles */
        .getintouch_btn {
          position: fixed;
          right: -51px;
          top: 50%;
          transform: translateY(-50%) rotate(-90deg);
          z-index: 99;
        }
        
        .touch_btn {
          background-color: #FDB92E;
          color: #000;
          padding: 12px 24px;
          border-radius: 5px 5px 0 0;
          font-weight: 500;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .touch_btn:hover {
          background-color: #FDB92E;
        }
        
        .contact-form-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.7);
          z-index: 2000;
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }
        
        .contact-form-overlay.show {
          opacity: 1;
          visibility: visible;
        }
        
        .contact-form-container {
          background-color: white;
          border-radius: 10px;
          width: 90%;
          max-width: 800px;
          padding: 30px;
          transform: translateY(50px);
          transition: all 0.4s ease;
          max-height: 90vh;
          overflow-y: auto;
        }
        
        .contact-form-overlay.show .contact-form-container {
          transform: translateY(0);
        }
        
        .close-form-btn {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #333;
        }
        
        .close-form-btn:hover {
          color: #000;
        }
        
        /* Form Styles - enhance existing styles */
        .contact_form_cntr input,
        .contact_form_cntr select,
        .contact_form_cntr textarea {
          border-radius: 8px;
          border: 1px solid #dee2e6;
          padding: 12px 15px;
          transition: all 0.3s ease;
        }
        
        .contact_form_cntr input:focus,
        .contact_form_cntr select:focus,
        .contact_form_cntr textarea:focus {
          border-color: #FDB92E;
          box-shadow: 0 0 0 0.25rem rgba(255, 193, 7, 0.25);
        }
        
        .input-group-text {
          border-top-left-radius: 8px;
          border-bottom-left-radius: 8px;
          background-color: #f8f9fa;
        }
        
        .btn-warning {
          background-color: #FDB92E;
          border-color: #FDB92E;
          color: #000;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        
        .btn-warning:hover {
          background-color: #FDB92E;
          border-color: #FDB92E;
        }

       
      `}</style>
    </>
  );
}