import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Menu from '../menu/Menu';
import { FaHome } from 'react-icons/fa';
import './instituteverification.module.css';

const InstituteVerification = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [verificationRequests, setVerificationRequests] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const state = localStorage.getItem('state'); // Fetch state from localStorage

        const fetchVerificationRequests = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/verification/requests', {
                    params: { state: state }
                });
                setVerificationRequests(response.data);
            } catch (error) {
                console.error('Error fetching verification requests:', error);
            }
        };

        fetchVerificationRequests();
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const goToHome = () => {
        const state = localStorage.getItem('state'); // Fetch state from localStorage
        navigate(`/adminhome/${state}`);
    };

    const approveInstitute = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/admin/approve/${id}`);
            alert('Institute approved successfully!');
            // Refresh verification requests list after approval
            setVerificationRequests((prevRequests) => prevRequests.filter(req => req._id !== id));
        } catch (error) {
            console.error('Error approving institute:', error);
        }
    };

    const rejectInstitute = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/admin/reject/${id}`);
            alert('Institute rejected successfully!');
            // Refresh verification requests list after rejection
            setVerificationRequests((prevRequests) => prevRequests.filter(req => req._id !== id));
        } catch (error) {
            console.error('Error rejecting institute:', error);
        }
    };

    return (
        <div className={`admin-dashboard ${menuOpen ? 'menu-expanded' : ''}`}>
            <Menu isExpanded={menuOpen} toggleMenu={toggleMenu} />
            <div className={`main-content ${menuOpen ? 'menu-expanded' : ''}`}>
                <div className="top-bar">
                    <div className="welcome">
                        Institute Verification Requests
                    </div>
                    <div className="icons">
                        <FaHome className="icon" onClick={goToHome} />
                    </div>
                </div>
                <div className="verification-requests-list">
                    {verificationRequests.length === 0 ? (
                        <p>No pending verification requests.</p>
                    ) : (
                        verificationRequests.map((req) => (
                            <div key={req._id} className="verification-request-box">
                                <p><strong>Name:</strong> {req.name}</p>
                                <p><strong>Email:</strong> {req.email}</p>
                                <p><strong>Contact Number:</strong> {req.contactnumber}</p>
                                <p><strong>State:</strong> {req.state}</p>
                                <p><strong>Institute Code:</strong> {req.institutecode}</p>
                                <button onClick={() => approveInstitute(req._id)}>Approve</button>
                                <button onClick={() => rejectInstitute(req._id)}>Reject</button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default InstituteVerification;
