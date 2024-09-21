import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaHome } from 'react-icons/fa';
import Menu from '../menu/Menu';
import { useNavigate } from 'react-router-dom';
import './studentverification.css';

const StudentVerification = () => {
  const [userForms, setUserForms] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeList, setActiveList] = useState('pending'); // State to manage active list
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserForms = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.role === 1) {
          const instituteNameEncoded = encodeURIComponent(user.name);
          const response = await axios.get(`http://192.168.143.199:5000/api/forms/institute/${instituteNameEncoded}`);
          setUserForms(response.data);
        }
      } catch (error) {
        console.error('Error fetching user forms:', error);
      }
    };

    fetchUserForms();
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const goToHome = () => {
    navigate(`/institutehome`);
  };

  const handleView = (formId) => {
    navigate(`/userdata/${formId}`); // Navigate to UserData component with formId
  };

  // Function to filter forms based on active list type
  const filteredForms = () => {
    switch (activeList) {
      case 'pending':
        return userForms.filter(form => !form.instituteVerified); // Filter pending forms
      case 'verified':
        return userForms.filter(form => form.instituteVerified === 1); // Filter approved forms
      case 'rejected':
        return userForms.filter(form => form.instituteVerified === 2); // Filter rejected forms
      default:
        return userForms;
    }
  };

  return (
    <div className={`student-verification-container ${menuOpen ? 'menu-expanded' : ''}`}>
      <Menu isExpanded={menuOpen} toggleMenu={toggleMenu} />
      <div className={`main-content ${menuOpen ? 'menu-expanded' : ''}`}>
        <div className="top-bar">
          <div className="welcome">
            Student Verification
          </div>
          <div className="icons">
            <FaHome className="icon" onClick={goToHome} />
          </div>
        </div>
        <div className="dropdown-menu">
          <select value={activeList} onChange={(e) => setActiveList(e.target.value)}>
            <option value="pending">Pending List</option>
            <option value="verified">Verified List</option>
            <option value="rejected">Rejected List</option>
          </select>
        </div>
        <h2>Student Verification</h2>
        {filteredForms().length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Course</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredForms().map((form) => (
                <tr key={form._id}>
                  <td>{form.name}</td>
                  <td>{form.email}</td>
                  <td>{form.course}</td>
                  <td>
                    <button onClick={() => handleView(form._id)}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No forms to display for this list.</p>
        )}
      </div>
    </div>
  );
};

export default StudentVerification;
