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
import Scholarshiplist from './pages/scholarshiplist/Scholarshiplist'; // Import ScholarshipList
import Availablescholarship from './pages/availablescholarship/Availablescholarship';

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
        <Route path="/about" element={<HeaderLayout><About /></HeaderLayout>} />
        <Route path="/profile" element={<HeaderLayout><Profile /></HeaderLayout>} />
        <Route path="/login" element={<HeaderLayout><Login /></HeaderLayout>} />
        <Route path="/signup" element={<HeaderLayout><Register /></HeaderLayout>} /> {/* Corrected route for /signup */}
        <Route path="/apply" element={<HeaderLayout><Apply /></HeaderLayout>} />
        <Route path="/view" element={<HeaderLayout><View /></HeaderLayout>} />
        <Route path="/scholarship-history" element={<HeaderLayout><Scholarshiphistory /></HeaderLayout>} />
        <Route path="/instituteHome" element={<><Menu /><InstituteHome /></>} />
        <Route path="/adminhome/:state" element={<><Menu /><AdminHome /></>} />
        <Route path="/addscholarship/:state" element={<><Menu /><AddScholarship /></>} />
        <Route path="/instituteverification" element={<><Menu /><Instituteverification /></>} />
        <Route path="/institutelist" element={<><Menu /><InstituteList /></>} />
        <Route path="/studentverification" element={<><Menu /><Studentverification /></>} />
        <Route path="/scholarshiplist/:state" element={<><Menu /><Scholarshiplist /></>} /> {/* Added ScholarshipList route */}
        <Route path="/availablescholarship" element={<><Menu /><Availablescholarship /></>} /> 
      </Routes>
    </AuthProvider>
  );
}

export default App;
