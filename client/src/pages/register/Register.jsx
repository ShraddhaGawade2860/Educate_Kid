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
        state: '', // New field for institute
        institutename: '', // New field for institute name
    });
    const [error, setError] = useState('');
    const [formType, setFormType] = useState('user'); // user or institute
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmpassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const url = 'http://localhost:5000/api/users/register';
            const data = {
                ...formData,
                role: formType === 'user' ? 0 : 1, // Set role based on form type
            };

            const response = await axios.post(url, data);
            alert('Registration successful! Please log in.');
            navigate("/login");
        } catch (error) {
            setError('Registration failed: ' + (error.response ? error.response.data.msg : error.message));
        }
    };

    const toggleFormType = (type) => {
        setFormType(type);
        // Clear form data when toggling
        setFormData({
            name: '',
            email: '',
            contactnumber: '',
            password: '',
            confirmpassword: '',
            state: '',
            institutename: '', // Clear institute name when toggling
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
                                    placeholder="Institute Name"
                                    name="institutename"
                                    onChange={handleChange}
                                    value={formData.institutename}
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

    //waste
};

export default Signup;
