const mongoose = require('mongoose');

const scholarshipSchema = new mongoose.Schema({
  type: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  eligibility: { type: String, required: true },
  benefits: { type: String, required: true },
  documents: { type: String, required: true },
  applyProcess: { type: String, required: true },
  class: { type: String, required: true },
  gender: { type: String, required: true },
  state: { type: String, required: true },
  logo: { type: String } // Path to the scholarship logo
});

const Scholarship = mongoose.model('Scholarship', scholarshipSchema);

module.exports = Scholarship;
