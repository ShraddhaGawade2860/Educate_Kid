import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { useNavigate, useParams } from 'react-router-dom';
import './adminhome.css';
import Menu from '../menu/Menu';
import { FaHome } from 'react-icons/fa';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import axios from 'axios';

Chart.register(CategoryScale);

const AdminHome = () => {
  const { state } = useParams();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scholarshipCount, setScholarshipCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [verifiedCount, setVerifiedCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  const [pendingForms, setPendingForms] = useState([]);
  const [recentInstitutes, setRecentInstitutes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/admincount/state/${state}/counts`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPendingCount(data.pending);
        setVerifiedCount(data.verified);
        setRejectedCount(data.rejected);
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    fetchCounts();
  }, [state]);

  useEffect(() => {
    const fetchPendingForms = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/admincount/state/${state}?status=pending`);
        setPendingForms(response.data);
      } catch (error) {
        console.error('Error fetching pending forms:', error);
      }
    };

    fetchPendingForms();
  }, [state]);

  useEffect(() => {
    const fetchScholarshipCount = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/scholarshipcount/count');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setScholarshipCount(data.count);
      } catch (error) {
        console.error('Error fetching scholarship count:', error);
      }
    };

    fetchScholarshipCount();
  }, []);

  useEffect(() => {
    const fetchRecentInstitutes = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/admin/verification/requests`, {
          params: { state, status: 'pending' }
        });
        const instituteData = response.data.map(institute => ({
          name: institute.name,
          code: institute.institutecode
        }));
        setRecentInstitutes(instituteData);
      } catch (error) {
        console.error('Error fetching recent institutes:', error);
      }
    };

    fetchRecentInstitutes();
  }, [state]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const goToHome = () => {
    navigate(`/adminhome/${state}`);
  };

  const goToStudentList = () => {
    navigate(`/studentlist/${state}`);
  };

  const chartData = {
    labels: ['R. I. M. C. Maharashtra', 'Eklavya Scholarship Maharashtra', 'Cultural Talent Search Scholarship', 'R. I. M. C.Tamil Nadu'],
    datasets: [
      {
        label: 'Number of Applications',
        data: [12, 19, 3, 5, 2],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className={`admin-dashboard ${menuOpen ? 'menu-expanded' : ''}`}>
      <Menu isExpanded={menuOpen} toggleMenu={toggleMenu} />
      <div className={`main-content ${menuOpen ? 'menu-expanded' : ''}`}>
        <div className="top-bar">
          <div className="welcome">
            Welcome to {state} Admin Dashboard
          </div>
          <div className="icons">
            <FaHome className="icon" onClick={goToHome} />
          </div>
        </div>

        

        <div className="stats-boxes1">
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
        </div>

        <div className="content-row">
          <div className="graph">
            <h4>Mostly Applied Scholarships</h4>
            <div className="graph-container">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>

          <div className="pending-students">
            <div className="header">
              <h4>Recently Pending Students</h4>
              <button className="link-button" onClick={goToStudentList}>View All</button>
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
                  <button onClick={() => navigate(`/verifyhome/${student._id}`)}>View</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="recent-institute">
          <h4>Recently Added Institutes</h4>
          <div className="institute-container">
            <div className="institute-row">
              {recentInstitutes.map((institute, index) => (
                <div className="institute" key={index}>
                  <p>Name: {institute.name}</p>
                  <p>Code: {institute.code}</p>
                  <button 
                    className="view-button" 
                    onClick={() => navigate(`/instituteverification`)}
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
