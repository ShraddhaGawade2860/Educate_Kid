import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './view.css';

const View = () => {
  const { state } = useLocation();
  const { classSelection, genderSelection, stateSelection, typeSelection } = state || {};
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/scholarships?classSelection=${classSelection}&genderSelection=${genderSelection}&stateSelection=${stateSelection}&typeSelection=${typeSelection}`);
        const data = await response.json();

        if (response.ok) {
          setScholarships(data);
        } else {
          console.error('Failed to fetch scholarships:', data);
        }
      } catch (error) {
        console.error('Error fetching scholarships:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchScholarships();
  }, [classSelection, genderSelection, stateSelection, typeSelection]);

  const handleApplyClick = (scholarship) => {
    navigate('/apply', { state: { scholarship } });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="view-container">
      <div className="criteria-and-scholarships">
        <div className="selected-criteria">
          <h3>Selected Criteria</h3>
          <p><strong>Class:</strong> {classSelection}</p>
          <p><strong>Gender:</strong> {genderSelection}</p>
          <p><strong>State:</strong> {stateSelection}</p>
          <p><strong>Scholarship Type:</strong> {typeSelection}</p>
        </div>
        <div className="scholarships-list">
          <h3>Available Scholarships</h3>
          {scholarships.length > 0 ? (
            scholarships.map((scholarship, index) => (
              <div className="scholarship-box1" key={index}>
                <img src={`http://localhost:5000/${scholarship.logo}`} alt={scholarship.name} className="scholarship-logo" />
                <div className="scholarship-detailss">
                  <h6>{scholarship.name}</h6>
                  <p><strong>Benefits:</strong> {scholarship.benefits}</p>
                  <p><strong>Eligibility Criteria:</strong> {scholarship.eligibility}</p>
                  <button className="apply-button1" onClick={() => handleApplyClick(scholarship)}>Apply</button>
                </div>
              </div>
            ))
          ) : (
            <p>No scholarships found for the selected criteria.</p>
          )}
        </div>
      </div>
      <div className="featured-scholarships">
        <h3>Featured Scholarships</h3>
        <div className="scroll-container">
          {scholarships.slice(0, 3).map((scholarship, index) => (
            <div className="featured-scholarship-box" key={index}>
              <div className="featured-scholarship-details">
                <p><strong>{scholarship.name}</strong></p>
                <p><strong>Benefits:</strong> {scholarship.benefits}</p>

                <button className="apply-button" onClick={() => handleApplyClick(scholarship)}>Apply</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default View;
