import React, { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contactnumber: '',
        password: '',
        confirmpassword: '',
        state: '',
        institutecode: '',
    });
    const [files, setFiles] = useState({
        instituteCertificate: null,
        accreditationCertificate: null,
        affiliationCertificate: null,
    });
    const [error, setError] = useState('');
    const [formType, setFormType] = useState('user');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFiles({ ...files, [e.target.name]: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmpassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const url = 'http://localhost:5000/api/users/register';
            const data = new FormData();
            Object.keys(formData).forEach((key) => {
                data.append(key, formData[key]);
            });
            Object.keys(files).forEach((key) => {
                data.append(key, files[key]);
            });
            data.append('role', formType === 'user' ? 0 : 1);
            data.append('verified', formType === 'user' ? true : false);

            const response = await axios.post(url, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Registration successful! Please log in.');
            navigate("/login");
        } catch (error) {
            setError('Registration failed: ' + (error.response ? error.response.data.msg : error.message));
        }
    };

    const toggleFormType = (type) => {
        setFormType(type);
        setFormData({
            name: '',
            email: '',
            contactnumber: '',
            password: '',
            confirmpassword: '',
            state: '',
            institutecode: '',
        });
        setFiles({
            instituteCertificate: null,
            accreditationCertificate: null,
            affiliationCertificate: null,
        });
        setError('');
    };

    return (
        <div className={styles.signup_container}>
            <div className={styles.signup_form_container}>
                <div className={styles.left}>
                    <h1>Welcome Back</h1>
                    <Link to="/login">
                        <button type="button" className={styles.white_btn}>
                            Sign in
                        </button>
                    </Link>
                </div>
                <div className={styles.right}>
                    <h1>Create Account</h1>
                    <div className={styles.toggle_buttons}>
                        <button
                            className={formType === 'user' ? styles.active_toggle : styles.toggle_button}
                            onClick={() => toggleFormType('user')}
                        >
                            User
                        </button>
                        <button
                            className={formType === 'institute' ? styles.active_toggle : styles.toggle_button}
                            onClick={() => toggleFormType('institute')}
                        >
                            Institute
                        </button>
                    </div>
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Name"
                            name="name"
                            onChange={handleChange}
                            value={formData.name}
                            required
                            className={styles.input}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={handleChange}
                            value={formData.email}
                            required
                            className={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="Contact Number"
                            name="contactnumber"
                            onChange={handleChange}
                            value={formData.contactnumber}
                            required
                            className={styles.input}
                        />
                        {formType === 'institute' && (
                            <>
                                <input
                                    type="text"
                                    placeholder="State"
                                    name="state"
                                    onChange={handleChange}
                                    value={formData.state}
                                    required
                                    className={styles.input}
                                />
                                <input
                                    type="text"
                                    placeholder="Institute Code"
                                    name="institutecode"
                                    onChange={handleChange}
                                    value={formData.institutecode}
                                    required
                                    className={styles.input}
                                />
                                <input
                                    type="file"
                                    name="instituteCertificate"
                                    onChange={handleFileChange}
                                    required
                                    className={styles.input}
                                />
                                <input
                                    type="file"
                                    name="accreditationCertificate"
                                    onChange={handleFileChange}
                                    required
                                    className={styles.input}
                                />
                                <input
                                    type="file"
                                    name="affiliationCertificate"
                                    onChange={handleFileChange}
                                    required
                                    className={styles.input}
                                />
                            </>
                        )}
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                            value={formData.password}
                            required
                            className={styles.input}
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="confirmpassword"
                            onChange={handleChange}
                            value={formData.confirmpassword}
                            required
                            className={styles.input}
                        />
                        {error && <div className={styles.error_msg}>{error}</div>}
                        <button type="submit" className={styles.green_btn}>
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
