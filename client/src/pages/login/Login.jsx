import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from "./styles.module.css";
import { AuthContext } from '../context/Authcontext';

//deepa

const Login = () => {
    const [data, setData] = useState({ identifier: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!data.identifier || !data.password) {
            setError("Please fill out all fields.");
            return;
        } else {
            setError("");
            try {
                const url = 'http://localhost:5000/api/users/login';
                
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ identifier: data.identifier, password: data.password })
                });
                const result = await response.json();
                if (response.ok) {
                    if (result.role === 1 && !result.verified) {
                        setError(result.rejected ? 
                                 "Admin rejected your form, please register again with correct information." : 
                                 "Your account is pending admin approval. Please wait for verification.");
                        return;
                    }
                    login(result);
                    toast.success("Login successful!");
                    localStorage.setItem('user', JSON.stringify(result)); // Save user information in local storage
                    setTimeout(() => {
                        if (result.role === 0) {
                            navigate('/');
                        } else if (result.role === 1) {
                            navigate('/institutehome');
                        } else if (result.role === 2) {
                            localStorage.setItem('state', result.state);
                            navigate(`/adminhome/${result.state}`); // Redirect to adminhome with state parameter
                        }
                    }, 2000);
                } else {
                    setError(result.msg);
                }
            } catch (error) {
                console.error('Error:', error);
                setError('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div className={styles.login_container}>
            <div className={styles.login_form_container}>
                <div className={styles.left}>
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <h1>Login</h1>
                        <input
                            type="text"
                            placeholder="Email or State"
                            name="identifier"
                            onChange={handleChange}
                            value={data.identifier}
                            required
                            className={styles.input}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                            value={data.password}
                            required
                            className={styles.input}
                        />
                        {error && <div className={styles.error_msg}>{error}</div>}
                        <button type="submit" className={styles.green_btn}>
                            Sign In
                        </button>
                    </form>
                </div>
                <div className={styles.right}>
                    <h1>New Here?</h1>
                    <Link to="/signup">
                        <button type="button" className={styles.white_btn}>
                            Sign Up
                        </button>
                    </Link>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
