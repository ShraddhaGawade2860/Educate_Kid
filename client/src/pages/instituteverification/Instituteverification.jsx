import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Menu from '../menu/Menu';
import { FaHome } from 'react-icons/fa';
import styles from './instituteverification.module.css'; // Importing CSS module

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
        <div className={`${styles['admin-dashboard']} ${menuOpen ? styles['menu-expanded'] : ''}`}>
            <Menu isExpanded={menuOpen} toggleMenu={toggleMenu} />
            <div className={`${styles['main-content']} ${menuOpen ? styles['menu-expanded'] : ''}`}>
                <div className={styles['top-bar']}>
                    <div className={styles['welcome']}>
                        Institute Verification Requests
                    </div>
                    <div className={styles['icons']}>
                        <FaHome className={styles['icon']} onClick={goToHome} />
                    </div>
                </div>
                <div className={styles['verification-requests-list']}>
                    {verificationRequests.length === 0 ? (
                        <p>No pending verification requests.</p>
                    ) : (
                        verificationRequests.map((req) => (
                            <div key={req._id} className={styles['verification-request-box']}>
                                <p><strong>Name:</strong> {req.name}</p>
                                <p><strong>Email:</strong> {req.email}</p>
                                <p><strong>Contact Number:</strong> {req.contactnumber}</p>
                                <p><strong>State:</strong> {req.state}</p>
                                <p><strong>Institute Code:</strong> {req.institutecode}</p>
                                <p>
                                    <strong>Institute Certificate:</strong> 
                                    <a href={`http://localhost:5000/${req.instituteCertificate}`} target="_blank" rel="noopener noreferrer">View</a>
                                </p>
                                <p>
                                    <strong>Accreditation Certificate:</strong> 
                                    <a href={`http://localhost:5000/${req.accreditationCertificate}`} target="_blank" rel="noopener noreferrer">View</a>
                                </p>
                                <p>
                                    <strong>Affiliation Certificate:</strong> 
                                    <a href={`http://localhost:5000/${req.affiliationCertificate}`} target="_blank" rel="noopener noreferrer">View</a>
                                </p>
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
