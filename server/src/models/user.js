const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, sparse: true },
    contactnumber: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: Number, required: true }, // 0 for user, 1 for institute, 2 for admin
    state: { type: String }, // Only required for institutes and admin
    institutecode: { type: String }, // Only required for institutes
    instituteCertificate: { type: String }, // File path for institute certificate
    accreditationCertificate: { type: String }, // File path for accreditation certificate
    affiliationCertificate: { type: String }, // File path for affiliation certificate
    verified: { type: Boolean, default: false }, // Verification status
    rejected: { type: Boolean, default: false }, // Rejection status
    gender: { type: String } ,// Gender field
    profileImage: { type: String } // Profile image field
});

/*UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};*/

module.exports = mongoose.model('User', UserSchema);