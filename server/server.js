const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./src/database/db');
const cors = require('cors');
const path = require('path');
const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// Static folder for file uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Import the routes
const authRoutes = require('./src/routes/auth');
/*const authRoutes = require('./src/routes/auth');*/
const formRoutes = require('./src/routes/formRoutes');
const scholarshipRoutes = require('./src/routes/scholarshipRoutes');
const adminRoutes = require('./src/routes/admin');
const scholarshipHistory = require('./src/routes/scholarshipHistory');
const verificationinstitute = require('./src/routes/verificationinstitute');
const verifyhomestate = require('./src/routes/verifyhomestate');
const verifyotherstate = require('./src/routes/verifyotherstate');
const studentrecord = require('./src/routes/studentrecord');
const studenthistory = require('./src/routes/studenthistory');
const usercountinstitute = require('./src/routes/usercountinstitute');
const scholarshipcount = require('./src/routes/scholarshipcount');
const profile = require('./src/routes/profile');
const useradmincount = require('./src/routes/useradmincount');


// Use the routes
app.use('/api/users',authRoutes);
/*app.use('/api/users', authRoutes);*/
app.use('/api/form', formRoutes);
app.use('/api/scholarships', scholarshipRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/scholarshipHistory', scholarshipHistory);
app.use('/api/forms', verificationinstitute);
app.use('/api/forms', verifyhomestate); 
app.use('/api/forms', verifyotherstate); 
app.use('/api/studentrecord',studentrecord);
app.use('/api/studenthistory', studenthistory);
app.use('/api',usercountinstitute);
app.use('/api/scholarshipcount',scholarshipcount);
app.use('/api', profile);
app.use('/api/admincount',useradmincount);



// IP and port setup
const port = process.env.PORT || 5000;
const host = process.env.HOST || '0.0.0.0';  // Fetch IP from .env file or fallback to 0.0.0.0

app.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});