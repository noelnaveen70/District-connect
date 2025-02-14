const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the JobVacancy Schema
const jobVacancySchema = new Schema({
  companyName: {
    type: String,
    required: true,
    trim: true
  },
  jobRole: {
    type: String,
    required: true,
    trim: true
  },
  lastDate: {
    type: Date,
    required: true
  },
  districtName: {
    type: String,
    required: true
  }
}, { timestamps: true });

// Create and export the JobVacancy model
const JobVacancy = mongoose.model('jobVacancy', jobVacancySchema);

module.exports = JobVacancy;
