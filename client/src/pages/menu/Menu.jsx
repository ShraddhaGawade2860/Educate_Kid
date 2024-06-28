import React from 'react';
import { useNavigate } from 'react-router-dom';
import './menu.css';
import logo from "../../pages/image/logo.png";

const Menu = ({ isExpanded, toggleMenu }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform any necessary logout logic here (e.g., clearing authentication tokens)
    navigate('/login');
  };

  const handleAddScholarship = () => {
    navigate('/addscholarship');
  };

  const handleInstituteVerification = () => {
    navigate('/instituteverification');
  };

  return (
    <div className={`menu-container ${isExpanded ? 'expanded' : ''}`}>
      <div className="logo-container" onClick={toggleMenu}>
        <img src={logo} alt="Logo" className="app-logo" />
        {isExpanded && <h3 className="app-name">EducateKid</h3>}
      </div>
      <div className="menu-options">
        <ul className="menu-list">
          <li className="menu-item" onClick={handleAddScholarship}>Add Scholarship</li>
          <li className="menu-item">Scholarship List</li>
          <li className="menu-item">Student History</li>
          <li className="menu-item">Student List</li>
          <li className="menu-item" onClick={handleInstituteVerification}>Institute Verification</li>
          <li className="menu-item">Institute List</li>
          <li className="menu-item logout" onClick={handleLogout}>Logout</li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
