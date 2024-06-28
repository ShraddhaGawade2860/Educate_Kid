import React, { useContext, useState } from 'react';
import './home.css';
import { Link, useNavigate } from 'react-router-dom';
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

const Home = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [classSelection, setClassSelection] = useState("");
  const [genderSelection, setGenderSelection] = useState("");
  const [stateSelection, setStateSelection] = useState("");

  const handleScholarshipClick = () => {
    if (!isLoggedIn) {
      toast.error('Please log in first.');
      return;
    }

    if (!classSelection || !genderSelection || !stateSelection) {
      toast.error('Please fill in the class, gender, and state.');
      return;
    }
    navigate('/view', {
      state: { classSelection, genderSelection, stateSelection }
    });
  };

  const handleLinkClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      toast.error('Please log in first.');
    }
  };

  
  if (!isLoggedIn) {
    navigate('/'); // Redirect to Landing page if not logged in
    return null; // Or render loading spinner/element
  }


  return (
    <div>
      <div className="home-container">
        <div className="content">
          <div className="video-container">
            <video src={mainVideo} alt="Main Banner" autoPlay loop muted />
            <div className="video-content">
              <p>"Welcome To EducateKid Portal. This is India's Largest<br /> Scholarship Platform."</p>
              <div className="dropdowns">
                <div className="horizontal-dropdowns">
                  <div className="dropdown">
                    <label>Select Class</label>
                    <select onChange={(e) => setClassSelection(e.target.value)}>
                      <option value="">Select Class</option>
                      <option value="class10">Class 10</option>
                      <option value="class11">Class 11</option>
                      <option value="class12">Class 12</option>
                      <option value="class8">8</option>
                    </select>
                  </div>
                  <div className="dropdown">
                    <label>Select Gender</label>
                    <select onChange={(e) => setGenderSelection(e.target.value)}>
                      <option value="">Select Gender</option>
                      <option value="male">male</option>
                      <option value="female">female</option>
                      <option value="other">other</option>
                    </select>
                  </div>
                </div>
                <div className="dropdown">
                  <label>Select State</label>
                  <select onChange={(e) => setStateSelection(e.target.value)}>
                    <option value="">Select State</option>
                    <option value="state1">State 1</option>
                    <option value="state2">State 2</option>
                    <option value="state3">State 3</option>
                    <option value="Maharashtra">Maharashtra</option>
                  </select>
                </div>
              </div>
              <div className="buttons4">
                <button4 className="btn4" onClick={handleScholarshipClick}>Check For Scholarships</button4>
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

      <div className="four-box-container2">
        <h3>How it works?</h3>
        <div className="box-frame4">
          <div className="box1" data-number="1">
            <div className="box-content2">
              <img src={icon1} alt="Register Icon" />
              <p>Register and create your profile</p>
              <span>Provide some basic details, fill the form, and get registered with us</span>
            </div>
          </div>
          <div className="box1" data-number="2">
            <div className="box-content2">
              <img src={icon2} alt="Notification Icon" />
              <p>Get notified for matching scholarships</p>
              <span>Get instantly notified as soon as the scholarship will be added to the portal</span>
            </div>
          </div>
          <div className="box1" data-number="3">
            <div className="box-content2">
              <img src={icon3} alt="Apply Icon" />
              <p>Apply for a scholarship</p>
              <span>Apply to the scholarship according to your need and eligibility criteria</span>
            </div>
          </div>
          <div className="box1" data-number="4">
            <div className="box-content2">
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
}

export default Home;
