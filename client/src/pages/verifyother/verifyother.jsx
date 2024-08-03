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
      navigate(`/studentlist/${state}`); // Redirect to student list after approval
    } catch (error) {
      console.error('Error approving form:', error);
    }
  };

  const handleReject = async () => {
    try {
      await axios.put(`http://localhost:5000/api/forms/otherstate/${formId}/reject`, { rejectReason });
      alert('Form rejected');
      navigate(`/studentlist/${state}`); // Redirect to student list after rejection
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
            <p><strong>Name:</strong> {form.name}</p>
            <p><strong>Email:</strong> {form.email}</p>
            <p><strong>Course:</strong> {form.course}</p>
            <p><strong>Institution:</strong> {form.institutionName}</p>
            <p><strong>Date of Birth:</strong> {new Date(form.dateOfBirth).toLocaleDateString()}</p>

            <h2>Institution Details</h2>
            <p>Institution Name: {form.institutionName}</p>
            <p>State: {form.state}</p>
            <p>Course: {form.course}</p>
            <p>Year: {form.year}</p>
            <p>Enrollment No.: {form.enrollmentNo}</p>
            <p>Xth Percentage: {form.xthPercentage}</p>
            <p>XIIth Percentage: {form.xiithPercentage}</p>
            <p>UG Percentage: {form.ugPercentage}</p>

            <h2>Address Details</h2>
            <p>Address: {form.address}</p>
            <p>Home State: {form.homeState}</p>
            <p>Reason Of Leaving State: {form.reasonOfLeavingState}</p>

            <h2>Scholarship Details</h2>
            <p>Scholarship Name: {form.scholarshipName}</p>
            <p>Reason For Denying Scholarship: {form.reasonForDenyingScholarship}</p>

            <h2>Disability Details</h2>
            <p>Disabilities: {form.disabilities === 'yes' ? 'Yes' : 'No'}</p>
            {form.disabilities === 'yes' && (
              <>
                <p>Disability Details: {form.disabilityDetails}</p>
                <p>
                  Disability Certificate:
                  <a href={`http://localhost:5000/${form.disabilityCertificate}`} target="_blank" rel="noopener noreferrer">
                    View Document
                  </a>
                </p>
              </>
            )}

            <h2>Upload Documents</h2>
            <p>Xth Marksheet: <a href={`http://localhost:5000/${form.xthMarksheet}`} target="_blank" rel="noopener noreferrer">
              View Document</a></p>
            <p>XIIth Marksheet: <a href={`http://localhost:5000/${form.xiithMarksheet}`} target="_blank" rel="noopener noreferrer">
              View Document</a></p>
            <p>UG Certificate: <a href={`http://localhost:5000/${form.ugCertificate}`} target="_blank" rel="noopener noreferrer">
              View Document</a></p>
            <p>PG Certificate: <a href={`http://localhost:5000/${form.pgCertificate}`} target="_blank" rel="noopener noreferrer">
              View Document</a></p>
            <p>Birth Certificate: <a href={`http://localhost:5000/${form.birthCertificate}`} target="_blank" rel="noopener noreferrer">
              View Document</a></p>
            <p>Community Certificate: <a href={`http://localhost:5000/${form.communityCertificate}`} target="_blank" rel="noopener noreferrer">
              View Document</a></p>
            <p>Aadhar Card: <a href={`http://localhost:5000/${form.aadharCard}`} target="_blank" rel="noopener noreferrer">
              View Document</a></p>
            <p>ID Card: <a href={`http://localhost:5000/${form.idCard}`} target="_blank" rel="noopener noreferrer">
              View Document</a></p>
            <p>Fee Receipt: <a href={`http://localhost:5000/${form.feeReceipt}`} target="_blank" rel="noopener noreferrer">
              View Document</a></p>

            <div className="actions">
              <button onClick={handleApprove}>Approve</button>
              <button onClick={() => document.getElementById('rejectModal').style.display = 'block'}>Reject</button>
            </div>
            <div id="rejectModal" className="modal">
              <div className="modal-content">
                <span className="close" onClick={() => document.getElementById('rejectModal').style.display = 'none'}>&times;</span>
                <h3>Reject Form</h3>
                <textarea
                  placeholder="Enter rejection reason"
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                />
                <button onClick={handleReject}>Submit Rejection</button>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading form details...</p>
        )}
      </div>
    </div>
  );
};

export default VerifyOther;
