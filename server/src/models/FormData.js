const mongoose = require('mongoose');

const FormDataSchema = new mongoose.Schema({
    name: String,
    dateOfBirth: Date,
    gender: String,
    contactNo: String,
    email: String,
    religion: String,
    institutionName: String,
    state: String,
    course: String,
    year: String,
    enrollmentNo: String,
    xthPercentage: String,
    xiithPercentage: String,
    ugPercentage: String,
    address: String,
    homeState: String,
    reasonOfLeavingState: String,
    scholarshipName: String,
    reasonForDenyingScholarship: String,
    disabilities: String,
    disabilityDetails: String,
    disabilityCertificate: String,
    xthMarksheet: String,
    xiithMarksheet: String,
    ugCertificate: String,
    pgCertificate: String,
    birthCertificate: String,
    communityCertificate: String,
    aadharCard: String,
    idCard: String,
    feeReceipt: String,
    instituteVerified: { type: Number, default: 0 }, // 0 = pending, 1 = approved, 2 = rejected
    homeStateVerified: { type: Number, default: 0 }, // 0 = pending, 1 = approved, 2 = rejected
    otherStateVerified: { type: Number, default: 0 }, // 0 = pending, 1 = approved, 2 = rejected
    finalStatus: { type: Number, default: 0 }, // 0 = pending, 1 = approved, 2 = rejected
    rejectReason: String // Field to store the rejection reason
});

FormDataSchema.pre('save', function(next) {
    if (this.instituteVerified === 2 || this.homeStateVerified === 2 || this.otherStateVerified === 2) {
        this.finalStatus = 2;
    } else if (this.instituteVerified === 1 && this.homeStateVerified === 1 && this.otherStateVerified === 1) {
        this.finalStatus = 1;
    } else {
        this.finalStatus = 0;
    }
    next();
});

module.exports = mongoose.model('FormData', FormDataSchema);
