import React from 'react';
import './about.css';
import aboutImage from "../image/about.avif";
import main from "../image/about.png";
import mainimage from "../image/main12.webp";

const About = () => {
    return (
        <div className="about-container">
        <div className="about-content">
            <img src={aboutImage} alt="About Us" className="about-image" />
            <div className="image-content1">
              <h2>About Us</h2>

              </div>
            </div>
            <div class="container">
         <div class="about-content">
         <img src={main} alt="About Us" className="main-image" />
         <div className="text-content">
                        <h1>We are the best choice<br />for your child!!!!</h1>
                        <p>We are here for verifying the scholarship. You can <br/>apply for the scholarship as per the eligibility criteria <br/>and check the verification status in given three stages and finally you can download the verification status.</p>
                    </div>
         </div>
     </div>

     <div class="container1">
     <div className="text-content1">
                        <h1>Vision</h1>
                        <p>
                        Our Scholarships Portal is one-stop solution through which various services 
                        starting from student application, application verification and processing of various scholarships to Students are enabled.
                        This initiative aims at providing a Simplified, Mission-oriented, Accountable, Responsive & Transparent 'SMART' 
                        System for faster & effective disposal of Scholarships applications and delivery of funds 
                        directly into beneficiaries account without any leakages.
                        </p>
                    </div>
         <div class="about-content1">
         <img src={mainimage} alt="About Us" className="main-image1" />
         </div>
     </div>
         </div>
      
    );
}

export default About;
