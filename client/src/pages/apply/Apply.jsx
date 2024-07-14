import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './apply.css';
import '../form/form.css';

const Apply = () => {
  const { state } = useLocation();
  const [scholarship, setScholarship] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (state?.scholarship) {
      const fetchScholarshipDetails = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/scholarships/${state.scholarship._id}`);
          const data = await response.json();

          if (response.ok) {
            setScholarship(data);
          } else {
            console.error('Failed to fetch scholarship details:', data);
          }
        } catch (error) {
          console.error('Error fetching scholarship details:', error);
        }
      };

      fetchScholarshipDetails();
    }
  }, [state]);

  if (!scholarship) {
    return <div>No scholarship selected</div>;
  }

  const handleApplyClick = () => {
    setShowForm(true);
  };

  return (
    <div className="apply-container1">
      <h2>Applying for: {scholarship.name}</h2>
      <div className="scholarship-info1">
        <h3>About the Scholarship</h3>
        <p>{scholarship.description}</p>

        <h4>Scholarship Name</h4>
        <div className="scholarship-box2">
          <p>{scholarship.name}</p>
        </div>

        <h4>Eligibility Criteria</h4>
        <div className="scholarship-box2">
          <p>{scholarship.eligibility}</p>
        </div>

        <h4>Benefits</h4>
        <div className="scholarship-box2">
          <p>{scholarship.benefits}</p>
        </div>

        <h4>Documents Required</h4>
        <div className="scholarship-box2">
          <p>{scholarship.documents}</p>
        </div>

        <h4>How to Apply</h4>
        <div className="scholarship-box2">
          <p>{scholarship.applyProcess}</p>
        </div>

        <button className="apply-button" onClick={handleApplyClick}>
          Apply
        </button>
      </div>

      {showForm && (
        <>
          <hr className="horizontal-line" />
          <Form scholarshipName={scholarship.name} />
        </>
      )}
    </div>
  );
};

const Form = ({ scholarshipName }) => {
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    gender: '',
    contactNo: '',
    email: '',
    religion: '',
    institutionName: '',
    state: '',
    course: '',
    year: '',
    enrollmentNo: '',
    xthPercentage: '',
    xiithPercentage: '',
    ugPercentage: '',
    address: '',
    homeState: '',
    reasonOfLeavingState: '',
    scholarshipName: scholarshipName,
    reasonForDenyingScholarship: '',
    disabilities: '',
    disabilityDetails: '',
    disabilityCertificate: null,
    xthMarksheet: null,
    xiithMarksheet: null,
    ugCertificate: null,
    pgCertificate: null,
    birthCertificate: null,
    communityCertificate: null,
    aadharCard: null,
    idCard: null,
    feeReceipt: null
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0]
    });
  };

  const validate = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      if (!formData[key] && key !== 'disabilityDetails' && key !== 'disabilityCertificate' && key !== 'pgCertificate') {
        newErrors[key] = 'This field is required';
      }
    });
    if (formData.disabilities === 'yes' && !formData.disabilityDetails) {
      newErrors.disabilityDetails = 'This field is required';
    }
    if (formData.disabilities === 'yes' && !formData.disabilityCertificate) {
      newErrors.disabilityCertificate = 'This field is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    const data = new FormData();

    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });

    try {
      const response = await axios.post('http://localhost:5000/api/form/submit', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.status === 200) {
        alert('Form submitted successfully');
        navigate('/apply', { state: { scholarship: { name: scholarshipName } } });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Personal Information</h2>
      <div className="form-section">
        <div className="form-row-inline">
          <div className="form-row">
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
          <div className="form-row">
            <label>Date Of Birth:</label>
            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
            {errors.dateOfBirth && <p className="error">{errors.dateOfBirth}</p>}
          </div>
        </div>
        <div className="form-row-inline">
          <div className="form-row">
            <label>Gender:</label>
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <p className="error">{errors.gender}</p>}
          </div>
          <div className="form-row">
            <label>Contact No.:</label>
            <input type="text" name="contactNo" value={formData.contactNo} onChange={handleChange} />
            {errors.contactNo && <p className="error">{errors.contactNo}</p>}
          </div>
        </div>
        <div className="form-row-inline">
          <div className="form-row">
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="form-row">
            <label>Religion:</label>
            <input type="text" name="religion" value={formData.religion} onChange={handleChange} />
            {errors.religion && <p className="error">{errors.religion}</p>}
          </div>
        </div>
      </div>

      <h2>Institution Details</h2>
      <div className="form-section">
        <div className="form-row-inline">
          <div className="form-row">
          <label>Institution Name:</label>
            <select name="institutionName" value={formData.institutionName} onChange={handleChange}>
              <option value="">Select Institute</option>
              <option value="Thakur Polytechnic">Thakur Polytechnic</option>
              <option value="ACS Medical College, TamilNadu">ACS Medical College, TamilNadu</option>
              {/* Add more options as needed */}
            </select>
            {errors.institutionName && <p className="error">{errors.institutionName}</p>}
          </div>
          <div className="form-row">
          <label>State:</label>
            <select name="state" value={formData.state} onChange={handleChange}>
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
              <option value="TamilNadu">TamilNadu</option>
              <option value="Telangana">Telangana</option>
              <option value="Tripura">Tripura</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="West Bengal">West Bengal</option>
              <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
              <option value="Chandigarh">Chandigarh</option>
              <option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option>
              <option value="Daman and Diu">Daman and Diu</option>
              <option value="Lakshadweep">Lakshadweep</option>
              <option value="Delhi">Delhi</option>
              <option value="Puducherry">Puducherry</option>
            </select>
            {errors.state && <p className="error">{errors.state}</p>}
          </div>
        </div>
        <div className="form-row-inline">
          <div className="form-row">
            <label>Course:</label>
            <input type="text" name="course" value={formData.course} onChange={handleChange} />
            {errors.course && <p className="error">{errors.course}</p>}
          </div>
          <div className="form-row">
            <label>Year:</label>
            <input type="text" name="year" value={formData.year} onChange={handleChange} />
            {errors.year && <p className="error">{errors.year}</p>}
          </div>
        </div>
        <div className="form-row-inline">
          <div className="form-row">
            <label>Enrollment No.:</label>
            <input type="text" name="enrollmentNo" value={formData.enrollmentNo} onChange={handleChange} />
            {errors.enrollmentNo && <p className="error">{errors.enrollmentNo}</p>}
          </div>
          <div className="form-row">
            <label>Xth Percentage:</label>
            <input type="text" name="xthPercentage" value={formData.xthPercentage} onChange={handleChange} />
            {errors.xthPercentage && <p className="error">{errors.xthPercentage}</p>}
          </div>
        </div>
        <div className="form-row-inline">
          <div className="form-row">
            <label>XIIth Percentage:</label>
            <input type="text" name="xiithPercentage" value={formData.xiithPercentage} onChange={handleChange} />
            {errors.xiithPercentage && <p className="error">{errors.xiithPercentage}</p>}
          </div>
          <div className="form-row">
            <label>UG Percentage:</label>
            <input type="text" name="ugPercentage" value={formData.ugPercentage} onChange={handleChange} />
            {errors.ugPercentage && <p className="error">{errors.ugPercentage}</p>}
          </div>
        </div>
      </div>

      <h2>Address Details</h2>
      <div className="form-section">
        <div className="form-row-inline">
          <div className="form-row">
            <label>Address:</label>
            <textarea name="address" value={formData.address} onChange={handleChange}></textarea>
            {errors.address && <p className="error">{errors.address}</p>}
          </div>
          <div className="form-row">
          <label>Home State:</label>
          <select name="homeState" value={formData.homeState} onChange={handleChange}>
            <option value="">Select Home State</option>
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
            <option value="TamilNadu">TamilNadu</option>
            <option value="Telangana">Telangana</option>
            <option value="Tripura">Tripura</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Uttarakhand">Uttarakhand</option>
            <option value="West Bengal">West Bengal</option>
            <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
            <option value="Chandigarh">Chandigarh</option>
            <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
            <option value="Lakshadweep">Lakshadweep</option>
            <option value="Delhi">Delhi</option>
            <option value="Puducherry">Puducherry</option>
            <option value="Jammu and Kashmir">Jammu and Kashmir</option>
          </select>
          {errors.homeState && <p className="error">{errors.homeState}</p>}
        </div>
        </div>
        <div className="form-row">
          <label>Reason Of Leaving State:</label>
          <textarea name="reasonOfLeavingState" value={formData.reasonOfLeavingState} onChange={handleChange}></textarea>
          {errors.reasonOfLeavingState && <p className="error">{errors.reasonOfLeavingState}</p>}
        </div>
      </div>

      <h2>Scholarship Details</h2>
      <div className="form-section">
        <div className="form-row-inline">
          <div className="form-row">
            <label>Scholarship Name:</label>
            <input type="text" name="scholarshipName" value={formData.scholarshipName} onChange={handleChange} />
            {errors.scholarshipName && <p className="error">{errors.scholarshipName}</p>}
          </div>
          <div className="form-row">
            <label>Reason For Denying Scholarship:</label>
            <textarea name="reasonForDenyingScholarship" value={formData.reasonForDenyingScholarship} onChange={handleChange}></textarea>
            {errors.reasonForDenyingScholarship && <p className="error">{errors.reasonForDenyingScholarship}</p>}
          </div>
        </div>
      </div>

      <h2>Disability Details</h2>
      <div className="form-section">
        <div className="form-row">
          <label>Disabilities:</label>
          <select name="disabilities" value={formData.disabilities} onChange={handleChange}>
            <option value="">Select Disability</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          {errors.disabilities && <p className="error">{errors.disabilities}</p>}
        </div>
        {formData.disabilities === 'yes' && (
          <>
            <div className="form-row">
              <label>Disability Details:</label>
              <textarea name="disabilityDetails" value={formData.disabilityDetails} onChange={handleChange}></textarea>
              {errors.disabilityDetails && <p className="error">{errors.disabilityDetails}</p>}
            </div>
            <div className="form-row">
              <label>Disability Certificate:</label>
              <input type="file" name="disabilityCertificate" onChange={handleFileChange} />
              {errors.disabilityCertificate && <p className="error">{errors.disabilityCertificate}</p>}
            </div>
          </>
        )}
      </div>

      <h2>Upload Documents</h2>
      <div className="form-section">
        <div className="form-row-inline">
          <div className="form-row">
            <label>Xth Marksheet:</label>
            <input type="file" name="xthMarksheet" onChange={handleFileChange} />
            {errors.xthMarksheet && <p className="error">{errors.xthMarksheet}</p>}
          </div>
          <div className="form-row">
            <label>XIIth Marksheet:</label>
            <input type="file" name="xiithMarksheet" onChange={handleFileChange} />
            {errors.xiithMarksheet && <p className="error">{errors.xiithMarksheet}</p>}
          </div>
        </div>
        <div className="form-row-inline">
          <div className="form-row">
            <label>UG Certificate:</label>
            <input type="file" name="ugCertificate" onChange={handleFileChange} />
            {errors.ugCertificate && <p className="error">{errors.ugCertificate}</p>}
          </div>
          <div className="form-row">
            <label>PG Certificate:</label>
            <input type="file" name="pgCertificate" onChange={handleFileChange} />
          </div>
        </div>
        <div className="form-row-inline">
          <div className="form-row">
            <label>Birth Certificate:</label>
            <input type="file" name="birthCertificate" onChange={handleFileChange} />
            {errors.birthCertificate && <p className="error">{errors.birthCertificate}</p>}
          </div>
          <div className="form-row">
            <label>Community Certificate:</label>
            <input type="file" name="communityCertificate" onChange={handleFileChange} />
            {errors.communityCertificate && <p className="error">{errors.communityCertificate}</p>}
          </div>
        </div>
        <div className="form-row-inline">
          <div className="form-row">
            <label>Aadhar Card:</label>
            <input type="file" name="aadharCard" onChange={handleFileChange} />
            {errors.aadharCard && <p className="error">{errors.aadharCard}</p>}
          </div>
          <div className="form-row">
            <label>ID Card:</label>
            <input type="file" name="idCard" onChange={handleFileChange} />
            {errors.idCard && <p className="error">{errors.idCard}</p>}
          </div>
        </div>
        <div className="form-row">
          <label>Fee Receipt:</label>
          <input type="file" name="feeReceipt" onChange={handleFileChange} />
          {errors.feeReceipt && <p className="error">{errors.feeReceipt}</p>}
        </div>
      </div>

      <div className="form-row">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default Apply;