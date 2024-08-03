// studenthistory.jsx
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/Authcontext';
import { FaHome } from 'react-icons/fa';
import Menu from '../menu/Menu';
import { useNavigate } from 'react-router-dom';
import './studenthistory.css';

const StudentHistory = () => {
  const [forms, setForms] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const stateEncoded = encodeURIComponent(user.state);
        const response = await axios.get(`http://localhost:5000/api/studenthistory/state/${stateEncoded}`);
        setForms(response.data);
      } catch (error) {
        console.error('Error fetching forms:', error);
      }
    };

    if (user && user.role === 2) {
      fetchForms();
    }
  }, [user]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const goToHome = () => {
    navigate(`/adminhome`);
  };

  return (
    <div className={`student-history-container ${menuOpen ? 'menu-expanded' : ''}`}>
      <Menu isExpanded={menuOpen} toggleMenu={toggleMenu} />
      <div className={`main-content ${menuOpen ? 'menu-expanded' : ''}`}>
        <div className="top-bar">
          <div className="welcome">
            Student History for {user.state}
          </div>
          <div className="icons">
            <FaHome className="icon" onClick={goToHome} />
          </div>
        </div>
        <h2>Student History</h2>
        {forms.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Institution</th>
                <th>Course</th>
                <th>Final Status</th>
              </tr>
            </thead>
            <tbody>
              {forms.map((form) => (
                <tr key={form._id}>
                  <td>{form.name}</td>
                  <td>{form.email}</td>
                  <td>{form.institutionName}</td>
                  <td>{form.course}</td>
                  <td>
                    {form.finalStatus === 0 ? 'Pending' : form.finalStatus === 1 ? 'Approved' : 'Rejected'}
                  </td>
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

export default StudentHistory;
