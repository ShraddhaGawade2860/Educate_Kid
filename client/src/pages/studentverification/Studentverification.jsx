import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaHome } from 'react-icons/fa';
import Menu from '../menu/Menu';
import { useNavigate } from 'react-router-dom';
import './studentverification.css';

const StudentVerification = () => {
  const [userForms, setUserForms] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserForms = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.role === 1) {
          const instituteNameEncoded = encodeURIComponent(user.name);
          const response = await axios.get(`http://localhost:5000/api/forms/institute/${instituteNameEncoded}`);
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

  const handleVerify = async (formId) => {
    try {
      await axios.put(`/api/forms/verify/${formId}`);
    } catch (error) {
      console.error('Error verifying form:', error);
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
        <h2>Student Verification</h2>
        {userForms.length > 0 ? (
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
              {userForms.map((form) => (
                <tr key={form._id}>
                  <td>{form.name}</td>
                  <td>{form.email}</td>
                  <td>{form.course}</td>
                  <td>
                    <button onClick={() => handleVerify(form._id)}>Verify</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No forms to verify.</p>
        )}
      </div>
    </div>
  );
};

export default StudentVerification;
