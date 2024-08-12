import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import './menu.css';
import logo from "../../pages/image/logo.png";

const Menu = ({ isExpanded, toggleMenu }) => {
  const navigate = useNavigate();
  const { state } = useParams(); // Get the state from URL params
  const location = useLocation();

  const handleLogout = () => {
    // Clear any authentication data (e.g., token or user info)
    localStorage.removeItem('authToken');
    localStorage.removeItem('user'); // Assuming you store user data in localStorage
    
    // Navigate to the login page
    navigate('/login');
  };

  const handleAddScholarship = () => {
    navigate(`/addscholarship/${state}`);
  };

  const handleInstituteVerification = () => {
    navigate('/instituteverification');
  };

  const handleInstituteList = () => {
    navigate('/institutelist');
  };

  const isAdminPage = () => {
    const adminPaths = [
      '/adminhome',
      '/addscholarship',
      '/scholarshiplist',
      '/studenthistory',
      '/studentlist',
      '/instituteverification',
      '/institutelist',
      '/verifyhome',
      '/verifyother'
    ];
    return adminPaths.some(path => location.pathname.startsWith(path));
  };

  const isInstitutePage = () => {
    const institutePaths = [
      '/institutehome',
      '/instituteprofile',
      '/terms',
      '/studentrecord',
      '/studentverification',
      '/privacy',
      '/availablescholarship',
      '/userdata'
    ];
    return institutePaths.some(path => location.pathname.startsWith(path));
  };

  return (
    <div className={`menu-container ${isExpanded ? 'expanded' : ''}`}>
      <div className="logo-container" onClick={toggleMenu}>
        <img src={logo} alt="Logo" className="app-logo" />
        {isExpanded && <h3 className="app-name">EducateKid</h3>}
      </div>
      <div className="menu-options">
        <ul className="menu-list">
          {isAdminPage() && (
            <>
              <li className="menu-item" onClick={handleAddScholarship}>Add Scholarship</li>
              <li className="menu-item" onClick={() => navigate(`/scholarshiplist/${state}`)}>Scholarship List</li>
              <li className="menu-item" onClick={() => navigate(`/studenthistory/${state}`)}>Student History</li>
              <li className="menu-item" onClick={() => navigate(`/studentlist/${state}`)}>Student List</li>
              <li className="menu-item" onClick={handleInstituteVerification}>Institute Verification</li>
              <li className="menu-item" onClick={handleInstituteList}>Institute List</li>
              <li className="menu-item logout" onClick={handleLogout}>Logout</li>
            </>
          )}
          {isInstitutePage() && (
            <>
              <li className="menu-item" onClick={() => navigate('/studentrecord')}>Student Record</li>
              <li className="menu-item" onClick={() => navigate('/studentverification')}>Student Verification</li>
              <li className="menu-item" onClick={() => navigate('/availablescholarship')}>Available Scholarship</li>
              <li className="menu-item" onClick={() => navigate('/instituteprofile')}>Edit Profile</li>
              <li className="menu-item" onClick={() => navigate('/terms')}>Terms and Conditions</li>
              <li className="menu-item" onClick={() => navigate('/privacy')}>Privacy Policy</li>
              <li className="menu-item logout" onClick={handleLogout}>Logout</li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Menu;
