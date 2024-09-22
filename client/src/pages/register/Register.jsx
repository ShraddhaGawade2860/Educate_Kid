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
        gender: '' // Added gender field
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
        const { name, value } = e.target;

        if (name === 'contactnumber' && !/^\d*$/.test(value)) {
            // Prevent non-digit characters
            return;
        }

        setFormData({ ...formData, [name]: value });

        if (name === 'contactnumber' && value.length > 10) {
            // Limit contact number to 10 digits
            setFormData({ ...formData, contactnumber: value.slice(0, 10) });
        }
    };

    const handleFileChange = (e) => {
        setFiles({ ...files, [e.target.name]: e.target.files[0] });
    };

    const validateEmail = (email) => {
        const emailPattern = /^[a-zA-Z][a-zA-Z0-9._%+-]*@gmail\.com$/;
        return emailPattern.test(email);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmpassword) {
            setError("Passwords do not match");
            return;
        }

        if (formData.contactnumber.length !== 10) {
            setError("Contact number must be exactly 10 digits");
            return;
        }

        if (!validateEmail(formData.email)) {
            setError("Invalid email format. It should be in lowercase and end with @gmail.com");
            return;
        }

        try {
            const url = 'http://192.168.143.199:5000/api/users/register';
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

            if (response.data.statuscode === 1) {
                alert('Registration successful! Please log in.');
                navigate("/login");
            } else if (response.data.statuscode === 2) {
                setError("User already exists.");
            }
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
            gender: '' // Reset gender field on form type toggle
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
        <div className={`${styles.signup_form_container} ${formType === 'user' ? styles.user_form : styles.institute_form}`}>
            <div className={styles.left}>
                    <h1>Welcome Back</h1>
                    <Link to="/login">
                        <button type="button" className={styles.sign_in_btn}>
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
                    {formType === 'institute' && (
    <p className={styles.upload_notice}>
        Please upload the institute certificate, accreditation certificate, and affiliation certificate.
    </p>
)}
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <input
                            type="texti"
                            placeholder="Name"
                            name="name"
                            onChange={handleChange}
                            value={formData.name}
                            required
                            className={styles.input}
                        />
                        <input
                            type="emaili"
                            placeholder="Email"
                            name="email"
                            onChange={handleChange}
                            value={formData.email}
                            required
                            className={styles.input}
                        />
                        <input
                            type="texti"
                            placeholder="Contact Number"
                            name="contactnumber"
                            onChange={handleChange}
                            value={formData.contactnumber}
                            required
                            className={styles.input}
                        />
                        {formType === 'user' && (
                            <select
                                name="gender"
                                onChange={handleChange}
                                value={formData.gender}
                                required
                                className={styles.gender_select} // Updated class for select input
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        )}
                        {formType === 'institute' && (
                            <>
                                <input
                                    type="texti"
                                    placeholder="State"
                                    name="state"
                                    onChange={handleChange}
                                    value={formData.state}
                                    required
                                    className={styles.input}
                                />
                                <input
                                    type="texti"
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
                                    className={styles.institute_certificate_input}  // Changed class name

                                />
                                <input
                                    type="file"
                                    name="accreditationCertificate"
                                    onChange={handleFileChange}
                                    required
                                    className={styles.accreditation_certificate_input} 
                                />
                                <input
                                    type="file"
                                    name="affiliationCertificate"
                                    onChange={handleFileChange}
                                    required
                                    className={styles.affiliation_certificate_input}
                                />
                            </>
                        )}
                        <input
                            type="passwordi"
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                            value={formData.password}
                            required
                            className={styles.input}
                        />
                        <input
                            type="passwordi"
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
