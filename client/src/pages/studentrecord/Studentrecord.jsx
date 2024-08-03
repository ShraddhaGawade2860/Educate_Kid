import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaHome } from 'react-icons/fa';
import Menu from '../menu/Menu';
import { useNavigate } from 'react-router-dom';
import './studentrecord.css';

const StudentRecord = () => {
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

  const getStatusText = (status) => {
    switch (status) {
      case 1:
        return 'Approved';
      case 2:
        return 'Rejected';
      default:
        return 'Pending';
    }
  };

  return (
    <div className={`student-record-container ${menuOpen ? 'menu-expanded' : ''}`}>
      <Menu isExpanded={menuOpen} toggleMenu={toggleMenu} />
      <div className={`main-content ${menuOpen ? 'menu-expanded' : ''}`}>
        <div className="top-bar">
          <div className="welcome">
            Student Record
          </div>
          <div className="icons">
            <FaHome className="icon" onClick={goToHome} />
          </div>
        </div>
        <h2>Student Record</h2>
        {userForms.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Course</th>
                <th>Final Status</th>
              </tr>
            </thead>
            <tbody>
              {userForms.map((form) => (
                <tr key={form._id}>
                  <td>{form.name}</td>
                  <td>{form.email}</td>
                  <td>{form.course}</td>
                  <td>{getStatusText(form.finalStatus)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No forms to display.</p>
        )}
      </div>
    </div>
  );
};

export default StudentRecord;
