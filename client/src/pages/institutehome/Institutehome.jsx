import React, { useContext, useState, useRef } from 'react';
import './institutehome.css';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import mainVideo from "../video/home.mp4";
import { AuthContext } from '../context/Authcontext';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const InstituteHome = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [statusSelection, setStatusSelection] = useState("");
  const scrollContainerRef = useRef(null);

  const handleStatusClick = () => {
    if (!isLoggedIn) {
      toast.error('Please log in first.');
      return;
    }

    if (!statusSelection) {
      toast.error('Please select a status.');
      return;
    }

    switch (statusSelection) {
      case "pending":
        navigate('/pending');
        break;
      case "verified":
        navigate('/verified');
        break;
      case "rejected":
        navigate('/rejected');
        break;
      default:
        toast.error('Invalid selection.');
    }
  };

  if (!isLoggedIn) {
    navigate('/'); // Redirect to Landing page if not logged in
    return null; // Or render loading spinner/element
  }

  // Example data for the student records chart
  const studentData = {
    labels: ['Verified', 'Rejected'],
    datasets: [
      {
        label: 'Students',
        data: [50, 20], // Replace with your actual data
        backgroundColor: ['#4caf50', '#f44336'],
        borderColor: ['#4caf50', '#f44336'],
        borderWidth: 1,
      },
    ],
  };

  const studentOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Student Records',
      },
    },
  };

  // Example data for the most applied scholarships chart
  const scholarshipData = {
    labels: ['Scholarship A', 'Scholarship B', 'Scholarship C', 'Scholarship D'],
    datasets: [
      {
        label: 'Applications',
        data: [150, 120, 100, 80], // Replace with your actual data
        backgroundColor: ['#ff9800', '#03a9f4', '#e91e63', '#9c27b0'],
        borderColor: ['#ff9800', '#03a9f4', '#e91e63', '#9c27b0'],
        borderWidth: 1,
      },
    ],
  };

  const scholarshipOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Most Applied Scholarships',
      },
    },
  };

  // Example student details
  const studentDetails = [
    { name: 'John Doe', enrollment: '123456', detailsLink: '/student/1' },
    { name: 'Jane Smith', enrollment: '654321', detailsLink: '/student/2' },
    { name: 'Alice Johnson', enrollment: '789012', detailsLink: '/student/3' },
    { name: 'Bob Brown', enrollment: '345678', detailsLink: '/student/4' },
    { name: 'Emily Davis', enrollment: '890123', detailsLink: '/student/5' },
    { name: 'Frank Wilson', enrollment: '456789', detailsLink: '/student/6' },
    { name: 'Grace Lee', enrollment: '234567', detailsLink: '/student/7' },
    { name: 'Henry White', enrollment: '678901', detailsLink: '/student/8' },
    // Add more student details as needed
  ];

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -220, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 220, behavior: 'smooth' });
    }
  };

  return (
    <div>
      <div className="institutehome-container">
        <div className="content">
          <div className="video-container">
            <video src={mainVideo} alt="Main Banner" autoPlay loop muted />
            <div className="video-content">
              <p>"Welcome to the Institute Portal. Manage your students effectively."</p>
              <div className="dropdowns">
                <div className="dropdown">
                  <label>Select Status</label>
                  <select onChange={(e) => setStatusSelection(e.target.value)}>
                    <option value="">Select Status</option>
                    <option value="pending">Pending Students</option>
                    <option value="verified">Verified Students</option>
                    <option value="rejected">Rejected Students</option>
                  </select>
                </div>
                <div className="buttons">
                  <button className="btn" onClick={handleStatusClick}>View</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h2 className="chart-header">STUDENT RECORD</h2>
        <div className="chart-container">
          <div className="chart">
            <Bar data={studentData} options={studentOptions} />
          </div>
        </div>
        <h2 className="chart-header">MOST APPLIED SCHOLARSHIPS</h2>
        <div className="chart-container">
          <div className="chart">
            <Bar data={scholarshipData} options={scholarshipOptions} />
          </div>
        </div>
        <h2 className="chart-header">STUDENT DETAILS</h2>
        <div className="scroll-box-frame">
          <button className="scroll-button left" onClick={scrollLeft}>&lt;</button>
          <div className="scroll-box-container" ref={scrollContainerRef}>
            {studentDetails.map((student, index) => (
              <div key={index} className="scroll-box">
                <div className="student-name">{student.name}</div>
                <div className="enrollment-number">{student.enrollment}</div>
                <a href={student.detailsLink} className="view-details">View Details</a>
              </div>
            ))}
          </div>
          <button className="scroll-button right" onClick={scrollRight}>&gt;</button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default InstituteHome;
