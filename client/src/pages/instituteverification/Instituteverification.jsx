import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Menu from '../menu/Menu';
import { FaHome } from 'react-icons/fa';
import './instituteverification.module.css'; // Reuse the same styles

const InstituteVerification = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [institutes, setInstitutes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInstitutes = async () => {
            try {
                const url = 'http://localhost:5000/api/users/admin/institutes';
                const response = await axios.get(url);
                setInstitutes(response.data);
            } catch (error) {
                console.error('Error fetching institutes:', error);
            }
        };

        fetchInstitutes();
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const goToHome = () => {
        navigate('/adminhome');
    };

    const approveInstitute = async (id) => {
        try {
            const url = `http://localhost:5000/api/users/admin/approve/${id}`;
            await axios.put(url);
            alert('Institute approved successfully!');
            // Refresh institutes list after approval
            const updatedInstitutes = institutes.filter(inst => inst._id !== id);
            setInstitutes(updatedInstitutes);
        } catch (error) {
            console.error('Error approving institute:', error);
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
                <div className="institutes-list">
                    {institutes.length === 0 ? (
                        <p>No pending institute requests.</p>
                    ) : (
                        institutes.map((inst) => (
                            <div key={inst._id} className="institute-box">
                                <p><strong>Name:</strong> {inst.name}</p>
                                <p><strong>Email:</strong> {inst.email}</p>
                                <p><strong>Contact Number:</strong> {inst.contactnumber}</p>
                                <p><strong>State:</strong> {inst.state}</p>
                                <p><strong>Institute Name:</strong> {inst.institutename}</p>
                                <button onClick={() => approveInstitute(inst._id)}>Approve</button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default InstituteVerification;
