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

  const getStatusClass = (status) => {
    switch (status) {
      case 1:
        return 'approved';
      case 2:
        return 'rejected';
      default:
        return 'pending';
    }
  };

  const getStatusText = (instituteStatus, homeStateStatus, otherStateStatus, rejectReason) => {
    const statuses = [];
    if (instituteStatus === 1) statuses.push('Approved by Institute');
    if (instituteStatus === 2) statuses.push(`Rejected by Institute: ${rejectReason}`);
    if (homeStateStatus === 1) statuses.push('Approved by Home State');
    if (homeStateStatus === 2) statuses.push(`Rejected by Home State: ${rejectReason}`);
    if (otherStateStatus === 1) statuses.push('Approved by Other State');
    if (otherStateStatus === 2) statuses.push(`Rejected by Other State: ${rejectReason}`);

    // Add pending information based on statuses
    if (statuses.length === 0) {
      if (instituteStatus === 0) statuses.push('Pending at Institute');
      if (homeStateStatus === 0) statuses.push('Pending at Home State');
      if (otherStateStatus === 0) statuses.push('Pending at Other State');
    }

    return statuses.length ? statuses.join(' | ') : 'Pending';
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
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {userForms.map((form) => (
                <tr key={form._id}>
                  <td>{form.name}</td>
                  <td>{form.email}</td>
                  <td>{form.course}</td>
                  <td className={getStatusClass(form.finalStatus)}>
                    {getStatusText(form.instituteVerified, form.homeStateVerified, form.otherStateVerified, form.rejectReason)}
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

export default StudentRecord;
