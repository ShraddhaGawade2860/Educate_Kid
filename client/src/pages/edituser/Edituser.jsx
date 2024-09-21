import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/Authcontext';
import { useNavigate } from 'react-router-dom';
import './edituser.css';

const EditUser = () => {
  const { user, login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    contactnumber: '',
    gender: '',
    profileImage: ''
  });
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        contactnumber: user.contactnumber || '',
        gender: user.gender || '',
        profileImage: user.profileImage || ''
      });
      setImagePreview(user.profileImage ? `http://192.168.143.199:5000/uploads/${user.profileImage}` : '');
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
      setError('User ID is not available.');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('contactnumber', formData.contactnumber);
    formDataToSend.append('gender', formData.gender);
    if (formData.profileImage) {
      formDataToSend.append('profileImage', formData.profileImage);
    }

    try {
      const response = await axios.put(`http://192.168.143.199:5000/api/users/${user.id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      login(response.data);
      alert('Profile updated successfully!');
      navigate('/profile');
    } catch (error) {
      setError('Update failed: ' + (error.response ? error.response.data.msg : error.message));
    }
  };

  return (
    <div className="edituser-form">
    <div className="edituser-container">
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit} className="edituser-form">
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
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
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
        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button type="submit" className="update-button">Update</button>
        {error && <div className="error-message">{error}</div>}
      </form>

     
    </div>
  </div>    
    
  );
};

export default EditUser;
