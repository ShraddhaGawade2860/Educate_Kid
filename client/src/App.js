import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Profile from './pages/profile/Profile';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Apply from './pages/apply/Apply';
import View from './pages/view/View';
import { AuthProvider } from './pages/context/Authcontext';
import Landing from './pages/landing/Landing';
import InstituteHome from './pages/institutehome/Institutehome';
import AdminHome from './pages/adminhome/Adminhome';
import Menu from './pages/menu/Menu';
import AddScholarship from './pages/addscholarship/Addscholarship';
import Scholarshiphistory from './pages/scholarshiphistory/Scholarshiphistory';
import Instituteverification from './pages/instituteverification/Instituteverification';
import InstituteList from './pages/institutelist/Institutelist';
import Studentverification from './pages/studentverification/Studentverification';
import Scholarshiplist from './pages/scholarshiplist/Scholarshiplist';
import Availablescholarship from './pages/availablescholarship/Availablescholarship';
import Edituser from './pages/edituser/Edituser';
import UserData from './pages/userdata/Userdata';
import StudentList from './pages/studentlist/Studentlist';
import Verifyhome from './pages/verifyhome/Verifyhome';
import Verifyother from './pages/verifyother/verifyother';
import Studentrecord from './pages/studentrecord/Studentrecord';
import Studenthistory from './pages/studenthistory/Studenthistory';
import Instituteprofile from './pages/instituteprofile/Instituteprofile';
import Editinstitute from './pages/editinstitute/Editinstitute';
import Userterms from './pages/userterms/Userterms';
import Userprivacy from './pages/userprivacy/Userprivacy';
import Instituteterms from './pages/instituteterms/Instituteterms';
import Instituteprivacy from './pages/instituteprivacy/Instituteprivacy';

const HeaderLayout = ({ children }) => (
  <>
    <Header />
    {children}
  </>
);

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HeaderLayout><Landing /></HeaderLayout>} />
        <Route path="/home" element={<HeaderLayout><Home /></HeaderLayout>} />
        <Route path="/userterms" element={<HeaderLayout><Userterms /></HeaderLayout>} />
        <Route path="/userprivacy" element={<HeaderLayout><Userprivacy /></HeaderLayout>} />
        <Route path="/about" element={<HeaderLayout><About /></HeaderLayout>} />
        <Route path="/profile" element={<HeaderLayout><Profile /></HeaderLayout>} />
        <Route path="/login" element={<HeaderLayout><Login /></HeaderLayout>} />
        <Route path="/signup" element={<HeaderLayout><Register /></HeaderLayout>} />
        <Route path="/register" element={<HeaderLayout><Register /></HeaderLayout>} /> {/* Added route for /register */}
        <Route path="/apply" element={<HeaderLayout><Apply /></HeaderLayout>} />
        <Route path="/view" element={<HeaderLayout><View /></HeaderLayout>} />
        <Route path="/edituser" element={<HeaderLayout><Edituser/></HeaderLayout>} />
        <Route path="/scholarship-history" element={<HeaderLayout><Scholarshiphistory /></HeaderLayout>} />
        <Route path="/instituteHome" element={<><Menu /><InstituteHome /></>} />
        <Route path="/instituteterms" element={<><Menu /><Instituteterms /></>} />
        <Route path="/instituteprivacy" element={<><Menu /><Instituteprivacy /></>} />
        <Route path="/adminhome/:state" element={<><Menu /><AdminHome /></>} />
        <Route path="/addscholarship/:state" element={<><Menu /><AddScholarship /></>} />
        <Route path="/instituteverification" element={<><Menu /><Instituteverification /></>} />
        <Route path="/institutelist" element={<><Menu /><InstituteList /></>} />
        <Route path="/studentverification" element={<><Menu /><Studentverification /></>} />
        <Route path="/scholarshiplist/:state" element={<><Menu /><Scholarshiplist /></>} />
        <Route path="/userdata/:formId" element={<><Menu /><UserData /></>} />
        <Route path="/availablescholarship" element={<><Menu /><Availablescholarship /></>} />
        <Route path="/studentlist/:state" element={<><Menu /><StudentList /></>} />
        <Route path="/verifyhome/:formId" element={<><Menu /><Verifyhome /></>} />
        <Route path="/verifyother/:formId" element={<><Menu /><Verifyother /></>} />
        <Route path="/studentrecord" element={<><Menu /><Studentrecord /></>} />
        <Route path="/studenthistory/:state" element={<><Menu /><Studenthistory /></>} />
        <Route path="/instituteprofile" element={<><Menu /><Instituteprofile /></>} />
        <Route path="/editinstitute" element={<><Menu /><Editinstitute /></>} />


      </Routes>
    </AuthProvider>
  );
}

export default App;
