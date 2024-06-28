const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const InstituteSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contactnumber: { type: String, required: true },
    password: { type: String, required: true },
    state: { type: String, required: true },
});

InstituteSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

InstituteSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('Institute', InstituteSchema);
