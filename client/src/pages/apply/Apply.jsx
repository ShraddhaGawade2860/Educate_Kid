import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './apply.css';
import '../form/form.css';

const Apply = () => {
  const { state } = useLocation();
  const [scholarship, setScholarship] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    if (state?.scholarship) {
      const fetchScholarshipDetails = async () => {
        try {
          const response = await fetch(`http://192.168.143.199:5000/api/scholarships/${state.scholarship._id}`);
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

        {/* Apply button with conditional rendering */}
        <button
          className={`apply-button ${isApplied ? 'applied-button' : ''}`}
          onClick={handleApplyClick}
          disabled={isApplied}
        >
          {isApplied ? 'Applied' : 'Apply'}
        </button>
      </div>

      {showForm && (
        <>
          <hr className="horizontal-line" />
          <Form scholarshipName={scholarship.name} setIsApplied={setIsApplied} />
        </>
      )}
    </div>
  );
};

const Form = ({ scholarshipName, setIsApplied }) => {
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
  const [successMessage, setSuccessMessage] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
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
      if (
        !formData[key] &&
        ![
          'xthPercentage',
          'xiithPercentage',
          'ugPercentage',
          'xthMarksheet',
          'xiithMarksheet',
          'ugCertificate',
          'pgCertificate',
          'disabilityDetails',
          'disabilityCertificate',
          'reasonForDenyingScholarship',
          'communityCertificate'
        ].includes(key)
      ) {
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
      const response = await axios.post('http://192.168.143.199:5000/api/form/submit', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.status === 200) {
        setSuccessMessage('Form submitted successfully');
        setIsFormSubmitted(true);

        setIsApplied(true);

        // Close form and navigate after showing success message
        setTimeout(() => {
          navigate('/apply', { state: { scholarship: { name: scholarshipName } } });
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (isFormSubmitted) {
    return <div className="success-message">{successMessage}</div>;
  }


  return (
    <form className="form-containerr" onSubmit={handleSubmit}>
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
  <select name="religion" value={formData.religion} onChange={handleChange}>
    <option value="">Select Religion</option>
    <option value="Hinduism">Hinduism</option>
    <option value="Islam">Islam</option>
    <option value="Christianity">Christianity</option>
    <option value="Sikhism">Sikhism</option>
    <option value="Buddhism">Buddhism</option>
    <option value="Jainism">Jainism</option>
    <option value="Zoroastrianism">Zoroastrianism</option>
    <option value="Judaism">Judaism</option>
    <option value="Other">Other</option>
  </select>
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
              <option value="Vellore Institute of Technology, Vellore">Vellore Institute of Technology, Vellore</option>
              <option value="Rayat-Bahra University">Rayat-Bahra University</option>
              <option value="Anna University, Chennai">Anna University, Chennai</option>
              <option value="Bharathiar University, Coimbatore">Bharathiar University, Coimbatore</option>
              <option value="Indian Institute of Technology, Madras">Indian Institute of Technology, Madras</option>
              <option value="Saveetha School Of Engineering, Chennai">Saveetha School Of Engineering, Chennai</option>
              <option value="Rajalakshmi Institute Of Technology, Chennai">Rajalakshmi Institute Of Technology, Chennai</option>
              <option value="Andhra University, Visakhapatnam">Andhra University, Visakhapatnam</option>
              <option value="Sri Venkateswara University, Tirupati">Sri Venkateswara University, Tirupati</option>
              <option value="Jawaharlal Nehru Technological University, Kakinada">Jawaharlal Nehru Technological University, Kakinada</option>
              <option value="Acharya Nagarjuna University, Guntur">Acharya Nagarjuna University, Guntur</option>
              <option value="GITAM University, Visakhapatnam">GITAM University, Visakhapatnam</option>
              <option value="KL University, Vijayawada">KL University, Vijayawada</option>
              <option value="Sri Krishnadevaraya University, Anantapur">Sri Krishnadevaraya University, Anantapur</option>
              <option value="Dr. YSR Horticultural University, Venkataramannagudem">Dr. YSR Horticultural University, Venkataramannagudem</option>
              <option value="Vignan's Foundation for Science, Technology & Research, Guntur">Vignan's Foundation for Science, Technology & Research, Guntur</option>
              <option value="NIT, Tadepalligudem">NIT, Tadepalligudem</option>
              <option value="North Eastern Regional Institute of Science and Technology, Nirjuli">North Eastern Regional Institute of Science and Technology, Nirjuli</option>
<option value="Arunachal University of Studies, Namsai">Arunachal University of Studies, Namsai</option>
<option value="Rajiv Gandhi University, Itanagar">Rajiv Gandhi University, Itanagar</option>
<option value="Indira Gandhi Technological And Medical Sciences University, Ziro">Indira Gandhi Technological And Medical Sciences University, Ziro</option>
<option value="National Institute of Technology, Yupia">National Institute of Technology, Yupia</option>
<option value="Himalayan University, Itanagar">Himalayan University, Itanagar</option>
<option value="Arunachal Law Academy, Itanagar">Arunachal Law Academy, Itanagar</option>
<option value="Dera Natung Government College, Itanagar">Dera Natung Government College, Itanagar</option>
<option value="Tomi Polytechnic College, Basar">Tomi Polytechnic College, Basar</option>
<option value="Government College, Bomdila">Government College, Bomdila</option>
<option value="Gauhati University, Guwahati">Gauhati University, Guwahati</option>
<option value="Assam University, Silchar">Assam University, Silchar</option>
<option value="Tezpur University, Tezpur">Tezpur University, Tezpur</option>
<option value="Dibrugarh University, Dibrugarh">Dibrugarh University, Dibrugarh</option>
<option value="Indian Institute of Technology, Guwahati">Indian Institute of Technology, Guwahati</option>
<option value="Assam Engineering College, Guwahati">Assam Engineering College, Guwahati</option>
<option value="Kaziranga University, Jorhat">Kaziranga University, Jorhat</option>
<option value="Assam Medical College, Dibrugarh">Assam Medical College, Dibrugarh</option>
<option value="Cotton University, Guwahati">Cotton University, Guwahati</option>
<option value="Bodoland University, Kokrajhar">Bodoland University, Kokrajhar</option>
<option value="Patna University, Patna">Patna University, Patna</option>
<option value="Nalanda University, Rajgir">Nalanda University, Rajgir</option>
<option value="Aryabhatta Knowledge University, Patna">Aryabhatta Knowledge University, Patna</option>
<option value="Magadh University, Bodh Gaya">Magadh University, Bodh Gaya</option>
<option value="Lalit Narayan Mithila University, Darbhanga">Lalit Narayan Mithila University, Darbhanga</option>
<option value="Veer Kunwar Singh University, Ara">Veer Kunwar Singh University, Ara</option>
<option value="Tilka Manjhi Bhagalpur University, Bhagalpur">Tilka Manjhi Bhagalpur University, Bhagalpur</option>
<option value="Bhupendra Narayan Mandal University, Madhepura">Bhupendra Narayan Mandal University, Madhepura</option>
<option value="Jai Prakash University, Chapra">Jai Prakash University, Chapra</option>
<option value="Bihar Agricultural University, Sabour">Bihar Agricultural University, Sabour</option>
<option value="Pandit Ravishankar Shukla University, Raipur">Pandit Ravishankar Shukla University, Raipur</option>
<option value="Indian Institute of Technology, Bhilai">Indian Institute of Technology, Bhilai</option>
<option value="All India Institute of Medical Sciences, Raipur">All India Institute of Medical Sciences, Raipur</option>
<option value="National Institute of Technology, Raipur">National Institute of Technology, Raipur</option>
<option value="Guru Ghasidas Vishwavidyalaya, Bilaspur">Guru Ghasidas Vishwavidyalaya, Bilaspur</option>
<option value="Chhattisgarh Swami Vivekanand Technical University, Bhilai">Chhattisgarh Swami Vivekanand Technical University, Bhilai</option>
<option value="Kalinga University, Raipur">Kalinga University, Raipur</option>
<option value="Hidayatullah National Law University, Raipur">Hidayatullah National Law University, Raipur</option>
<option value="Pt. Sundarlal Sharma (Open) University, Bilaspur">Pt. Sundarlal Sharma (Open) University, Bilaspur</option>
<option value="Bastar University, Jagdalpur">Bastar University, Jagdalpur</option>
<option value="Goa University, Taleigao Plateau">Goa University, Taleigao Plateau</option>
<option value="BITS Pilani, Goa Campus, Zuarinagar">BITS Pilani, Goa Campus, Zuarinagar</option>
<option value="National Institute of Technology, Goa">National Institute of Technology, Goa</option>
<option value="Goa Institute of Management, Sanquelim">Goa Institute of Management, Sanquelim</option>
<option value="Goa Medical College, Bambolim">Goa Medical College, Bambolim</option>
<option value="Goa College of Engineering, Farmagudi">Goa College of Engineering, Farmagudi</option>
<option value="Padre Conceicao College of Engineering, Verna">Padre Conceicao College of Engineering, Verna</option>
<option value="VM Salgaocar College of Law, Panaji">VM Salgaocar College of Law, Panaji</option>
<option value="Dhempe College of Arts and Science, Miramar">Dhempe College of Arts and Science, Miramar</option>
<option value="Shree Damodar College of Commerce and Economics, Margao">Shree Damodar College of Commerce and Economics, Margao</option>
<option value="Gujarat University, Ahmedabad">Gujarat University, Ahmedabad</option>
<option value="Sardar Vallabhbhai National Institute of Technology, Surat">Sardar Vallabhbhai National Institute of Technology, Surat</option>
<option value="Indian Institute of Management, Ahmedabad">Indian Institute of Management, Ahmedabad</option>
<option value="Nirma University, Ahmedabad">Nirma University, Ahmedabad</option>
<option value="Gujarat Technological University, Ahmedabad">Gujarat Technological University, Ahmedabad</option>
<option value="Dhirubhai Ambani Institute of Information and Communication Technology, Gandhinagar">Dhirubhai Ambani Institute of Information and Communication Technology, Gandhinagar</option>
<option value="Maharaja Sayajirao University of Baroda, Vadodara">Maharaja Sayajirao University of Baroda, Vadodara</option>
<option value="Pandit Deendayal Energy University, Gandhinagar">Pandit Deendayal Energy University, Gandhinagar</option>
<option value="CEPT University, Ahmedabad">CEPT University, Ahmedabad</option>
<option value="Navrachana University, Vadodara">Navrachana University, Vadodara</option>
<option value="Kurukshetra University, Kurukshetra">Kurukshetra University, Kurukshetra</option>
<option value="Maharshi Dayanand University, Rohtak">Maharshi Dayanand University, Rohtak</option>
<option value="Indian Institute of Management, Rohtak">Indian Institute of Management, Rohtak</option>
<option value="National Institute of Technology, Kurukshetra">National Institute of Technology, Kurukshetra</option>
<option value="Ashoka University, Sonepat">Ashoka University, Sonepat</option>
<option value="Amity University, Gurgaon">Amity University, Gurgaon</option>
<option value="J.C. Bose University of Science and Technology, Faridabad">J.C. Bose University of Science and Technology, Faridabad</option>
<option value="Chaudhary Devi Lal University, Sirsa">Chaudhary Devi Lal University, Sirsa</option>
<option value="O.P. Jindal Global University, Sonepat">O.P. Jindal Global University, Sonepat</option>
<option value="Deenbandhu Chhotu Ram University of Science and Technology, Murthal">Deenbandhu Chhotu Ram University of Science and Technology, Murthal</option>
<option value="Himachal Pradesh University, Shimla">Himachal Pradesh University, Shimla</option>
<option value="Indian Institute of Technology, Mandi">Indian Institute of Technology, Mandi</option>
<option value="National Institute of Technology, Hamirpur">National Institute of Technology, Hamirpur</option>
<option value="Jaypee University of Information Technology, Solan">Jaypee University of Information Technology, Solan</option>
<option value="Chaudhary Sarwan Kumar Himachal Pradesh Krishi Vishvavidyalaya, Palampur">Chaudhary Sarwan Kumar Himachal Pradesh Krishi Vishvavidyalaya, Palampur</option>
<option value="Indira Gandhi Medical College, Shimla">Indira Gandhi Medical College, Shimla</option>
<option value="Shoolini University of Biotechnology and Management Sciences, Solan">Shoolini University of Biotechnology and Management Sciences, Solan</option>
<option value="Bahra University, Shimla Hills">Bahra University, Shimla Hills</option>
<option value="Central University of Himachal Pradesh, Dharamshala">Central University of Himachal Pradesh, Dharamshala</option>
<option value="ICFAI University, Baddi">ICFAI University, Baddi</option>
<option value="University of Jammu, Jammu">University of Jammu, Jammu</option>
<option value="University of Kashmir, Srinagar">University of Kashmir, Srinagar</option>
<option value="National Institute of Technology, Srinagar">National Institute of Technology, Srinagar</option>
<option value="Sher-e-Kashmir University of Agricultural Sciences and Technology, Jammu">Sher-e-Kashmir University of Agricultural Sciences and Technology, Jammu</option>
<option value="Government College of Engineering and Technology, Jammu">Government College of Engineering and Technology, Jammu</option>
<option value="Islamic University of Science and Technology, Awantipora">Islamic University of Science and Technology, Awantipora</option>
<option value="Baba Ghulam Shah Badshah University, Rajouri">Baba Ghulam Shah Badshah University, Rajouri</option>
<option value="Cluster University of Jammu, Jammu">Cluster University of Jammu, Jammu</option>
<option value="Central University of Jammu, Samba">Central University of Jammu, Samba</option>
<option value="National Institute of Fashion Technology, Srinagar">National Institute of Fashion Technology, Srinagar</option>
<option value="Ranchi University, Ranchi">Ranchi University, Ranchi</option>
<option value="Indian Institute of Technology, Dhanbad">Indian Institute of Technology, Dhanbad</option>
<option value="National Institute of Technology, Jamshedpur">National Institute of Technology, Jamshedpur</option>
<option value="Birla Institute of Technology, Mesra">Birla Institute of Technology, Mesra</option>
<option value="Vinoba Bhave University, Hazaribagh">Vinoba Bhave University, Hazaribagh</option>
<option value="Sido Kanhu Murmu University, Dumka">Sido Kanhu Murmu University, Dumka</option>
<option value="National University of Study and Research in Law, Ranchi">National University of Study and Research in Law, Ranchi</option>
<option value="Central University of Jharkhand, Ranchi">Central University of Jharkhand, Ranchi</option>
<option value="Kolhan University, Chaibasa">Kolhan University, Chaibasa</option>
<option value="Birsa Agricultural University, Ranchi">Birsa Agricultural University, Ranchi</option>
<option value="Bangalore University, Bangalore">Bangalore University, Bangalore</option>
<option value="Indian Institute of Science, Bangalore">Indian Institute of Science, Bangalore</option>
<option value="National Institute of Technology Karnataka, Surathkal">National Institute of Technology Karnataka, Surathkal</option>
<option value="Jawaharlal Nehru Centre for Advanced Scientific Research, Bangalore">Jawaharlal Nehru Centre for Advanced Scientific Research, Bangalore</option>
<option value="Manipal Academy of Higher Education, Manipal">Manipal Academy of Higher Education, Manipal</option>
<option value="Karnataka University, Dharwad">Karnataka University, Dharwad</option>
<option value="Mysore University, Mysore">Mysore University, Mysore</option>
<option value="Visvesvaraya Technological University, Belgaum">Visvesvaraya Technological University, Belgaum</option>
<option value="Nitte University, Mangalore">Nitte University, Mangalore</option>
<option value="Indian Institute of Management, Bangalore">Indian Institute of Management, Bangalore</option>
<option value="University of Kerala, Thiruvananthapuram">University of Kerala, Thiruvananthapuram</option>
<option value="Cochin University of Science and Technology, Kochi">Cochin University of Science and Technology, Kochi</option>
<option value="National Institute of Technology, Calicut">National Institute of Technology, Calicut</option>
<option value="Mahatma Gandhi University, Kottayam">Mahatma Gandhi University, Kottayam</option>
<option value="Kerala Agricultural University, Thrissur">Kerala Agricultural University, Thrissur</option>
<option value="Indian Institute of Space Science and Technology, Thiruvananthapuram">Indian Institute of Space Science and Technology, Thiruvananthapuram</option>
<option value="Central University of Kerala, Kasaragod">Central University of Kerala, Kasaragod</option>
<option value="Indian Institute of Management, Kozhikode">Indian Institute of Management, Kozhikode</option>
<option value="Kannur University, Kannur">Kannur University, Kannur</option>
<option value="National Institute of Fashion Technology, Kannur">National Institute of Fashion Technology, Kannur</option>
<option value="Indian Institute of Technology, Indore">Indian Institute of Technology, Indore</option>
<option value="Maulana Azad National Institute of Technology, Bhopal">Maulana Azad National Institute of Technology, Bhopal</option>
<option value="Amity University, Gwalior">Amity University, Gwalior</option>
<option value="Indian Institute of Science Education and Research, Bhopal">Indian Institute of Science Education and Research, Bhopal</option>
<option value="Jiwaji University, Gwalior">Jiwaji University, Gwalior</option>
<option value="Devi Ahilya Vishwavidyalaya, Indore">Devi Ahilya Vishwavidyalaya, Indore</option>
<option value="Lakshmi Narain College of Technology, Bhopal">Lakshmi Narain College of Technology, Bhopal</option>
<option value="Rani Durgavati University, Jabalpur">Rani Durgavati University, Jabalpur</option>
<option value="Prestige Institute of Management and Research, Indore">Prestige Institute of Management and Research, Indore</option>
<option value="Oriental Institute of Science & Technology, Bhopal">Oriental Institute of Science & Technology, Bhopal</option>
<option value="University of Mumbai, Mumbai">University of Mumbai, Mumbai</option>
<option value="Indian Institute of Technology, Bombay">Indian Institute of Technology, Bombay</option>
<option value="Symbiosis International University, Pune">Symbiosis International University, Pune</option>
<option value="Savitribai Phule Pune University, Pune">Savitribai Phule Pune University, Pune</option>
<option value="Tata Institute of Social Sciences, Mumbai">Tata Institute of Social Sciences, Mumbai</option>
<option value="Narsee Monjee Institute of Management Studies, Mumbai">Narsee Monjee Institute of Management Studies, Mumbai</option>
<option value="Maharashtra Institute of Technology, Pune">Maharashtra Institute of Technology, Pune</option>
<option value="St. Xavier's College, Mumbai">St. Xavier's College, Mumbai</option>
<option value="Institute of Chemical Technology, Mumbai">Institute of Chemical Technology, Mumbai</option>
<option value="College of Engineering, Pune">College of Engineering, Pune</option>
<option value="Manipur University, Imphal">Manipur University, Imphal</option>
<option value="National Institute of Technology, Manipur">National Institute of Technology, Manipur</option>
<option value="Indira Gandhi National Tribal University, Manipur">Indira Gandhi National Tribal University, Manipur</option>
<option value="Central Agricultural University, Imphal">Central Agricultural University, Imphal</option>
<option value="D.M. College of Science, Imphal">D.M. College of Science, Imphal</option>
<option value="Kangla Saneibak College, Imphal">Kangla Saneibak College, Imphal</option>
<option value="Regional Institute of Medical Sciences, Imphal">Regional Institute of Medical Sciences, Imphal</option>
<option value="G.P. Women’s College, Imphal">G.P. Women’s College, Imphal</option>
<option value="Standard College, Imphal">Standard College, Imphal</option>
<option value="Biramangol College, Imphal">Biramangol College, Imphal</option>
<option value="North-Eastern Hill University, Shillong">North-Eastern Hill University, Shillong</option>
<option value="Indian Institute of Management, Shillong">Indian Institute of Management, Shillong</option>
<option value="St. Anthony's College, Shillong">St. Anthony's College, Shillong</option>
<option value="Martin Luther Christian University, Shillong">Martin Luther Christian University, Shillong</option>
<option value="William Carey University, Shillong">William Carey University, Shillong</option>
<option value="Shillong College, Shillong">Shillong College, Shillong</option>
<option value="St. Edmund's College, Shillong">St. Edmund's College, Shillong</option>
<option value="Lady Keane College, Shillong">Lady Keane College, Shillong</option>
<option value="Tura Government College, Tura">Tura Government College, Tura</option>
<option value="Union Christian College, Umiam">Union Christian College, Umiam</option>
<option value="Mizoram University, Aizawl">Mizoram University, Aizawl</option>
<option value="National Institute of Technology, Mizoram">National Institute of Technology, Mizoram</option>
<option value="Regional Institute of Paramedical and Nursing Sciences, Aizawl">Regional Institute of Paramedical and Nursing Sciences, Aizawl</option>
<option value="College of Veterinary Sciences & Animal Husbandry, Selesih">College of Veterinary Sciences & Animal Husbandry, Selesih</option>
<option value="ICFAI University, Aizawl">ICFAI University, Aizawl</option>
<option value="Pachhunga University College, Aizawl">Pachhunga University College, Aizawl</option>
<option value="Mizoram College of Nursing, Aizawl">Mizoram College of Nursing, Aizawl</option>
<option value="St. Xavier's College, Lengpui">St. Xavier's College, Lengpui</option>
<option value="College of Teachers Education, Aizawl">College of Teachers Education, Aizawl</option>
<option value="Govt. Aizawl College, Aizawl">Govt. Aizawl College, Aizawl</option>
<option value="Nagaland University, Lumami">Nagaland University, Lumami</option>
<option value="St. Joseph University, Dimapur">St. Joseph University, Dimapur</option>
<option value="North East Christian University, Dimapur">North East Christian University, Dimapur</option>
<option value="Global Open University, Dimapur">Global Open University, Dimapur</option>
<option value="Dimapur Government College, Dimapur">Dimapur Government College, Dimapur</option>
<option value="Patkai Christian College, Chumukedima">Patkai Christian College, Chumukedima</option>
<option value="Kohima Science College, Jotsoma">Kohima Science College, Jotsoma</option>
<option value="Livingstone Foundation International College, Dimapur">Livingstone Foundation International College, Dimapur</option>
<option value="Immanuel College, Dimapur">Immanuel College, Dimapur</option>
<option value="Mount Mary College, Chumukedima">Mount Mary College, Chumukedima</option>
<option value="Utkal University, Bhubaneswar">Utkal University, Bhubaneswar</option>
<option value="National Institute of Technology, Rourkela">National Institute of Technology, Rourkela</option>
<option value="Indian Institute of Technology, Bhubaneswar">Indian Institute of Technology, Bhubaneswar</option>
<option value="KIIT University, Bhubaneswar">KIIT University, Bhubaneswar</option>
<option value="Xavier University, Bhubaneswar">Xavier University, Bhubaneswar</option>
<option value="Berhampur University, Berhampur">Berhampur University, Berhampur</option>
<option value="Siksha 'O' Anusandhan University, Bhubaneswar">Siksha 'O' Anusandhan University, Bhubaneswar</option>
<option value="Ravenshaw University, Cuttack">Ravenshaw University, Cuttack</option>
<option value="Centurion University of Technology and Management, Paralakhemundi">Centurion University of Technology and Management, Paralakhemundi</option>
<option value="Veer Surendra Sai University of Technology, Sambalpur">Veer Surendra Sai University of Technology, Sambalpur</option>
<option value="Punjab University, Chandigarh">Punjab University, Chandigarh</option>
<option value="Guru Nanak Dev University, Amritsar">Guru Nanak Dev University, Amritsar</option>
<option value="Lovely Professional University, Phagwara">Lovely Professional University, Phagwara</option>
<option value="Thapar Institute of Engineering and Technology, Patiala">Thapar Institute of Engineering and Technology, Patiala</option>
<option value="Chandigarh University, Mohali">Chandigarh University, Mohali</option>
<option value="Punjabi University, Patiala">Punjabi University, Patiala</option>
<option value="I.K. Gujral Punjab Technical University, Jalandhar">I.K. Gujral Punjab Technical University, Jalandhar</option>
<option value="Khalsa College, Amritsar">Khalsa College, Amritsar</option>
<option value="Guru Gobind Singh Medical College, Faridkot">Guru Gobind Singh Medical College, Faridkot</option>
<option value="Shaheed Bhagat Singh State Technical Campus, Ferozepur">Shaheed Bhagat Singh State Technical Campus, Ferozepur</option>
<option value="University of Rajasthan, Jaipur">University of Rajasthan, Jaipur</option>
<option value="Malaviya National Institute of Technology, Jaipur">Malaviya National Institute of Technology, Jaipur</option>
<option value="Indian Institute of Technology, Jodhpur">Indian Institute of Technology, Jodhpur</option>
<option value="BITS Pilani, Pilani">BITS Pilani, Pilani</option>
<option value="Amity University, Jaipur">Amity University, Jaipur</option>
<option value="Manipal University, Jaipur">Manipal University, Jaipur</option>
<option value="Maharaja Ganga Singh University, Bikaner">Maharaja Ganga Singh University, Bikaner</option>
<option value="Banasthali Vidyapith, Banasthali">Banasthali Vidyapith, Banasthali</option>
<option value="Jaipur National University, Jaipur">Jaipur National University, Jaipur</option>
<option value="LNM Institute of Information Technology, Jaipur">LNM Institute of Information Technology, Jaipur</option>
<option value="Sikkim University, Gangtok">Sikkim University, Gangtok</option>
<option value="National Institute of Technology, Sikkim">National Institute of Technology, Sikkim</option>
<option value="SRM University, Sikkim">SRM University, Sikkim</option>
<option value="Sikkim Manipal University, Gangtok">Sikkim Manipal University, Gangtok</option>
<option value="Institute of Hotel Management, Gangtok">Institute of Hotel Management, Gangtok</option>
<option value="Himalayan Pharmacy Institute, Rangpo">Himalayan Pharmacy Institute, Rangpo</option>
<option value="Sikkim Government College, Gangtok">Sikkim Government College, Gangtok</option>
<option value="Damthang Government College, Namchi">Damthang Government College, Namchi</option>
<option value="Namchi Government College, Kamrang">Namchi Government College, Kamrang</option>
<option value="Eklavya Model Residential School, Gangtok">Eklavya Model Residential School, Gangtok</option>
<option value="Tripura University, Agartala">Tripura University, Agartala</option>
<option value="National Institute of Technology, Agartala">National Institute of Technology, Agartala</option>
<option value="ICFAI University, Agartala">ICFAI University, Agartala</option>
<option value="Tripura Medical College, Agartala">Tripura Medical College, Agartala</option>
<option value="Bhavan’s Tripura College of Teacher Education, Agartala">Bhavan’s Tripura College of Teacher Education, Agartala</option>
<option value="Tripura Institute of Technology, Agartala">Tripura Institute of Technology, Agartala</option>
<option value="MBB College, Agartala">MBB College, Agartala</option>
<option value="Holy Cross College, Agartala">Holy Cross College, Agartala</option>
<option value="Agartala Government Medical College, Agartala">Agartala Government Medical College, Agartala</option>
<option value="Women’s College, Agartala">Women’s College, Agartala</option>
<option value="A.P.Shah College, Mumbai">A.P.Shah College, Mumbai</option>
<option value="st_xaviers_mumbai">St. Xavier's College, Mumbai</option>
  <option value="wilson_mumbai">Wilson College, Mumbai</option>
  <option value="ramnarain_ruia_mumbai">Ramnarain Ruia College, Mumbai</option>
  <option value="hr_college_mumbai">HR College of Commerce and Economics, Mumbai</option>
  <option value="jai_hind_mumbai">Jai Hind College, Mumbai</option>
  <option value="mithibai_mumbai">Mithibai College, Mumbai</option>
  <option value="sophia_college_mumbai">Sophia College for Women, Mumbai</option>
  <option value="kj_somaiya_mumbai">K. J. Somaiya College of Arts and Commerce, Mumbai</option>
  <option value="sies_college_mumbai">SIES College of Arts, Science, and Commerce, Mumbai</option>
  <option value="ra_podar_mumbai">R. A. Podar College of Commerce and Economics, Mumbai</option>
  <option value="fergusson_pune">Fergusson College, Pune</option>
  <option value="modern_college_pune">Modern College of Arts, Science, and Commerce, Pune</option>
  <option value="symbiosis_pune">Symbiosis College of Arts and Commerce, Pune</option>
  <option value="ness_wadia_pune">Ness Wadia College of Commerce, Pune</option>
  <option value="brihan_maharashtra_pune">Brihan Maharashtra College of Commerce, Pune</option>
  <option value="ict_mumbai">Institute of Chemical Technology, Mumbai</option>
  <option value="govt_engg_aurangabad">Government College of Engineering, Aurangabad</option>
  <option value="kb_patilsatara">Karmaveer Bhaurao Patil College, Satara</option>
  <option value="mgm_engg_navi_mumbai">MGM's College of Engineering and Technology, Navi Mumbai</option>
  <option value="sinhgad_engg_pune">Sinhgad College of Engineering, Pune</option>







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
            <label>Xth Percentage:(If Available)</label>
            <input type="text" name="xthPercentage" value={formData.xthPercentage} onChange={handleChange} />
            {errors.xthPercentage && <p className="error">{errors.xthPercentage}</p>}
          </div>
        </div>
        <div className="form-row-inline">
          <div className="form-row">
            <label>XIIth Percentage:(If Available)</label>
            <input type="text" name="xiithPercentage" value={formData.xiithPercentage} onChange={handleChange} />
            {errors.xiithPercentage && <p className="error">{errors.xiithPercentage}</p>}
          </div>
          <div className="form-row">
            <label>UG Percentage:(If Available)</label>
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
            <label>Reason of Leaving State:</label>
            <select name="reasonOfLeavingState" value={formData.reasonOfLeavingState} onChange={handleChange}>
              <option value="">Select Reason</option>
              <option value="Education">Education</option>
              <option value="Good Culture">Good Culture</option>
              <option value="Not Available">Not Available</option>

            </select>
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
            <label>Reasons for Denying Scholarship before:(If Available)</label>
            <select name="reasonForDenyingScholarship" value={formData.reasonForDenyingScholarship} onChange={handleChange}>
              <option value="">Select Reason</option>
              <option value="Incomplete Documents">Incomplete Documents</option>
              <option value="Ineligible">Ineligible</option>
              <option value="Not Available">Not Available</option>
             
            </select>
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
            <label>Xth Marksheet:(If Available)</label>
            <input type="file" name="xthMarksheet" onChange={handleFileChange} />
            {errors.xthMarksheet && <p className="error">{errors.xthMarksheet}</p>}
          </div>
          <div className="form-row">
            <label>XIIth Marksheet:(If Available)</label>
            <input type="file" name="xiithMarksheet" onChange={handleFileChange} />
            {errors.xiithMarksheet && <p className="error">{errors.xiithMarksheet}</p>}
          </div>
        </div>
        <div className="form-row-inline">
          <div className="form-row">
            <label>UG Certificate:(If Available)</label>
            <input type="file" name="ugCertificate" onChange={handleFileChange} />
            {errors.ugCertificate && <p className="error">{errors.ugCertificate}</p>}
          </div>
          <div className="form-row">
            <label>PG Certificate:(If Available)</label>
            <input type="file" name="pgCertificate" onChange={handleFileChange} />
          </div>
        </div>
        <div className="form-row-inline">
          <div className="form-row">
            <label>Birth Certificate:(Mandatory)</label>
            <input type="file" name="birthCertificate" onChange={handleFileChange} />
            {errors.birthCertificate && <p className="error">{errors.birthCertificate}</p>}
          </div>
          <div className="form-row">
            <label>Community Certificate:(If Available)</label>
            <input type="file" name="communityCertificate" onChange={handleFileChange} />
            {errors.communityCertificate && <p className="error">{errors.communityCertificate}</p>}
          </div>
        </div>
        <div className="form-row-inline">
          <div className="form-row">
            <label>Aadhar Card:(Mandatory)</label>
            <input type="file" name="aadharCard" onChange={handleFileChange} />
            {errors.aadharCard && <p className="error">{errors.aadharCard}</p>}
          </div>
          <div className="form-row">
            <label>ID Card:(Mandatory)</label>
            <input type="file" name="idCard" onChange={handleFileChange} />
            {errors.idCard && <p className="error">{errors.idCard}</p>}
          </div>
        </div>
        <div className="form-row">
          <label>Fee Receipt:(Mandatory)</label>
          <input type="file" name="feeReceipt" onChange={handleFileChange} />
          {errors.feeReceipt && <p className="error">{errors.feeReceipt}</p>}
        </div>
      </div>

      <div className="form-row">
      <button className="submit-button" type="submit">
        Submit 
      </button>
      </div>
    </form>
  );
};

export default Apply;