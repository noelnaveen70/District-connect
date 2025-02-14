const express = require("express");
const multer = require("multer");
const JobApplication = require("../model/jobapply");
const cloudinary = require("../config/cloudinary"); // Correct import

const router = express.Router();

// Set up multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });


// Convert cloudinary uploader to a promise-based function
const streamUpload = (buffer) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "job_resumes" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(buffer);
    });
  };


router.post("/job-apply", upload.single("resume"), async (req, res) => {
  try {
    console.log("Received Request Body:", req.body);
    console.log("Received File:", req.file);

    if (!req.file) {
      return res.status(400).json({ error: "Image is required" });
    }

    // Upload image to Cloudinary
    const result = await streamUpload(req.file.buffer);
    console.log("Uploaded Image:", result.secure_url);

    // Create new menu item
    const newApplication  = new JobApplication({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      district: req.body.district,
      jobRole: req.body.jobRole,
      companyName: req.body.companyName,
      resume: result.secure_url, // Store Cloudinary image URL
    });


    // Save to database
    await newApplication.save();
    res.status(201).json({ message: "Application submitted successfully", JobApplication: newApplication });
  } catch (error) {
    console.error("Error creating menu item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



router.get("/applications", async (req, res) => {
  try {
    const applications = await JobApplication.find();
    res.status(200).json(applications);
  } catch (error) {
    console.error("Error fetching job applications:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.delete("/applications/:id", async (req, res) => {
  try {
    const deletedApplication = await JobApplication.findByIdAndDelete(req.params.id);
    if (!deletedApplication) return res.status(404).json({ error: "Application not found" });
    res.json({ message: "Application deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete application" });
  }
});


module.exports = router;
