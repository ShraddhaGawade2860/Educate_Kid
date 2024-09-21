import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/Authcontext';
import './profile.css';

const Profile = () => {
  const { user } = useContext(AuthContext); // Get user data from context
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate('/edituser');
  };

  return (
    <div className="profile-container">
      <div className="profile-box">
        <div className="profile-left">
          <img 
            src={user.profileImage ? `http://192.168.143.199:5000/uploads/${user.profileImage}` : "default_image_path"} 
            alt="Profile" 
            className="profile-image" 
          />
          <h2 className="profile-name">{user.name}</h2>
        </div>
        <div className="profile-right">
          <div className="profile-info">
            <label>Name:</label>
            <span>{user.name}</span>
          </div>
          <div className="profile-info">
            <label>Email:</label>
            <span>{user.email}</span>
          </div>
          <div className="profile-info">
            <label>Contact Number:</label>
            <span>{user.contactnumber}</span>
          </div>
          <div className="profile-info">
            <label>Gender:</label>
            <span>{user.gender}</span>
          </div>
          <button className="edit-profile-button" onClick={handleEditProfile}>
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
