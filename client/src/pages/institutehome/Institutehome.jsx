import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import './institutehome.css';
import Menu from '../menu/Menu';
import { FaHome } from 'react-icons/fa';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';

Chart.register(CategoryScale);

const InstituteHome = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [instituteName, setInstituteName] = useState('');
  const [scholarshipCount, setScholarshipCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [verifiedCount, setVerifiedCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  const [totalHomePendingStudents, setHomePendingStudents] = useState(0);
  const [totalHomeApprovedStudents, setHomeApprovedStudents] = useState(0);
  const [totalHomeRejectedStudents, setHomeRejectedStudents] = useState(0);
  const [totalOtherPendingStudents, setOtherPendingStudents] = useState(0);
  const [totalOtherApprovedStudents, setOtherApprovedStudents] = useState(0);
  const [totalOtherRejectedStudents, setOtherRejectedStudents] = useState(0);
  const [pendingForms, setPendingForms] = useState([]);
  const [verificationData, setVerificationData] = useState({
    labels: ['Verified Students', 'Rejected Students'],
    datasets: [
      {
        label: 'Student Records',
        data: [0, 0], // Default values; will be updated later
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
      },
    ],
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setInstituteName(user.name);
    }
  }, []);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/institute/${encodeURIComponent(instituteName)}/counts`);
        setPendingCount(response.data.pending);
        setVerifiedCount(response.data.verified);
        setRejectedCount(response.data.rejected);
        setVerificationData({
          ...verificationData,
          datasets: [{
            ...verificationData.datasets[0],
            data: [response.data.verified, response.data.rejected],
          }],
        });
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    if (instituteName) {
      fetchCounts();
    }
  }, [instituteName]);

  useEffect(() => {
    const fetchPendingForms = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/forms/institute/${encodeURIComponent(instituteName)}`);
        setPendingForms(response.data.filter(form => form.instituteVerified === 0));
      } catch (error) {
        console.error('Error fetching pending forms:', error);
      }
    };

    if (instituteName) {
      fetchPendingForms();
    }
  }, [instituteName]);

  useEffect(() => {
    const fetchVerificationDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/institute/${encodeURIComponent(instituteName)}/verification-details`);
        setHomePendingStudents(response.data.homePending);
        setHomeApprovedStudents(response.data.homeApproved);
        setHomeRejectedStudents(response.data.homeRejected);
        setOtherPendingStudents(response.data.otherPending);
        setOtherApprovedStudents(response.data.otherApproved);
        setOtherRejectedStudents(response.data.otherRejected);
      } catch (error) {
        console.error('Error fetching verification details:', error);
      }
    };

    if (instituteName) {
      fetchVerificationDetails();
    }
  }, [instituteName]);

  useEffect(() => {
    const fetchScholarshipCount = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/scholarshipcount/count');
        setScholarshipCount(response.data.count);
      } catch (error) {
        console.error('Error fetching scholarship count:', error);
      }
    };

    fetchScholarshipCount();
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const goToHome = () => {
    // Navigate to institute home, add your routing logic here
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  const handleViewAllClick = () => {
    navigate('/studentverification');
  };

  return (
    <div className={`institute-dashboard ${menuOpen ? 'menu-expanded' : ''}`}>
      <Menu isExpanded={menuOpen} toggleMenu={toggleMenu} />
      <div className={`main-content ${menuOpen ? 'menu-expanded' : ''}`}>
        <div className="top-bar">
          <div className="welcome">
            Welcome to {instituteName} Dashboard
          </div>
          <div className="icons">
            <FaHome className="icon" onClick={goToHome} />
          </div>
        </div>

        <div className="stats-boxes">
          <div className="boxii">
            <h3>Total Scholarships</h3>
            <p>{scholarshipCount}</p>
          </div>
          <div className="boxii">
            <h3>Total Pending Students</h3>
            <p>{pendingCount}</p>
          </div>
          <div className="boxii">
            <h3>Total Verified Students</h3>
            <p>{verifiedCount}</p>
          </div>
          <div className="boxii">
            <h3>Total Rejected Students</h3>
            <p>{rejectedCount}</p>
          </div>
          <div className="boxii">
            <h3>Total Pending Students Home State</h3>
            <p>{totalHomePendingStudents}</p>
          </div>
          <div className="boxii">
            <h3>Total Approved Students Home State</h3>
            <p>{totalHomeApprovedStudents}</p>
          </div>
          <div className="boxii">
            <h3>Total Rejected Students Home State</h3>
            <p>{totalHomeRejectedStudents}</p>
          </div>
          <div className="boxii">
            <h3>Total Pending Students Other State</h3>
            <p>{totalOtherPendingStudents}</p>
          </div>
          <div className="boxii">
            <h3>Total Approved Students Other State</h3>
            <p>{totalOtherApprovedStudents}</p>
          </div>
          <div className="boxii">
            <h3>Total Rejected Students Other State</h3>
            <p>{totalOtherRejectedStudents}</p>
          </div>
        </div>

        <div className="graph-section2">
          <h4>Verified vs. Rejected Students</h4>
          <div className="graph-container2">
            <Bar data={verificationData} options={chartOptions} />
          </div>
        </div>

        <div className="pending-students">
          <div className="header">
            <h4>Recently Pending Students</h4>
            <button className="link-button" onClick={handleViewAllClick}>View All</button>
          </div>

          <div className="student-list-header">
            <p>Name</p>
            <p>Enrollment Number</p>
            <p>State</p>
            <p>Action</p>
          </div>

          <div className="student-list">
            {pendingForms.map((student, index) => (
              <div className="student-box" key={index}>
                <p>{student.name}</p>
                <p>{student.enrollmentNo}</p>
                <p>{student.state}</p>
                <button onClick={() => navigate(`/userdata/${student._id}`)}>View</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstituteHome;
