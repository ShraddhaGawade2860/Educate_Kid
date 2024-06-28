import React, { useState } from 'react';
import './profile.css';

const Profile = () => {
  const [activeSection, setActiveSection] = useState(null);

  const renderContent = () => {
    switch (activeSection) {
      case 'editProfile':
        return <div>Edit Profile Content</div>;
      case 'termsConditions':
        return <div>Terms and Conditions Content</div>;
      case 'privacyPolicy':
        return <div>Privacy Policy Content</div>;
      case 'faqs':
        return <div>FAQs Content</div>;
      default:
        return <div>Please select an option from the left</div>;
    }
  };

  return (
    <div className="profile-container">
      <div className="left-box">
        <img src="user-image-url" alt="User" className="user-image"/>
        <h2>User Name</h2>
        <ul className="options-list">
          <li onClick={() => setActiveSection('editProfile')}>Edit Profile</li>
          <li onClick={() => setActiveSection('termsConditions')}>Terms and Conditions</li>
          <li onClick={() => setActiveSection('privacyPolicy')}>Privacy Policy</li>
          <li onClick={() => setActiveSection('faqs')}>FAQs</li>
          {/* Logout option removed from here */}
        </ul>
      </div>
      <div className="right-box">
        {renderContent()}
      </div>
    </div>
  );
};

export default Profile;
