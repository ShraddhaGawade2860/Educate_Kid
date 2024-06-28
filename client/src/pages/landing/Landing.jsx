import React, { useContext } from 'react';
import './landing.css';
import { Link , Navigate} from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import mainVideo from "../video/home.mp4"; 
import scholarshipLogo from "../image/graduation-cap.png";
import icon1 from "../image/icon1.jpg";
import icon2 from "../image/icon2.jpg";
import icon3 from "../image/icon3.jpg";
import icon4 from "../image/icon4.jpg";
import goingmerry from "../image/goingmerry.png";
import fastweb from "../image/fastweb.png";
import petersons from "../image/petersons.jpg";
import niche from "../image/niche.jpg";
import bold from "../image/bold.jpg";
import chegg from "../image/chegg.jpeg";
import cappex from "../image/cappex.jpeg";
import future from "../image/future.png";
import { AuthContext } from '../context/Authcontext';

const Landing = () => {
  const { isLoggedIn } = useContext(AuthContext);

  const handleLinkClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      toast.error('Please log in first.');
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/home" />; // Redirect to Home page if logged in
  }

  return (
    <div>
      <div className="home-container">
        <div className="content">
          <div className="video-container">
            <video src={mainVideo} alt="Main Banner" autoPlay loop muted />
            <div className="video-content1">
              <p>"Welcome To EducateKid Portal. This is India's Largest<br /> Scholarship Platform."</p>
              <div className="search-bar">
                <input type="text" placeholder="Search for scholarships..." />
                <button>Search</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="additional-container">
        <h3 className="centered">Latest News</h3>
        <div className="box-frame">
          <div className="left-side">
            <h5>Notice Board</h5>
            <div className="notification-list">
              <ul className="noticeBoard_marquee__2rfdx">
                <li><p>Notification 1</p></li>
                <li><p>Notification 2</p></li>
                <li><p>Notification 3</p></li>
              </ul>
            </div>
          </div>

          <div className="right-side">
            <div className="scholarship-heading">
              <h5>Scholarships</h5>
            </div>

            <div className="slider-container">
              {/* Scholarship Box 1 */}
              <div className="scholarship-box">
                <img src={scholarshipLogo} alt="Scholarship Logo" />
                <div className="scholarship-details">
                  <h6>Scholarship Name 1</h6>
                  <p>Deadline: June 30, 2024</p>
                </div>
                <Link to="/apply" onClick={handleLinkClick}>View Details</Link>
              </div>
              {/* Scholarship Box 2 */}
              <div className="scholarship-box">
                <img src={scholarshipLogo} alt="Scholarship Logo" />
                <div className="scholarship-details">
                  <h6>Scholarship Name 2</h6>
                  <p>Deadline: July 15, 2024</p>
                </div>
                <Link to="/apply" onClick={handleLinkClick}>View Details</Link>
              </div>
              {/* Scholarship Box 3 */}
              <div className="scholarship-box">
                <img src={scholarshipLogo} alt="Scholarship Logo" />
                <div className="scholarship-details">
                  <h6>Scholarship Name 3</h6>
                  <p>Deadline: July 15, 2024</p>
                </div>
                <Link to="/apply" onClick={handleLinkClick}>View Details</Link>
              </div> 
              {/* Scholarship Box 4 */}
              <div className="scholarship-box">
                <img src={scholarshipLogo} alt="Scholarship Logo" />
                <div className="scholarship-details">
                  <h6>Scholarship Name 4</h6>
                  <p>Deadline: July 15, 2024</p>
                </div>
                <Link to="/apply" onClick={handleLinkClick}>View Details</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Us Information Slider */}
      <div className="about-us-slider">
        <h3>About Us</h3>
        <div className="slider-container">
          {/* About Us Slider Items */}
          <div className="slider-item">
            <h4>Our Mission</h4>
            <p>To provide easy access to scholarships for all students in India.</p>
          </div>
          <div className="slider-item">
            <h4>Our Vision</h4>
            <p>Empowering students to achieve their academic goals through financial support.</p>
          </div>
          <div className="slider-item">
            <h4>Our Values</h4>
            <p>Integrity, Excellence, Inclusivity, and Innovation.</p>
          </div>
        </div>
      </div>

      <div className="four-box-container5">
        <h3>How it works?</h3>
        <div className="box-frame2">
          <div className="box6" data-number="1">
            <div className="box-content8">
              <img src={icon1} alt="Register Icon" />
              <p>Register and create your profile</p>
              <span>Provide some basic details, fill the form, and get registered with us</span>
            </div>
          </div>
          <div className="box6" data-number="2">
            <div className="box-content8">
              <img src={icon2} alt="Notification Icon" />
              <p>Get notified for matching scholarships</p>
              <span>Get instantly notified as soon as the scholarship will be added to the portal</span>
            </div>
          </div>
          <div className="box6" data-number="3">
            <div className="box-content8">
              <img src={icon3} alt="Apply Icon" />
              <p>Apply for a scholarship</p>
              <span>Apply to the scholarship according to your need and eligibility criteria</span>
            </div>
          </div>
          <div className="box6" data-number="4">
            <div className="box-content8">
              <img src={icon4} alt="Verify Icon" />
              <p>Get verified for scholarship</p>
              <span>Check the verification status and get verified for the scholarship you applied for</span>
            </div>
          </div>
        </div>
      </div>

      <div className="link-box-container">
        <h3>Scholarship Articles</h3>
        <div className="link-box-frame">
          <div className="link-box">
            <a href="https://www.example1.com" target="_blank" rel="noopener noreferrer" onClick={handleLinkClick}>
              <img src={goingmerry} alt="Link 1" />
              <p>Going Merry</p>
            </a>
          </div>
          <div className="link-box">
            <a href="https://www.example2.com" target="_blank" rel="noopener noreferrer" onClick={handleLinkClick}>
              <img src={fastweb} alt="Link 2" />
              <p>Fastweb</p>
            </a>
          </div>
          <div className="link-box">
            <a href="https://www.example3.com" target="_blank" rel="noopener noreferrer" onClick={handleLinkClick}>
              <img src={petersons} alt="Link 3" />
              <p>Peterson's</p>
            </a>
          </div>
          <div className="link-box">
            <a href="https://www.example4.com" target="_blank" rel="noopener noreferrer" onClick={handleLinkClick}>
              <img src={niche} alt="Link 4" />
              <p>Niche</p>
            </a>
          </div>
          <div className="link-box">
            <a href="https://www.example5.com" target="_blank" rel="noopener noreferrer" onClick={handleLinkClick}>
              <img src={bold} alt="Link 5" />
              <p>Bold</p>
            </a>
          </div>
          <div className="link-box">
            <a href="https://www.example6.com" target="_blank" rel="noopener noreferrer" onClick={handleLinkClick}>
              <img src={chegg} alt="Link 6" />
              <p>Chegg</p>
            </a>
          </div>
          <div className="link-box">
            <a href="https://www.example7.com" target="_blank" rel="noopener noreferrer" onClick={handleLinkClick}>
              <img src={cappex} alt="Link 7" />
              <p>Cappex</p>
            </a>
          </div>
          <div className="link-box">
            <a href="https://www.example8.com" target="_blank" rel="noopener noreferrer" onClick={handleLinkClick}>
              <img src={future} alt="Link 8" />
              <p>Future</p>
            </a>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Landing;
