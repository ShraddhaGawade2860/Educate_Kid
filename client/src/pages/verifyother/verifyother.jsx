import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaHome } from 'react-icons/fa';
import Menu from '../menu/Menu';
import { useNavigate, useParams } from 'react-router-dom';
import './verifyother.css';

const VerifyOther = () => {
  const { formId } = useParams();
  const [form, setForm] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [state, setState] = useState('');
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Get state from local storage
    const fetchedState = JSON.parse(localStorage.getItem('user')).state || '';
    setState(fetchedState);

    const fetchForm = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/forms/${formId}`);
        setForm(response.data);
      } catch (error) {
        console.error('Error fetching form:', error);
      }
    };

    fetchForm();
  }, [formId]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const goToHome = () => {
    navigate(`/adminhome/${state}`);
  };

  const handleApprove = async () => {
    try {
      await axios.put(`http://localhost:5000/api/forms/otherstate/${formId}/approve`);
      alert('Form approved');
      navigate(`/studentlist/${state}?toggle=other`); // Redirect to student list after approval
    } catch (error) {
      console.error('Error approving form:', error);
    }
  };

  const handleReject = async () => {
    try {
      await axios.put(`http://localhost:5000/api/forms/otherstate/${formId}/reject`, { rejectReason });
      alert('Form rejected');
      navigate(`/studentlist/${state}?toggle=other`); // Redirect to student list after rejection
    } catch (error) {
      console.error('Error rejecting form:', error);
    }
  };

  return (
    <div className={`verify-other ${menuOpen ? 'menu-expanded' : ''}`}>
      <Menu isExpanded={menuOpen} toggleMenu={toggleMenu} />
      <div className={`main-content ${menuOpen ? 'menu-expanded' : ''}`}>
        <div className="top-bar">
          <div className="welcome">
            {form ? `Welcome, ${form.name}` : 'Loading...'}
          </div>
          <div className="icons">
            <FaHome className="icon" onClick={goToHome} />
          </div>
        </div>
        {form ? (
          <div className="form-details">

            
            <h2>User Details</h2>
            <div className="row">
            <p><strong>Name:</strong> {form.name}</p>
            <p><strong>Email:</strong> {form.email}</p>
            </div>
            <div className="row">
            <p><strong>Course:</strong> {form.course}</p>
            <p><strong>Institution:</strong> {form.institutionName}</p>
            </div>
            <div className="row">
            <p><strong>Date of Birth:</strong> {new Date(form.dateOfBirth).toLocaleDateString()}</p>
            </div>

            <h2>Institution Details</h2>
            <div className="row">
            <p><strong>Institution Name: </strong>{form.institutionName}</p>
            <p><strong>State: </strong>{form.state}</p>
            </div>
            <div className="row">
            <p><strong>Course: </strong>{form.course}</p>
            <p><strong>Year: </strong>{form.year}</p>
            </div>
            <div className="row">
            <p><strong>Enrollment No.: </strong>{form.enrollmentNo}</p>
            <p><strong>Xth Percentage: </strong>{form.xthPercentage}</p>
            </div>
            <div className="row">
            <p><strong>XIIth Percentage: </strong>{form.xiithPercentage}</p>
            <p><strong>UG Percentage:</strong> {form.ugPercentage}</p>
            </div>

            <h2>Address Details</h2>
            <div className="row">
            <p><strong>Address:</strong> {form.address}</p>
            <p><strong>Home State: </strong>{form.homeState}</p>
            </div>
            <div className="row">
            <p><strong>Reason Of Leaving State: </strong>{form.reasonOfLeavingState}</p>
            </div>

            <h2>Scholarship Details</h2>
            <div className="row">
            <p><strong>Scholarship Name: </strong>{form.scholarshipName}</p>
            <p><strong>Reason For Denying Scholarship: </strong>{form.reasonForDenyingScholarship}</p>
            </div>

            <h2>Disability Details</h2>
      
            <p><strong>Disabilities: </strong>{form.disabilities === 'yes' ? 'Yes' : 'No'}</p>
            {form.disabilities === 'yes' && (
              <>
                <p><strong>Disability Details: </strong>{form.disabilityDetails}</p>
                <p><strong>
                  Disability Certificate:</strong>
                  <a href={`http://localhost:5000/${form.disabilityCertificate}`} target="_blank" rel="noopener noreferrer">
                    View Document
                  </a>
                </p>
                
              </>
            )}

            <h2>Upload Documents</h2>
            <div className="row">
            <p><strong>Xth Marksheet:</strong> <a href={`http://localhost:5000/${form.xthMarksheet}`} target="_blank" rel="noopener noreferrer">
              View Document</a></p>
            <p><strong>XIIth Marksheet: </strong><a href={`http://localhost:5000/${form.xiithMarksheet}`} target="_blank" rel="noopener noreferrer">
              View Document</a></p>
              </div>
              <div className="row">
            <p><strong>UG Certificate: </strong><a href={`http://localhost:5000/${form.ugCertificate}`} target="_blank" rel="noopener noreferrer">
              View Document</a></p>
            <p><strong>PG Certificate: </strong><a href={`http://localhost:5000/${form.pgCertificate}`} target="_blank" rel="noopener noreferrer">
              View Document</a></p>
              </div>
              <div className="row">
            <p><strong>Birth Certificate: </strong><a href={`http://localhost:5000/${form.birthCertificate}`} target="_blank" rel="noopener noreferrer">
              View Document</a></p>
            <p><strong>Community Certificate: </strong><a href={`http://localhost:5000/${form.communityCertificate}`} target="_blank" rel="noopener noreferrer">
              View Document</a></p>
              </div>
              <div className="row">
            <p><strong>Aadhar Card: </strong><a href={`http://localhost:5000/${form.aadharCard}`} target="_blank" rel="noopener noreferrer">
              View Document</a></p>
            <p><strong>ID Card: </strong><a href={`http://localhost:5000/${form.idCard}`} target="_blank" rel="noopener noreferrer">
              View Document</a></p>
              </div>
              <div className="row">
            <p><strong>Fee Receipt: </strong><a href={`http://localhost:5000/${form.feeReceipt}`} target="_blank" rel="noopener noreferrer">
              View Document</a></p>
              </div>

              {form.otherStateVerified === 0 && (
              <div className="form-actions">
                <button className="approve-button" onClick={handleApprove}>Approve</button>
                <button className="reject-button" onClick={() => setShowRejectModal(true)}>Reject</button>
              </div>
            )}
            
            {showRejectModal && (
              <div id="rejectModal" className="modal">
                <div className="modal-content">
                  <span className="close" onClick={() => setShowRejectModal(false)}>&times;</span>
                  <h3>Reject Form</h3>
                  <textarea
                    placeholder="Enter rejection reason"
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                  />
                  <button onClick={handleReject}>Submit Rejection</button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <p>Loading form details...</p>
        )}
      </div>
    </div>
  );
};

export default VerifyOther;
