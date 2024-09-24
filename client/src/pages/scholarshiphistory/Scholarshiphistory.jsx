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
          const response = await axios.get(`http://localhost:5000/api/scholarshipHistory/scholarship-history/${user.email}`);
          setApplications(response.data);
        } catch (error) {
          console.error('Error fetching scholarship history:', error.response ? error.response.data : error.message);
        }
      } else {
        console.error('User email is missing.', user);
      }
    };

    fetchApplications();
  }, [user]);

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

  return (
    <div className="history_container">
      <h2>Scholarship Application History</h2>
      
      {applications.length === 0 ? (
        <p>No scholarship applications found.</p>
      ) : (
        applications.map(application => (
          <div key={application._id} className="application_card">
            <h3>{application.scholarshipName}</h3>
            <div className="row">
              <p><strong>Name:</strong> {application.name}</p>
              <p><strong>Enrollment Number:</strong> {application.enrollmentNo}</p>
            </div>
            <div className="row">
              <p><strong>Home State:</strong> {application.homeState}</p>
              <p><strong>Email:</strong> {application.email}</p>
            </div>
            <div className="row">
              <p><strong>Course:</strong> {application.course}</p>
              <p><strong>Verification Status:</strong><br/>
                <span className={getStatusClass(application.instituteVerified)}> 
                  {application.instituteVerified === 1 ? 'Approved by Institute' : 
                   application.instituteVerified === 2 ? `Rejected by Institute: ${application.rejectReason}` : 
                   'Pending by Institute'}
                </span><br />
                <span className={getStatusClass(application.homeStateVerified)}> 
                  {application.homeStateVerified === 1 ? 'Approved by Home State' : 
                   application.homeStateVerified === 2 ? `Rejected by Home State: ${application.rejectReason}` : 
                   'Pending by Home State'}
                </span><br />
                <span className={getStatusClass(application.otherStateVerified)}> 
                  {application.otherStateVerified === 1 ? 'Approved by Other State' : 
                   application.otherStateVerified === 2 ? `Rejected by Other State: ${application.rejectReason}` : 
                   'Pending by Other State'}
                </span>
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ScholarshipHistory;
