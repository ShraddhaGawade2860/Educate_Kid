import React, { useState } from 'react';
import Menu from '../menu/Menu';
import { FaHome } from 'react-icons/fa';
import './instituteprivacy.css';  // Assuming a similar CSS file for privacy page
import { useNavigate } from 'react-router-dom';

const InstitutePrivacy = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate= useNavigate();
 
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const goToHome = () => {
    navigate('/institutehome');
  };

  const handleOkClick = () => {
    // Handle the OK button click, e.g., navigate to another page or close the modal
    alert('You have accepted the privacy policy.');
    goToHome(); // Example action
  };

  return (
    <div className={`institute-privacy ${menuOpen ? 'menu-expanded' : ''}`}>
      <Menu isExpanded={menuOpen} toggleMenu={toggleMenu} />
      <div className={`main-content ${menuOpen ? 'menu-expanded' : ''}`}>
        <div className="top-bar">
          <div className="welcome">
            Welcome to the Institute Privacy Page
          </div>
          <div className="icons">
            <FaHome className="icon" onClick={goToHome} />
          </div>
        </div>

        <div className="terms-container">
          <div className="terms-box">
            <h2>Privacy Policy for EducateKid</h2>
            <p><strong>Effective Date</strong> </p>
            <h3>1. Introduction</h3>
            <p>Welcome to EducateKid, a scholarship application platform designed to streamline the registration and management of scholarship opportunities for educational institutes. We are committed to protecting the privacy and security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you use our platform.</p>
            <h3>2. Information We Collect</h3>
            <p>We may collect the following types of information:</p>
            <ul>
              <li><strong>Institute Information:</strong> Name of the institute, institute code, registration certificates, accreditation certificates, affiliation certificates, and other relevant documentation.</li>
              <li><strong>Contact Information:</strong> Email addresses, phone numbers, and other contact details of authorized representatives.</li>
              <li><strong>Account Information:</strong> Usernames, passwords, and security-related information for account access.</li>
              <li><strong>Usage Data:</strong> Information on how you interact with our platform, including IP addresses, browser types, device information, and activity logs.</li>
              <li><strong>Uploaded Documents:</strong> Files uploaded for registration or verification purposes, including student data, scholarship records, and institutional credentials.</li>
            </ul>
            <h3>3. How We Use Your Information</h3>
            <p>We use the collected information to:</p>
            <ul>
              <li>Facilitate institute registration and verification processes.</li>
              <li>Provide and manage access to the EducateKid platform.</li>
              <li>Communicate with institutes regarding their account and scholarship opportunities.</li>
              <li>Ensure compliance with legal and regulatory requirements.</li>
              <li>Improve our services and develop new features.</li>
              <li>Respond to inquiries, requests, or technical support needs.</li>
            </ul>
            <h3>4. How We Share Your Information</h3>
            <p>We may share your information with:</p>
            <ul>
              <li><strong>Authorized Personnel:</strong> Authorized representatives of your institute and our administrative team.</li>
              <li><strong>Government Authorities:</strong> Regulatory bodies or law enforcement agencies if required by law or legal processes.</li>
              <li><strong>Service Providers:</strong> Third-party service providers that assist in operating our platform, such as hosting services, email services, and security services.</li>
            </ul>
            <p>We do not sell or rent your personal information to third parties.</p>
            <h3>5. Data Security</h3>
            <p>We implement industry-standard security measures to protect your data from unauthorized access, use, or disclosure. This includes encryption, secure access controls, and regular security audits. However, no system can be completely secure, so we encourage you to protect your account credentials.</p>
            <h3>6. Data Retention</h3>
            <p>We retain your data for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. Once the information is no longer needed, we will securely delete or anonymize it.</p>
            <h3>7. Your Rights</h3>
            <p>As an institute, you have the right to:</p>
            <ul>
              <li>Access and review your information.</li>
              <li>Request corrections to your data if it is inaccurate or incomplete.</li>
              <li>Request the deletion of your data, subject to legal and contractual obligations.</li>
              <li>Object to or restrict certain processing activities.</li>
            </ul>
            <p>To exercise these rights, please contact us at [educatekid@gmail.com].</p>
            <h3>8. Changes to This Privacy Policy</h3>
            <p>We may update this Privacy Policy from time to time. When we do, we will notify you by updating the "Effective Date" at the top of this policy. We encourage you to review this policy periodically to stay informed about how we are protecting your information.</p>
            <button className="ok-button" onClick={handleOkClick}>
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutePrivacy;
