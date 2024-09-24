import React, { useContext, useState, useEffect } from 'react';
import './home.css';
import { useNavigate } from 'react-router-dom';
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
import axios from 'axios';
import rimc from "../image/brambedker.jpg";
import airtel from "../image/begum.png";
import eklavya from "../image/brambedker.jpg";
import cultural from "../image/brambedker.jpg";
import primary from "../image/brambedker.jpg";
import home from "../image/home.jpg";

const Home = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [classSelection, setClassSelection] = useState("");
  const [genderSelection, setGenderSelection] = useState("");
  const [stateSelection, setStateSelection] = useState("");
  const [typeSelection, setTypeSelection] = useState('');
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/notifications');
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const handleScholarshipClick = () => {
    if (!isLoggedIn) {
      toast.error('Please log in first.');
      return;
    }

    if (!classSelection || !genderSelection || !stateSelection || !typeSelection) {
      toast.error('Please fill in all the required fields.');
      return;
    }

    navigate('/view', {
      state: { classSelection, genderSelection, stateSelection, typeSelection }
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
          <img src={home} alt="home" />
            <div className="video-content">
              <p>"Welcome To EducateKid Portal. This is India's Largest<br /> Scholarship Platform."</p>
              <div className="dropdowns">
                <div className="horizontal-dropdowns">` 
                  <div className="dropdown">
                  <label>Select Scholarship Type</label>
                  <select onChange={(e) => setTypeSelection(e.target.value)}>
                    <option value="">Select Scholarship Type</option>
                    <option value="Merit-Based Scholarships">Merit-Based Scholarships</option>
                    <option value="Need-Based Scholarships">Need-Based Scholarships</option>
                    <option value="Athletic Scholarships">Athletic Scholarships</option>
                    <option value="Minority Scholarships">Minority Scholarships</option>
                    <option value="Subject-Specific Scholarships">Subject-Specific Scholarships</option>
                    <option value="Community Service Scholarships">Community Service Scholarships</option>
                    <option value="Creative Scholarships">Creative Scholarships</option>
                    <option value="Leadership Scholarships">Leadership Scholarships</option>
                    <option value="Military Scholarships">Military Scholarships</option>
                    <option value="International Scholarships">International Scholarships</option>
                    <option value="Research Scholarships">Research Scholarships</option>
                    <option value="Women’s Scholarships">Women’s Scholarships</option>
                    <option value="Disability Scholarships">Disability Scholarships</option>
                    <option value="Employer-Sponsored Scholarships">Employer-Sponsored Scholarships</option>
                    <option value="University-Specific Scholarships">University-Specific Scholarships</option>
                    <option value="Government Scholarships">Government Scholarships</option>
                    <option value="Sports Scholarships">Sports Scholarships</option>
                    <option value="Cultural Scholarships">Cultural Scholarships</option>
                    <option value="STEM Scholarships">STEM Scholarships</option>
                    <option value="Trade or Vocational Scholarships">Trade or Vocational Scholarships</option>
                    <option value="Overseas">Overseas</option>

                  </select>
                  </div>
                  <div className="dropdown">
                  <label>Select Class</label>
                    <select onChange={(e) => setClassSelection(e.target.value)}>
                      <option value="">Select Class</option>
                      <option value="class10">Class 10</option>
                      <option value="class9">Class 9</option>
                      <option value="class11">Class 11</option>
                      <option value="class12">Class 12</option>
                      <option value="class8">Class 8</option>
                      <option value="class1-10">Class 1 to 10</option>
                      <option value="class11 & above">Class 11 & above</option>
                      <option value="Post-matric">Post-matric</option>
                      <option value="Diploma">Diploma</option>
                      <option value="Btech/BE">Btech/BE</option>
                      <option value="BSc">BSc</option>
                      <option value="BBA">BBA</option>
                      <option value="B.com">B.com</option>
                      <option value="BA">BA</option>
                      <option value="Mtech">Mtech</option>
                      <option value="MSc">MSc</option>
                      <option value="MBA">MBA</option>
                      <option value="MA">MA</option>
                      <option value="PhD">PhD</option>
                      <option value="PostDoctoral">PostDoctoral</option>
                       <option value="All class">All class</option>
                    </select>
                  </div>
                </div>
                <div className="horizontal-dropdowns">
                <div className="dropdownn">
                <label>Select Gender</label>
                    <select onChange={(e) => setGenderSelection(e.target.value)}>
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="all">All</option>
                    </select>
                </div>
                <div className="dropdowni">
                <label>Select State</label>
                  <select onChange={(e) => setStateSelection(e.target.value)}>
                    <option value="">Select State</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                    <option value="Assam">Assam</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Chhattisgarh">Chhattisgarh</option>
                    <option value="Goa">Goa</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Manipur">Manipur</option>
                    <option value="Meghalaya">Meghalaya</option>
                    <option value="Mizoram">Mizoram</option>
                    <option value="Nagaland">Nagaland</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Sikkim">Sikkim</option>
                    <option value="TamilNadu">Tamil Nadu</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Tripura">Tripura</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Uttarakhand">Uttarakhand</option>
                    <option value="West Bengal">West Bengal</option>
                  </select>
                </div>
                </div>
              </div>
              <div className="buttons4">
                <button className="btn4" onClick={handleScholarshipClick}>Check For Scholarships</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="additional-container6">
        <h3 className="centered">Latest News</h3>
        <div className="box-frame">
        <div className="left-side">
            <h5>Notice Board</h5>
            <div className="notification-list">
              <ul className="noticeBoard_marquee__2rfdx">
              <li><p>New Scholarships Added</p></li>
                <li><p>R. I. M. C. Dehradun Scholarship, Maharashtra added by Maharashtra State</p></li>
                <li><p>Check for new scholarships and your verification status</p></li>
                <li><p>Kindly check your new scholarships continuously and also check your verification status</p></li>
              </ul>
            </div>
          </div>
        
        
          <div className="right-side1">
            <div className="scholarship-headingi">
              <h5>Scholarships</h5>
            </div>
          
            <div className="slider-containeri">
              {/* Scholarship Box 1 */}
              <div className="scholarship-boxe">
              <img src={rimc} alt="rimc" />
                <div className="scholarship-details">
                  <h6>Dr.B.R.Ambedker Scholarship for EBS, Tripura</h6>
                </div>
              </div>
              {/* Scholarship Box 2 */}
              <div className="scholarship-boxe">
              <img src={airtel} alt="airtel" />
                <div className="scholarship-details">
                  <h6>"Begum Hazrat Mahal National Scholarship"</h6>
                 
                </div>
              </div>
              {/* Scholarship Box 3 */}
              <div className="scholarship-boxe">
              <img src={eklavya} alt="eklavya" />
                <div className="scholarship-details">
                  <h6>"R.I.M.C. Dehradun Scholarship Maharashtra"</h6>
                 
                </div>
              </div> 
              {/* Scholarship Box 4 */}
              <div className="scholarship-boxe">
              <img src={cultural} alt="cultural" />
                <div className="scholarship-details">
                  <h6>Cultural Talent Search Scholarship Scheme 2024-25</h6>
                  
                </div>
              </div>
               {/* Scholarship Box 5 */}
               <div className="scholarship-boxe">
              <img src={primary} alt="primary" />
                <div className="scholarship-details">
                  <h6>Scholarship for primary girl students for BC/EBC Families</h6>
                  
                </div>
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

      {/* Footer Section */}
      <div className="footer">
        <div className="footer-content">
          <p>&copy; 2024 EducateKid. All Rights Reserved.</p>
          <div className="footer-links">
          <a href="/userterms" onClick={handleLinkClick}>Terms of Service</a>
          <a href="/userprivacy" onClick={handleLinkClick}>Privacy Policy</a>          
            </div>
        </div>
      </div>

<ToastContainer />
</div>
  );
}

export default Home;