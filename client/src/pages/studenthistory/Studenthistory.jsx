import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/Authcontext';
import { FaHome } from 'react-icons/fa';
import Menu from '../menu/Menu';
import { useNavigate, useParams } from 'react-router-dom';
import './studenthistory.css';

const StudentHistory = () => {
  const [forms, setForms] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { state } = useParams();

  useEffect(() => {
    if (!user || user.role !== 2) return;

    const fetchForms = async () => {
      try {
        const stateEncoded = encodeURIComponent(user.state);
        const response = await axios.get(`http://192.168.143.199:5000/api/studenthistory/state/${stateEncoded}`);
        setForms(response.data);
      } catch (error) {
        console.error('Error fetching forms:', error);
      }
    };

    fetchForms();
  }, [user]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const goToHome = () => {
    navigate(`/adminhome/${state}`);
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

    if (statuses.length === 0) {
      if (instituteStatus === 0) statuses.push('Pending at Institute');
      if (homeStateStatus === 0) statuses.push('Pending at Home State');
      if (otherStateStatus === 0) statuses.push('Pending at Other State');
    }

    return statuses.length ? statuses.join(' | ') : 'Pending';
  };

  return (
    <div className={`student-history-container ${menuOpen ? 'menu-expanded' : ''}`}>
      <Menu isExpanded={menuOpen} toggleMenu={toggleMenu} />
      <div className={`main-content ${menuOpen ? 'menu-expanded' : ''}`}>
        <div className="top-bar">
          <div className="welcome">
            Student History for {user ? user.state : 'Loading...'}
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
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {forms.map((form) => (
                <tr key={form._id}>
                  <td>{form.name}</td>
                  <td>{form.email}</td>
                  <td>{form.institutionName}</td>
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

export default StudentHistory;
