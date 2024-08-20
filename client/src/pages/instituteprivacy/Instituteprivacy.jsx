import React, { useState } from 'react';
import Menu from '../menu/Menu';
import { FaHome } from 'react-icons/fa';
import './instituteprivacy.css';  // Assuming a similar CSS file for privacy page

const InstitutePrivacy = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const goToHome = () => {
    // Navigate to institute home, add your routing logic here
  };

  const handleOkClick = () => {
    // Handle the OK button click, e.g., navigate to another page or close the modal
    alert('You have accepted the terms and conditions.');
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
            <h2>Terms and Conditions for Institutes</h2>
            <p><strong>Effective Date:</strong> [Insert Date]</p>
            <p>Welcome to the EducateKid Scholarship Platform ("Platform"). These Terms and Conditions ("Terms") govern the relationship between the participating institutes ("Institute," "You," or "Your") and EducateKid ("We," "Us," or "Our"). By registering and participating in the Platform, the Institute agrees to comply with the following Terms.</p>
            <h3>1. Eligibility</h3>
            <p>Institutes must be officially recognized by the appropriate educational authorities in their state or country.</p>
            <p>Institutes must provide valid documentation, including accreditation certificates, affiliation certificates, and any other required certificates during the registration process.</p>
            <h3>2. Registration and Verification</h3>
            <p>Institutes are required to complete the registration process by providing accurate and up-to-date information, including the institute's name, address, and contact details.</p>
            <p>The registration is subject to verification by EducateKid. We reserve the right to approve or reject any registration at our discretion.</p>
            <p>Institutes must promptly update their information if there are any changes.</p>
            <h3>3. Use of the Platform</h3>
            <p>Institutes shall use the Platform solely for the purpose of managing and verifying scholarship applications and providing necessary support to eligible students.</p>
            <p>Institutes are responsible for ensuring that their login credentials are kept confidential and are not shared with unauthorized individuals.</p>
            <p>Institutes must not use the Platform for any unlawful, fraudulent, or unauthorized activities.</p>
            <h3>4. Responsibilities</h3>
            <p>Institutes are responsible for reviewing and verifying the scholarship applications submitted by students who have applied under their institute's name.</p>
            <p>Institutes must ensure that the verification process is completed in a timely manner, providing necessary approvals or rejections based on the information provided by the students.</p>
            <p>Institutes agree to cooperate with EducateKid in resolving any disputes or issues related to scholarship applications or the use of the Platform.</p>
            <h3>5. Data Privacy</h3>
            <p>Institutes must comply with all applicable data protection and privacy laws regarding the handling of personal information provided by students through the Platform.</p>
            <p>Institutes agree not to share, sell, or disclose any student data obtained through the Platform with third parties without the explicit consent of the student or as required by law.</p>
            <h3>6. Termination</h3>
            <p>EducateKid reserves the right to suspend or terminate an Institute’s access to the Platform at any time, without prior notice, for any reason, including but not limited to, breach of these Terms, misconduct, or inactivity.</p>
            <p>Institutes may also terminate their participation in the Platform by providing written notice to EducateKid. Upon termination, the Institute must cease all use of the Platform and destroy any data obtained through the Platform.</p>
            <h3>7. Intellectual Property</h3>
            <p>All intellectual property rights related to the Platform, including but not limited to trademarks, logos, and software, are owned by EducateKid or its licensors. Institutes are granted a limited, non-exclusive license to use the Platform for the purposes outlined in these Terms.</p>
            <h3>8. Limitation of Liability</h3>
            <p>EducateKid is not liable for any direct, indirect, incidental, or consequential damages arising from the Institute's use of the Platform or any actions taken in relation to scholarship applications.</p>
            <p>EducateKid does not guarantee the accuracy or completeness of the information provided by students and is not responsible for any errors or omissions.</p>
            <h3>9. Amendments</h3>
            <p>EducateKid reserves the right to modify these Terms at any time. Institutes will be notified of any changes through the Platform or via email. Continued use of the Platform after changes have been made constitutes acceptance of the revised Terms.</p>
            <h3>10. Governing Law</h3>
            <p>These Terms shall be governed by and construed in accordance with the laws of [Insert Jurisdiction]. Any disputes arising out of or related to these Terms shall be subject to the exclusive jurisdiction of the courts of [Insert Jurisdiction].</p>
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
