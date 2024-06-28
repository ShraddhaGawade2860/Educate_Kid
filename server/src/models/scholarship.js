const mongoose = require('mongoose');

const scholarshipSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  eligibility: { type: String, required: true },
  benefits: { type: String, required: true },
  documents: { type: String, required: true },
  applyProcess: { type: String, required: true },
  class: { type: String, required: true },
  gender: { type: String, required: true },
  state: { type: String, required: true }
});

const Scholarship = mongoose.model('Scholarship', scholarshipSchema);

module.exports = Scholarship;
