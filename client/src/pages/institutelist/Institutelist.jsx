import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Menu from '../menu/Menu';
import { FaHome } from 'react-icons/fa';
import './institutelist.css';

const InstituteList = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [instituteList, setInstituteList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const state = localStorage.getItem('state'); // Fetch state from localStorage

        const fetchInstituteList = async () => {
            try {
                const response = await axios.get('http://192.168.143.199:5000/api/admin/institutes', {
                    params: { state: state }
                });
                setInstituteList(response.data);
            } catch (error) {
                console.error('Error fetching institute list:', error);
            }
        };

        fetchInstituteList();
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const goToHome = () => {
        const state = localStorage.getItem('state'); // Fetch state from localStorage
        navigate(`/adminhome/${state}`);
    };

    return (
        <div className={`admin-dashboard ${menuOpen ? 'menu-expanded' : ''}`}>
            <Menu isExpanded={menuOpen} toggleMenu={toggleMenu} />
            <div className={`main-content ${menuOpen ? 'menu-expanded' : ''}`}>
                <div className="top-bar">
                    <div className="welcome">
                        Institute List
                    </div>
                    <div className="icons">
                        <FaHome className="icon" onClick={goToHome} />
                    </div>
                </div>
                <div className="institute-list">
                    {instituteList.length === 0 ? (
                        <p>No institutes found.</p>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>Index</th>
                                    <th>Institute Name</th>
                                    <th>Institute Code</th>
                                    <th>Verification Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {instituteList.map((institute, index) => (
                                    <tr key={institute._id}>
                                        <td>{index + 1}</td>
                                        <td>{institute.name}</td>
                                        <td>{institute.institutecode}</td>
                                        <td>{institute.verified ? 'Approved' : 'Rejected'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InstituteList;
