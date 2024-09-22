import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './userterms.css';

const UserTerms = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleOkClick = () => {
    navigate('/home'); // Navigate back to the home page
  };

  return (
    <div className="terms-container">
      <div className="terms-box">
        <h2>Terms and Conditions</h2>
        <p><strong>Newly Updated</strong></p>

        <p>
          Welcome to EducateKid! These terms and conditions ("Terms") govern your use of the EducateKid scholarship platform (the "App" or "Platform"). By accessing or using our services, you agree to be bound by these Terms. Please read them carefully.
        </p>

        <h3>1. Acceptance of Terms</h3>
        <p>
          By registering for, accessing, browsing, or using the EducateKid Platform, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy.
        </p>

        <h3>2. Eligibility</h3>
        <p>
          You must be at least 18 years of age to use the Platform. If you are under 18, you may use the Platform only with the involvement of a parent or guardian. You must provide accurate and complete information when registering for an account.
        </p>

        <h3>3. User Responsibilities</h3>
        <p>
          You agree to use the Platform only for lawful purposes. You must not submit false information, impersonate others, or engage in fraudulent activities. You are responsible for maintaining the confidentiality of your account login information and for all activities that occur under your account.
        </p>

        <h3>4. Scholarship Applications</h3>
        <p>
          You understand that submitting an application does not guarantee a scholarship. All information provided in scholarship applications must be truthful and accurate. Falsifying information in an application may result in disqualification and account suspension.
        </p>

        <h3>5. User Content</h3>
        <p>
          You retain ownership of the content you submit, post, or display on or through the Platform. By submitting content, you grant EducateKid a non-exclusive, worldwide, royalty-free license to use, copy, modify, and distribute such content for the purpose of operating the Platform. EducateKid reserves the right to remove or modify any content that violates these Terms or is deemed inappropriate.
        </p>

        <h3>6. Prohibited Conduct</h3>
        <p>
          You agree not to use the Platform to harass, threaten, or defame any individual or entity. Upload or share malicious software or viruses. Engage in any activity that disrupts or interferes with the Platform's functionality. Attempt to gain unauthorized access to any part of the Platform.
        </p>

        <h3>7. Privacy</h3>
        <p>
          Your use of the Platform is subject to our Privacy Policy, which describes how we collect, use, and disclose your personal information.
        </p>

        <h3>8. Termination</h3>
        <p>
          EducateKid reserves the right to terminate or suspend your account at any time for any reason, including violation of these Terms. Upon termination, your right to use the Platform will immediately cease.
        </p>

        <h3>9. Limitation of Liability</h3>
        <p>
          EducateKid is not responsible for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the Platform. EducateKid does not guarantee the availability or accuracy of scholarships listed on the Platform.
        </p>

        <h3>10. Modifications to the Platform and Terms</h3>
        <p>
          EducateKid reserves the right to modify or discontinue the Platform at any time without notice. We may update these Terms from time to time. Your continued use of the Platform after any changes indicates your acceptance of the new Terms.
        </p>

        <h3>11. Governing Law</h3>
        <p>
          These Terms are governed by and construed in accordance with the laws of [India], without regard to its conflict of law principles. Any disputes arising under these Terms will be resolved in the courts of [Your Country/State].
        </p>

        <h3>12. Contact Us</h3>
        <p>
          If you have any questions or concerns about these Terms, please contact us at [educatekid@gmail.com].
        </p>

        <button className="ok-button" onClick={handleOkClick}>OK</button>
      </div>

      
    </div>

    
  );
}

export default UserTerms;