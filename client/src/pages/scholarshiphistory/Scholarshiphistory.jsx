import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/Authcontext';
import './scholarshiphistory.css';

const ScholarshipHistory = () => {
  const [applications, setApplications] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchApplications = async () => {
      if (user && user.email) {
        try {
          console.log('Fetching data for email:', user.email);
          const response = await axios.get(`http://localhost:5000/api/form/scholarship-history/${user.email}`);
          setApplications(response.data);
        } catch (error) {
          console.error('Error fetching scholarship history:', error.response ? error.response.data : error.message);
        }
      } else {
        console.error('User email is missing.');
      }
    };

    fetchApplications();
  }, [user]);

  return (
    <div className="history_container">
      <h2>Scholarship Application History</h2>
      {applications.length === 0 ? (
        <p>No scholarship applications found.</p>
      ) : (
        applications.map(application => (
          <div key={application._id} className="application_card">
            <h3>{application.scholarshipName}</h3>
            <p><strong>Name:</strong> {application.name}</p>
            <p><strong>Enrollment Number:</strong> {application.enrollmentNo}</p>
            <p><strong>Home State:</strong> {application.homeState}</p>
            <p><strong>Email:</strong> {application.email}</p>
            <p><strong>Course:</strong> {application.course}</p>
            <p><strong>Verification Status:</strong> {application.verificationStatus || 'Pending'}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ScholarshipHistory;
