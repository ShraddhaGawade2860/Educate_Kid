import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaHome } from 'react-icons/fa';
import Menu from '../menu/Menu';
import { useNavigate, useParams } from 'react-router-dom';
import './userdata.css';

const UserData = () => {
  const { formId } = useParams();
  const [formData, setFormData] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectReasonBox, setShowRejectReasonBox] = useState(false);
  const [formStatusMessage, setFormStatusMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/forms/${formId}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching form data:', error);
      }
    };

    fetchFormData();
  }, [formId]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const goToHome = () => {
    navigate(`/institutehome`);
  };

  const handleApprove = async () => {
    try {
      await axios.put(`http://localhost:5000/api/forms/approve/${formId}`);
      setFormStatusMessage('Form approved successfully');
      setShowModal(true);
    } catch (error) {
      console.error('Error approving form:', error);
    }
  };

  const handleReject = async () => {
    setShowRejectReasonBox(true);
  };

  const submitRejectReason = async () => {
    try {
      await axios.put(`http://localhost:5000/api/forms/reject/${formId}`, { rejectReason });
      setFormStatusMessage('Form rejected successfully');
      setShowModal(true);
    } catch (error) {
      console.error('Error rejecting form:', error);
    }
    setShowRejectReasonBox(false);
  };

  const closeModal = () => {
    setShowModal(false);
    navigate('/studentverification');
  };

  if (!formData) {
    return <p>Loading...</p>; // Display loading spinner or message
  }

  // Determine if the form is pending, verified, or rejected
  const isPending = !formData.instituteVerified;
  const isVerified = formData.instituteVerified === 1;
  const isRejected = formData.instituteVerified === 2;

  return (
    <div className={`user-data-container ${menuOpen ? 'menu-expanded' : ''}`}>
      <Menu isExpanded={menuOpen} toggleMenu={toggleMenu} />
      <div className={`main-content ${menuOpen ? 'menu-expanded' : ''}`}>
        <div className="top-bar">
          <div className="welcome">
            Student Verification
          </div>
          <div className="icons">
            <FaHome className="icon" onClick={goToHome} />
          </div>
        </div>
        <div className="user-data">
          <h2>Personal Information</h2>
          <p>Name: {formData.name}</p>
          <p>Date Of Birth: {formData.dateOfBirth}</p>
          <p>Gender: {formData.gender}</p>
          <p>Contact No.: {formData.contactNo}</p>
          <p>Email: {formData.email}</p>
          <p>Religion: {formData.religion}</p>

          <h2>Institution Details</h2>
          <p>Institution Name: {formData.institutionName}</p>
          <p>State: {formData.state}</p>
          <p>Course: {formData.course}</p>
          <p>Year: {formData.year}</p>
          <p>Enrollment No.: {formData.enrollmentNo}</p>
          <p>Xth Percentage: {formData.xthPercentage}</p>
          <p>XIIth Percentage: {formData.xiithPercentage}</p>
          <p>UG Percentage: {formData.ugPercentage}</p>

          <h2>Address Details</h2>
          <p>Address: {formData.address}</p>
          <p>Home State: {formData.homeState}</p>
          <p>Reason Of Leaving State: {formData.reasonOfLeavingState}</p>

          <h2>Scholarship Details</h2>
          <p>Scholarship Name: {formData.scholarshipName}</p>
          <p>Reason For Denying Scholarship: {formData.reasonForDenyingScholarship}</p>

          <h2>Disability Details</h2>
          <p>Disabilities: {formData.disabilities === 'yes' ? 'Yes' : 'No'}</p>
          {formData.disabilities === 'yes' && (
            <>
              <p>Disability Details: {formData.disabilityDetails}</p>
              <p>
                Disability Certificate:
                <a href={`http://localhost:5000/${formData.disabilityCertificate}`} target="_blank" rel="noopener noreferrer">
                  View Document
                </a>
              </p>
            </>
          )}

          <h2>Upload Documents</h2>
          <p>Xth Marksheet: <a href={`http://localhost:5000/${formData.xthMarksheet}`} target="_blank" rel="noopener noreferrer">
            View Document</a></p>
          <p>XIIth Marksheet: <a href={`http://localhost:5000/${formData.xiithMarksheet}`} target="_blank" rel="noopener noreferrer">
            View Document</a></p>
          <p>UG Certifiate: <a href={`http://localhost:5000/${formData.ugCertificate}`} target="_blank" rel="noopener noreferrer">
            View Document</a></p>
          <p>PG Certifiate: <a href={`http://localhost:5000/${formData.pgCertificate}`} target="_blank" rel="noopener noreferrer">
            View Document</a></p>
          <p>Birth Certifiate: <a href={`http://localhost:5000/${formData.birthCertificate}`} target="_blank" rel="noopener noreferrer">
            View Document</a></p>
          <p>Community Certifiate: <a href={`http://localhost:5000/${formData.communityCertificate}`} target="_blank" rel="noopener noreferrer">
            View Document</a></p>
          <p>Aadhar Card: <a href={`http://localhost:5000/${formData.aadharCard}`} target="_blank" rel="noopener noreferrer">
            View Document</a></p>
          <p>ID Card: <a href={`http://localhost:5000/${formData.idCard}`} target="_blank" rel="noopener noreferrer">
            View Document</a></p>
          <p>Fee Receipt: <a href={`http://localhost:5000/${formData.feeReceipt}`} target="_blank" rel="noopener noreferrer">
            View Document</a></p>

          {/* Display form status message based on verification status */}
          {isVerified && <p className="status-message">Form is verified by institute.</p>}
          {isRejected && <p className="status-message">Form is rejected by institute.</p>}

          {/* Show actions (approve/reject) for pending forms only */}
          {isPending && (
            <div className="actions">
              <button className="approve-btn" onClick={handleApprove}>Approve</button>
              <button className="reject-btn" onClick={handleReject}>Reject</button>
            </div>
          )}

          {/* Show reject reason box for rejected forms */}
          {showRejectReasonBox && (
            <div className="reject-reason-box">
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Enter rejection reason"
              />
              <button className="submit-reject-btn" onClick={submitRejectReason}>Submit Rejection</button>
            </div>
          )}

          {/* Modal for displaying form status message */}
          {showModal && (
            <div className="modal">
              <div className="modal-content">
                <p>{formStatusMessage}</p>
                <button onClick={closeModal}>OK</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserData;
