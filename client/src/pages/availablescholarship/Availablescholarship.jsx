import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import Menu from '../menu/Menu';
import './availablescholarship.css';

const AvailableScholarship = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scholarships, setScholarships] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const goToHome = () => {
    navigate(`/institutehome`);
  };

  useEffect(() => {
    // Fetch scholarships based on selectedState
    const fetchScholarships = async () => {
      if (selectedState) {
        try {
          const response = await fetch(`http://localhost:5000/api/scholarships/bystate/${selectedState}`);
          const data = await response.json();
          if (response.ok) {
            setScholarships(data);
          } else {
            console.error('Failed to fetch scholarships:', data.message);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };

    fetchScholarships();
  }, [selectedState]);

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  return (
    <div className={`available-scholarship-dashboard ${menuOpen ? 'menu-expanded' : ''}`}>
      <Menu isExpanded={menuOpen} toggleMenu={toggleMenu} />
      <div className={`main-content ${menuOpen ? 'menu-expanded' : ''}`}>
        <div className="top-bar">
          <div className="welcome">
            Available Scholarships
          </div>
          <div className="icons">
            <FaHome className="icon" onClick={goToHome} />
          </div>
        </div>
        
        <div className="state-select">
          <label htmlFor="stateSelect">Select State:</label>
          <select id="stateSelect" onChange={handleStateChange} value={selectedState}>
            <option value="">Select State</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
            <option value="Assam">Assam</option>
            <option value="Bihar">Bihar</option>
            <option value="Chhattisgarh">Chhattisgarh</option>
            <option value="Goa">Goa</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Haryana">Haryana</option>
            <option value="Himachal Pradesh">Himachal Pradesh</option>
            <option value="Jharkhand">Jharkhand</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Kerala">Kerala</option>
            <option value="Madhya Pradesh">Madhya Pradesh</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Manipur">Manipur</option>
            <option value="Meghalaya">Meghalaya</option>
            <option value="Mizoram">Mizoram</option>
            <option value="Nagaland">Nagaland</option>
            <option value="Odisha">Odisha</option>
            <option value="Punjab">Punjab</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Sikkim">Sikkim</option>
            <option value="TamilNadu">TamilNadu</option>
            <option value="Telangana">Telangana</option>
            <option value="Tripura">Tripura</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Uttarakhand">Uttarakhand</option>
            <option value="West Bengal">West Bengal</option>
          </select>
        </div>
        
        <div className="scholarship-list">
          {scholarships.length > 0 ? (
            scholarships.map((scholarship, index) => (
              <div key={index} className="scholarship-item">
                <h3>{scholarship.name}</h3>
                <p>{scholarship.description}</p>
                {/* Add more details as needed */}
              </div>
            ))
          ) : (
            <p>No scholarships available for selected state</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AvailableScholarship;
