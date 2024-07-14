import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useNavigate, useParams } from 'react-router-dom';
import './institutehome.css';
import Menu from '../menu/Menu';
import { FaHome } from 'react-icons/fa';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';

Chart.register(CategoryScale);

const InstituteHome = () => {
  const { state } = useParams();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [instituteName, setInstituteName] = useState('');

  useEffect(() => {
    // Assuming user information is stored in local storage after login
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setInstituteName(user.name);
    }
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const goToHome = () => {
    navigate(`/institutehome`);
  };

  const chartData = {
    labels: ['Scholarship A', 'Scholarship B', 'Scholarship C', 'Scholarship D', 'Scholarship E'],
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

  const pendingStudents = [
    {
      name: 'John Doe',
      enrollment: '12345',
      state: 'NY',
    },
    {
      name: 'Jane Smith',
      enrollment: '54321',
      state: 'CA',
    },
  ];

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
            <p>123</p>
          </div>
          <div className="box">
            <h3>Total Pending Students</h3>
            <p>45</p>
          </div>
          <div className="box">
            <h3>Total Verified Students</h3>
            <p>67</p>
          </div>
          <div className="box">
            <h3>Total Rejected Students</h3>
            <p>8</p>
          </div>
        </div>

        <div className="graph-section">
          <h4>Mostly Applied Scholarships</h4>
          <div className="graph-container">
            <Bar data={chartData} options={chartOptions} />
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
            {pendingStudents.map((student, index) => (
              <div className="student-box" key={index}>
                <p>{student.name}</p>
                <p>{student.enrollment}</p>
                <p>{student.state}</p>
                <button>View</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstituteHome;
