import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaHome } from 'react-icons/fa';
import Menu from '../menu/Menu';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import './studentlist.css';

const StudentList = () => {
  const { state } = useParams(); // Get state from URL
  const [userForms, setUserForms] = useState([]);
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [toggle, setToggle] = useState('home'); // Default to home state user
  const [statusFilter, setStatusFilter] = useState('pending'); // Default to pending list
  const navigate = useNavigate();

   // Get toggle value from URL query parameters
   useEffect(() => {
    const params = new URLSearchParams(location.search);
    const toggleFromUrl = params.get('toggle');
    if (toggleFromUrl) {
      setToggle(toggleFromUrl); // Set toggle to 'other' or 'home' based on URL
    }
  }, [location]);

  useEffect(() => {
    const fetchUserForms = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.role === 2) { // Assuming role 2 is for state admin
          const stateEncoded = encodeURIComponent(user.state);
          let url = `http://localhost:5000/api/forms/state/${stateEncoded}?status=${statusFilter}`;
          if (toggle === 'other') {
            url = `http://localhost:5000/api/forms/otherstate/${stateEncoded}?status=${statusFilter}`;
          }
          const response = await axios.get(url);
          setUserForms(response.data);
        }
      } catch (error) {
        console.error('Error fetching user forms:', error);
      }
    };

    fetchUserForms();
  }, [toggle, statusFilter]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const goToHome = () => {
    navigate(`/adminhome/${state}`);
  };

  const handleView = (formId) => {
    const isHomeState = userForms.some(form => form._id === formId && form.state === state); // Check if form is from home state
    if (isHomeState) {
      navigate(`/verifyhome/${formId}`); // Redirect to verifyhome if form is from home state
    } else {
      navigate(`/verifyother/${formId}`); // Redirect to verifyother if form is from another state
    }
  };

  return (
    <div className={`student-list-dashboard ${menuOpen ? 'menu-expanded' : ''}`}>
      <Menu isExpanded={menuOpen} toggleMenu={toggleMenu} />
      <div className={`main-content ${menuOpen ? 'menu-expanded' : ''}`}>
        <div className="top-bar">
          <div className="welcome">
            User List
          </div>
          <div className="icons">
            <FaHome className="icon" onClick={goToHome} />
          </div>
        </div>
        <div className="toggle-buttons">
          <button
            className={`toggle-button ${toggle === 'home' ? 'active' : ''}`}
            onClick={() => setToggle('home')}
          >
            Home State User
          </button>
          <button
            className={`toggle-button ${toggle === 'other' ? 'active' : ''}`}
            onClick={() => setToggle('other')}
          >
            Other State User
          </button>
        </div>
        <div className="status-dropdown">
          <label htmlFor="statusFilter"></label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
            <option value="verified">Verified</option>
          </select>
        </div>
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
                    <button onClick={() => handleView(form._id)}>View</button>
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

export default StudentList;
