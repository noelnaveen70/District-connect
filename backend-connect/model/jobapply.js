const mongoose = require("mongoose");

const JobApplicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  district: { type: String, required: true },
  jobRole: { type: String, required: true },
  companyName: { type: String, required: true },
  resume: { type: String, required: true }, // Store file path
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("jobapplications", JobApplicationSchema);
