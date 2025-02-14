const express = require("express");
const JobVacancy = require("../model/jobVacancy"); // Import JobVacancy model

const router = express.Router();

// ➤ Create a Job Vacancy
router.post("/createjob", async (req, res) => {
  try {
    const { companyName, jobRole, lastDate, districtName } = req.body;
    
    if (!companyName || !jobRole || !lastDate || !districtName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const jobVacancy = new JobVacancy({ companyName, jobRole, lastDate, districtName });
    await jobVacancy.save();

    res.status(201).json({ message: "Job vacancy created", jobVacancy });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ➤ Fetch All Job Vacancies
router.get("/displayjobs", async (req, res) => {
  try {
    const jobVacancies = await JobVacancy.find().sort({ createdAt: -1 });
    res.status(200).json(jobVacancies);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ➤ Fetch Job Vacancy by ID
router.get("/details/:id", async (req, res) => {
  try {
    const jobVacancy = await JobVacancy.findById(req.params.id);
    if (!jobVacancy) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json(jobVacancy);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ➤ Update Job Vacancy
router.put("/updatejob/:id", async (req, res) => {
  try {
    const { companyName, jobRole, lastDate, districtName } = req.body;
    const updatedJob = await JobVacancy.findByIdAndUpdate(
      req.params.id,
      { companyName, jobRole, lastDate, districtName },
      { new: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ message: "Job updated successfully", updatedJob });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ➤ Delete Job Vacancy
router.delete("/deletejob/:id", async (req, res) => {
  try {
    const deletedJob = await JobVacancy.findByIdAndDelete(req.params.id);

    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
