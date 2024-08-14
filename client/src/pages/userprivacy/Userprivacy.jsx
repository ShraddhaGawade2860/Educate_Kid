import React from 'react';
import './userprivacy.css';

const UserPrivacy = () => {
  return (
    <div className="privacy-container">
      <div className="privacy-box">
        <h2>Privacy Policy</h2>
        <p><strong>Last Updated: [Date]</strong></p>

        <p>
          Thank you for using EducateKid! We respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our scholarship platform (the "App" or "Platform"). Please read this policy carefully.
        </p>

        <h3>1. Information We Collect</h3>
        <p>
          We may collect and store the following types of information when you use our Platform:
        </p>
        <p><strong>a. Personal Information</strong></p>
        <p>
          <strong>Registration Information:</strong> When you sign up, we collect personal details such as your name, email address, date of birth, and contact information.<br />
          <strong>Application Data:</strong> When you apply for scholarships, we collect information relevant to your application, such as educational background, financial status, and other required documents.
        </p>
        <p><strong>b. Non-Personal Information</strong></p>
        <p>
          <strong>Usage Data:</strong> We may collect information on how you access and use the Platform, such as your IP address, browser type, device information, and pages visited.<br />
          <strong>Cookies and Tracking Technologies:</strong> We use cookies and similar tracking technologies to enhance your experience on our Platform. You can manage your cookie preferences through your browser settings.
        </p>

        <h3>2. How We Use Your Information</h3>
        <p>
          We use the information we collect for the following purposes:
        </p>
        <p>
          <strong>To Provide and Improve Our Services:</strong> We use your information to facilitate scholarship applications, personalize your experience, and improve the functionality of our Platform.<br />
          <strong>To Communicate with You:</strong> We may use your contact information to send you updates, newsletters, and other relevant communications.<br />
          <strong>To Ensure Security:</strong> We use your information to protect against unauthorized access, fraud, and other security risks.<br />
          <strong>For Analytics:</strong> We may analyze usage data to understand how our users interact with the Platform and to improve our services.
        </p>

        <h3>3. Sharing Your Information</h3>
        <p>
          We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:
        </p>
        <p>
          <strong>With Scholarship Providers:</strong> We share your application information with scholarship providers for evaluation and processing.<br />
          <strong>With Service Providers:</strong> We may share your information with third-party service providers who assist us in operating the Platform and providing our services.<br />
          <strong>As Required by Law:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or government agency).<br />
          <strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction.
        </p>

        <h3>4. Data Security</h3>
        <p>
          We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee its absolute security.
        </p>

        <h3>5. Your Rights and Choices</h3>
        <p>
          You have the following rights regarding your personal information:
        </p>
        <p>
          <strong>Access and Correction:</strong> You can access and update your personal information by logging into your account or contacting us directly.<br />
          <strong>Data Deletion:</strong> You can request the deletion of your personal information, subject to certain legal obligations.<br />
          <strong>Opt-Out:</strong> You can opt out of receiving marketing communications from us by following the unsubscribe instructions in those communications.
        </p>

        <h3>6. Children’s Privacy</h3>
        <p>
          Our Platform is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information.
        </p>

        <h3>7. International Data Transfers</h3>
        <p>
          Your information may be transferred to and processed in countries other than your own. These countries may have data protection laws that are different from the laws of your country. We take measures to ensure that your data is protected in accordance with this Privacy Policy.
        </p>

        <h3>8. Changes to This Privacy Policy</h3>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new Privacy Policy on the Platform. Your continued use of the Platform after any changes indicates your acceptance of the updated Privacy Policy.
        </p>

        <h3>9. Contact Us</h3>
        <p>
          If you have any questions or concerns about this Privacy Policy, please contact us at:
        </p>
        <p>[Your Contact Information]</p>

        <button className="ok-button">OK</button>
      </div>
    </div>
  );
}

export default UserPrivacy;
