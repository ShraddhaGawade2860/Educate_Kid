import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import Menu from '../menu/Menu';
import './scholarshiplist.css';

const Scholarshiplist = () => {
  const { state } = useParams(); // Get state from URL
  const [menuOpen, setMenuOpen] = useState(false);
  const [scholarships, setScholarships] = useState([]);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const goToHome = () => {
    navigate(`/adminhome/${state}`);
  };

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const response = await fetch(`http://192.168.143.199:5000/api/scholarships/bystate/${state}`);
        const data = await response.json();
        if (response.ok) {
          setScholarships(data);
        } else {
          console.error('Failed to fetch scholarships:', data.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchScholarships();
  }, [state]);

  return (
    <div className={`scholarship-list-dashboard ${menuOpen ? 'menu-expanded' : ''}`}>
      <Menu isExpanded={menuOpen} toggleMenu={toggleMenu} />
      <div className={`main-content ${menuOpen ? 'menu-expanded' : ''}`}>
        <div className="top-bar">
          <div className="welcome">
            Scholarship List
          </div>
          <div className="icons">
            <FaHome className="icon" onClick={goToHome} />
          </div>
        </div>

        <div className="scholarship-list">
          {scholarships.map((scholarship, index) => (
            <div key={index} className="scholarship-item">
              <h3>{scholarship.name}</h3>
              <p>{scholarship.description}</p>
              {/* Add more details as needed */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Scholarshiplist;
