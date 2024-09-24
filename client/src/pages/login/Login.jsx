import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from "./styles.module.css";
import { AuthContext } from '../context/Authcontext';

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
    setError(''); // Clear previous errors

    if (!data.identifier || !data.password) {
      setError("Please fill out all fields.");
      return;
    }
    
    try {
      console.log('Sending login request with data:', data); // Log request data

      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier: data.identifier,
          password: data.password,
        }),
      });

      const result = await response.json();

      console.log('Login response:', result); // Log response data

      if (response.ok) {
        if (result.role === 1 && !result.verified) {
          setError(result.rejected ? 
                   "Admin rejected your form, please register again with correct information." : 
                   "Your account is pending admin approval. Please wait for verification.");
          return;
        }

        login(result); // Store user data in AuthContext
        toast.success("Login successful!");
        setTimeout(() => {
          if (result.role === 0) {
            navigate('/');
          } else if (result.role === 1) {
            navigate('/institutehome');
          } else if (result.role === 2) {
            localStorage.setItem('state', result.state);
            navigate(`/adminhome/${result.state}`);
          }
        }, 2000);
      } else {
        setError(result.msg || "Invalid credentials");
      }
    } catch (error) {
      console.error('Login error:', error); // Debug statement
      setError('An error occurred. Please try again.');
    }
};


  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Login</h1>
            <input
              type="textii"
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
          <Link to="/register">
            <button type="button" className={styles.sign_up_btn}>
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
