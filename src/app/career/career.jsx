// pages/index.js
"use client";
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import { sendApplyFormData } from "../../../services/service.js";
import { toast } from 'react-toastify';

export default function Home() {
  const [contactFormOpen, setContactFormOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [captchaText, setCaptchaText] = useState('');
  const contactFormRef = useRef(null);


  const [formData, setFormData] = useState({
    applyFor: 'Digital Marketing Executive',
    name: '',
    email: '',
    contact: '',
    resume: ''
  });

  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };
  // Set mounted state after component mounts
  useEffect(() => {
    setIsMounted(true);
    // Generate initial captcha when component mounts
    generateCaptcha();
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create FormData object to handle file uploads
      const submitData = new FormData();
      submitData.append('applyFor', formData.applyFor);
      submitData.append('name', formData.name);
      submitData.append('email', formData.email);
      submitData.append('contact', formData.contact);

      if (fileInputRef.current && fileInputRef.current.files[0]) {
        submitData.append('resume', fileInputRef.current.files[0]);
      }

      // Log form data for debugging
      console.log('Form submitted:', Object.fromEntries(submitData.entries()));

      const response = await sendApplyFormData(submitData);

      if (response.status === 201) {
        toast.success('Your Job Applied Successfully');
        setFormData({
          applyFor: 'Digital Marketing Executive',
          name: '',
          email: '',
          contact: '',
          captcha: '',
          fileName: ''
        });
        // Clear the file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        toast.error('Form submission failed. Please try again.');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred while submitting the form.');
      // alert('An error occurred. Please try again later.');
    }
  };


  return (
    <section className="career_section" id="middlecontent">
      <div className="container position-relative">
        <span className="pattern_logo career_pattern_logo"> <Image className="img-fluid" src="/assets/images/pattern_logo.png" alt="Ahmar" width={200} height={45} /></span>

        <div className="heading_box text-start mb-5">
          <h2 className="page_heading" data-aos="fade-up" data-aos-delay="400">Team Up With Happening Ads</h2>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-6">
            <form className="career_cntr contact_form_cntr" onSubmit={handleSubmit}>
              <div className="form-group">
                <select
                  name="applyFor"
                  value={formData.applyFor}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option>Digital Marketing Executive</option>
                  <option>Content Creator</option>
                  <option>SEO Specialist</option>
                  <option>Social Media Manager</option>
                </select>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group">
                <div className="phone-input-group">
                  <div className="phone-prefix">
                    <span className="flag-icon">
                      <Image
                        src="/assets/images/flag.png"
                        alt="india flag"
                        width={20}
                        height={20}
                      /></span>  +91
                  </div>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    className="phone-input"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="file-input-group">
                  <input
                    type="text"
                    readOnly
                    placeholder="Upload resume in pdf (Max 3 MB)"
                    value={fileName}
                    className="file-input-text"
                  />
                  <label className="browse-button">
                    Browse
                    <input
                      type="file"
                      name="resume"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="file-input"
                      accept=".pdf,.doc,.docx"
                    />
                  </label>
                </div>
              </div>
              <div className="form-group">
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
                  <div className="w-100">
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

              </div>
              <div className="form-group">
                <button
                  type="submit"
                  className="submit-button"
                >
                  Submit now
                </button>
              </div>
            </form>
          </div>
        </div>


        <style jsx>{`

        .logo-container {
          width: 80px;
          height: 80px;
          margin-bottom: 16px;
        }
        
        .logo {
          width: 100%;
          height: 100%;
        }
        
        h1 {
          color: #4169E1;
          text-align: center;
          font-size: 28px;
          margin-bottom: 30px;
        }
        
        form {
          width: 100%;
        }
        
        .form-group {
          margin-bottom: 16px;
          width: 100%;
        }
        
      
        .form-select {
          appearance: none;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 10px center;
          background-size: 16px;
        }
        
        .phone-input-group {
          display: flex;
          align-items: center;
        }
        
        .phone-prefix {
          display: flex;
          align-items: center;
          padding: 10px 15px;
          background: white;
          border: 2px solid #adadad;
          border-right: none;
          border-radius: 4px 0 0 4px;
          font-size: 16px;
        }
        
        .flag {
          margin-right: 5px;
        }
        
        .phone-input {
          flex: 1;
          padding: 10px 15px;
          border: 2px solid #adadad;
          border-radius: 0 4px 4px 0;
          font-size: 16px;
        }
        
        .file-input-group {
          display: flex;
          align-items: center;
        }
        
        .file-input-text {
          flex: 1;
          padding: 10px 15px;
          border: 2px solid #adadad;
          border-radius: 4px 0 0 4px;
          font-size: 16px;
          background-color: white;
        }
        
        .browse-button {
          padding: 10px 15px;
          background-color: #f8f9fa;
          border: 2px solid #adadad;
          border-left: none;
          border-radius: 0 4px 4px 0;
          cursor: pointer;
          font-size: 16px;
          display: inline-block;
          text-align: center;
        }
        
        .file-input {
          display: none;
        }
        
        .submit-button {
          width: 100%;
          padding: 12px;
          background-color: #FFD700;
          color: #212529;
          border: none;
          border-radius: 25px;
          font-size: 16px;
          cursor: pointer;
          font-weight: normal;
          transition: background-color 0.2s;
        }
        
        .submit-button:hover {
          background-color: #e6c200;
        }
        
       
      `}</style>


      </div>
    </section>
  );
}