import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import Menu from '../menu/Menu'; // Ensure Menu component is correctly imported
import { AuthContext } from '../context/Authcontext';
import './instituteprofile.css';

const InstituteProfile = () => {
  const { user } = useContext(AuthContext); // Get user data from context
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleEditProfile = () => {
    navigate('/editinstitute');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const goToHome = () => {
    navigate('/institutehome');
  };

  return (
    <div className={`institute-profile ${menuOpen ? 'menu-expanded' : ''}`}>
      <Menu isExpanded={menuOpen} toggleMenu={toggleMenu} />
      <div className={`main-content ${menuOpen ? 'menu-expanded' : ''}`}>
        <div className="top-bar">
          <div className="welcome">
            Welcome to {user.name} Profile
          </div>
          <div className="icons">
            <FaHome className="icon" onClick={goToHome} />
          </div>
        </div>
        <div className="institute-profile-container">
          <div className="institute-profile-box">
            <div className="institute-profile-left">
              <img 
                src={user.profileImage ? `http://localhost:5000/uploads/${user.profileImage}` : "default_image_path"} 
                alt="Profile" 
                className="institute-profile-image" 
              />
              <h2 className="institute-profile-name">{user.name}</h2>
            </div>
            <div className="institute-profile-right">
              <div className="institute-profile-info">
                <label>Name:</label>
                <span>{user.name}</span>
              </div>
              <div className="institute-profile-info">
                <label>Email:</label>
                <span>{user.email}</span>
              </div>
              <div className="institute-profile-info">
                <label>Contact Number:</label>
                <span>{user.contactnumber}</span>
              </div>
              <div className="institute-profile-info">
                <label>Institute Code:</label>
                <span>{user.institutecode}</span>
              </div>
              <div className="institute-profile-info">
                <label>State:</label>
                <span>{user.state}</span>
              </div>
              <button className="edit-institute-profile-button" onClick={handleEditProfile}>
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstituteProfile;
