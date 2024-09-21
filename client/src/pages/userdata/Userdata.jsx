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
        const response = await axios.get(`http://192.168.143.199:5000/api/forms/${formId}`);
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
      await axios.put(`http://192.168.143.199:5000/api/forms/approve/${formId}`);
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
      await axios.put(`http://192.168.143.199:5000/api/forms/reject/${formId}`, { rejectReason });
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
          <div className="row">
          <p><strong>Name: </strong>{formData.name}</p>
          <p><strong>Date Of Birth:</strong> {formData.dateOfBirth}</p>
          </div>
          <div className="row">
          <p><strong>Gender:</strong> {formData.gender}</p>
          <p><strong>Contact No.:</strong> {formData.contactNo}</p>
          </div>
          <div className="row">
          <p><strong>Email: </strong>{formData.email}</p>
          <p><strong>Religion:</strong> {formData.religion}</p>
          </div>

          <h2>Institution Details</h2> 
          <div className="row">
          <p><strong>Institution Name:</strong> {formData.institutionName}</p>
          <p><strong>State: </strong>{formData.state}</p>
          </div>
          
          <div className="row">
          <p><strong>Course: </strong>{formData.course}</p>
          <p><strong>Year: </strong>{formData.year}</p>
          </div>
          
          <div className="row">
          <p><strong>Enrollment No.: </strong>{formData.enrollmentNo}</p>
          <p><strong>Xth Percentage: </strong>{formData.xthPercentage}</p>
          </div>
          
          <div className="row">
          <p><strong>XIIth Percentage: </strong>{formData.xiithPercentage}</p>
          <p><strong>UG Percentage: </strong>{formData.ugPercentage}</p>
          </div>

          <h2>Address Details</h2>
          
          <div className="row">
          <p><strong>Address: </strong>{formData.address}</p>
          <p><strong>Home State: </strong>{formData.homeState}</p>
          </div>
          
          <div className="row">
          <p><strong>Reason Of Leaving State: </strong>{formData.reasonOfLeavingState}</p>
          </div>

          <h2>Scholarship Details</h2>
          
          <div className="row">
          <p><strong>Scholarship Name: </strong>{formData.scholarshipName}</p>
          <p><strong>Reason For Denying Scholarship: </strong>{formData.reasonForDenyingScholarship}</p>
          </div>

          <h2>Disability Details</h2>
          <p><strong>Disabilities:</strong> {formData.disabilities === 'yes' ? 'Yes' : 'No'}</p>
          {formData.disabilities === 'yes' && (
            <>
              <p><strong>Disability Details:</strong> {formData.disabilityDetails}</p>
              <p><strong>
                Disability Certificate:</strong>
                <a href={`http://192.168.143.199:5000/${formData.disabilityCertificate}`} target="_blank" rel="noopener noreferrer">
                  View Document
                </a>
              </p>
            </>
          )}

          <h2>Upload Documents</h2>
          
          <div className="row">
          <p><strong>Xth Marksheet: </strong><a href={`http://192.168.143.199:5000/${formData.xthMarksheet}`} target="_blank" rel="noopener noreferrer">
            View Document</a></p>
          <p><strong>XIIth Marksheet:</strong> <a href={`http://192.168.143.199:5000/${formData.xiithMarksheet}`} target="_blank" rel="noopener noreferrer">
            View Document</a></p>
            </div>
            
          <div className="row">
          <p><strong>UG Certifiate: </strong><a href={`http://192.168.143.199:5000/${formData.ugCertificate}`} target="_blank" rel="noopener noreferrer">
            View Document</a></p>
          <p><strong>PG Certifiate: </strong><a href={`http://192.168.143.199:5000/${formData.pgCertificate}`} target="_blank" rel="noopener noreferrer">
            View Document</a></p>
            </div>
            
          <div className="row">
          <p><strong>Birth Certifiate:</strong> <a href={`http://192.168.143.199:5000/${formData.birthCertificate}`} target="_blank" rel="noopener noreferrer">
            View Document</a></p>
          <p><strong>Community Certifiate: </strong><a href={`http://192.168.143.199:5000/${formData.communityCertificate}`} target="_blank" rel="noopener noreferrer">
            View Document</a></p>
            </div>
            
          <div className="row">
          <p><strong>Aadhar Card: </strong><a href={`http://192.168.143.199:5000/${formData.aadharCard}`} target="_blank" rel="noopener noreferrer">
            View Document</a></p>
          <p><strong>ID Card: </strong> <a href={`http://192.168.143.199:5000/${formData.idCard}`} target="_blank" rel="noopener noreferrer">
            View Document</a></p>
            </div>
            
          <div className="row">
          <p><strong>Fee Receipt: </strong><a href={`http://192.168.143.199:5000/${formData.feeReceipt}`} target="_blank" rel="noopener noreferrer">
            View Document</a></p>
            </div>

          {/* Display form status message based on verification status */}
          {isVerified && <p className="status-message success">Form is verified by institute.</p>}
          {isRejected && <p className="status-message error">Form is rejected by institute.</p>}

          {/* Show actions (approve/reject) for pending forms only */}
          {isPending && (
            <div className="form-actions">
              <button className="approve-button" onClick={handleApprove}>Approve</button>
              <button className="reject-button" onClick={handleReject}>Reject</button>
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
