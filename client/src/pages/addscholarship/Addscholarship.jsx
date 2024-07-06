import React, { useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import Menu from '../menu/Menu';
import './addscholarship.css';
import { AuthContext } from '../context/Authcontext'; // Assuming you have an AuthContext

const AddScholarship = () => {
  const { state } = useParams(); // Get state from URL
  const { user } = useContext(AuthContext); // Get user from context
  const [menuOpen, setMenuOpen] = useState(false);
  const [scholarship, setScholarship] = useState({
    name: '',
    description: '',
    eligibility: '',
    benefits: '',
    documents: '',
    applyProcess: '',
    class: '',
    gender: '',
    state: state || user?.state || '' // Set state from URL or user context, default to empty string if undefined
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const goToHome = () => {
    navigate(`/adminhome/${state || user?.state || ''}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setScholarship({ ...scholarship, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/scholarships', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(scholarship)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message); // Assuming backend sends a 'message' field in the response
        setScholarship({
          name: '',
          description: '',
          eligibility: '',
          benefits: '',
          documents: '',
          applyProcess: '',
          class: '',
          gender: '',
          state: state || user?.state || ''
        });
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Failed to add scholarship');
    }
  };

  return (
    <div className={`add-scholarship-dashboard ${menuOpen ? 'menu-expanded' : ''}`}>
      <Menu isExpanded={menuOpen} toggleMenu={toggleMenu} />
      <div className={`main-content ${menuOpen ? 'menu-expanded' : ''}`}>
        <div className="top-bar">
          <div className="welcome">
            Add Scholarship
          </div>
          <div className="icons">
            <FaHome className="icon" onClick={goToHome} />
          </div>
        </div>
        <div className="apply-container">
          <div className="scholarship-info">
            <div className="row">
              <div className="input-group">
                <h3>Class</h3>
                <input type="text" name="class" value={scholarship.class} onChange={handleChange} />
              </div>
              <div className="input-group">
                <h3>Gender</h3>
                <input type="text" name="gender" value={scholarship.gender} onChange={handleChange} />
              </div>
              <div className="input-group">
                <h3>State</h3>
                <input type="text" name="state" value={scholarship.state} onChange={handleChange} readOnly />
              </div>
            </div>

            <h3>Scholarship Name</h3>
            <input type="text" name="name" value={scholarship.name} onChange={handleChange} />

            <h3>About the Scholarship</h3>
            <textarea name="description" value={scholarship.description} onChange={handleChange}></textarea>

            <h3>Eligibility Criteria</h3>
            <textarea name="eligibility" value={scholarship.eligibility} onChange={handleChange}></textarea>

            <h3>Benefits</h3>
            <textarea name="benefits" value={scholarship.benefits} onChange={handleChange}></textarea>

            <h3>Documents Required</h3>
            <textarea name="documents" value={scholarship.documents} onChange={handleChange}></textarea>

            <h3>How to Apply</h3>
            <textarea name="applyProcess" value={scholarship.applyProcess} onChange={handleChange}></textarea>

            <button className="apply-button5" onClick={handleSubmit}>
              Add Scholarship
            </button>
            {message && <p className="message">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddScholarship;
