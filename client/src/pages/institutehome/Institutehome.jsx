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
  const [scholarshipData, setScholarshipData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Number of Applications',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  });
  const [pendingForms, setPendingForms] = useState([]);

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
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    if (instituteName) {
      fetchCounts();
    }
  }, [instituteName]);

  useEffect(() => {
    const fetchScholarshipData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/scholarships/application-counts/${encodeURIComponent(instituteName)}`);
        const labels = response.data.map(item => item._id);
        const data = response.data.map(item => item.count);

        setScholarshipData({
          labels,
          datasets: [
            {
              label: 'Number of Applications',
              data,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching scholarship application data:', error);
      }
    };

    if (instituteName) {
      fetchScholarshipData();
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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const goToHome = () => {
    navigate(`/institutehome`);
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
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
          <div className="box">
            <h3>Total Scholarships</h3>
            <p>{scholarshipCount}</p>
          </div>
          <div className="box">
            <h3>Total Pending Students</h3>
            <p>{pendingCount}</p>
          </div>
          <div className="box">
            <h3>Total Verified Students</h3>
            <p>{verifiedCount}</p>
          </div>
          <div className="box">
            <h3>Total Rejected Students</h3>
            <p>{rejectedCount}</p>
          </div>
        </div>

        <div className="graph-section">
          <h4>Mostly Applied Scholarships</h4>
          <div className="graph-container">
            <Bar data={scholarshipData} options={chartOptions} />
          </div>
        </div>

        <div className="pending-students">
          <div className="header">
            <h4>Recently Pending Students</h4>
            <button className="link-button">View All</button>
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
