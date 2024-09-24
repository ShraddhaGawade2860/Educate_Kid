import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import Menu from '../menu/Menu';
import { AuthContext } from '../context/Authcontext';
import './editinstitute.css';

const EditInstitute = () => {
  const { user, login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    instituteName: '',
    email: '',
    contactnumber: '',
    profileImage: ''
  });
  const [imagePreview, setImagePreview] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFormData({
        instituteName: user.name || '',
        email: user.email || '',
        contactnumber: user.contactnumber || '',
        profileImage: user.profileImage || ''
      });
      setImagePreview(user.profileImage ? `http://localhost:5000/uploads/${user.profileImage}` : '');
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profileImage: e.target.files[0] });
    if (e.target.files[0]) {
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !user.id) {
      alert('User ID is not available.');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('contactnumber', formData.contactnumber);
    if (formData.profileImage) {
      formDataToSend.append('profileImage', formData.profileImage);
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/users/${user.id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      login(response.data);
      alert('Profile updated successfully!');
      navigate('/instituteprofile'); // Redirect to institute profile page after update
    } catch (error) {
      alert('Update failed: ' + (error.response ? error.response.data.msg : error.message));
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const goToHome = () => {
    navigate('/institutehome');
  };

  return (
    <div className={`edit-institute-profile ${menuOpen ? 'menu-expanded' : ''}`}>
      <Menu isExpanded={menuOpen} toggleMenu={toggleMenu} />
      <div className={`main-content ${menuOpen ? 'menu-expanded' : ''}`}>
        <div className="top-bar">
          <div className="welcome">
            Welcome to {formData.instituteName} Profile
          </div>
          <div className="icons">
            <FaHome className="icon" onClick={goToHome} />
          </div>
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit} className="editinstitute-form">
            <div className="profile-img-container">
              <div className="profile-img-wrapper">
                {imagePreview ? (
                  <img src={imagePreview} alt="Profile" className="profile-img" />
                ) : (
                  <div className="profile-img-placeholder">No Image</div>
                )}
                <label htmlFor="profileImage" className="add-button">+</label>
                <input
                  type="file"
                  id="profileImage"
                  name="profileImage"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="file-input"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="instituteName">Institute Name:</label>
              <input
                type="text"
                id="instituteName"
                name="instituteName"
                value={formData.instituteName}
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="contactnumber">Contact Number:</label>
              <input
                type="text"
                id="contactnumber"
                name="contactnumber"
                value={formData.contactnumber}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="update-buttoni">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditInstitute;
