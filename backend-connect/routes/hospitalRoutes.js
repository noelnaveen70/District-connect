const express = require("express");
const router = express.Router();
const Hospital = require("../model/hospital");

//  Corrected: Creating a new hospital entry
router.post("/createhospital", async (req, res) => {
  try {
    const { name, description, locationUrl, embedUrl, district } = req.body;

    if (!name || !description || !district) {
      return res.status(400).json({ error: "Name, description, and district are required" });
    }

    const newHospital = new Hospital({ name, description, locationUrl, embedUrl, district });
    await newHospital.save();

    res.status(201).json({ message: "Hospital entry created successfully", hospital: newHospital });
  } catch (error) {
    res.status(500).json({ error: "Error creating hospital entry", details: error.message });
  }
});

//  Fetch all hospitals
router.get("/displayhospitals", async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    res.status(200).json(hospitals);
  } catch (error) {
    res.status(500).json({ error: "Error fetching hospital data", details: error.message });
  }
});

//  Fetch hospital details by ID
router.get("/details/:id", async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    if (!hospital) return res.status(404).json({ message: "Hospital not found" });
    res.status(200).json(hospital);
  } catch (error) {
    res.status(500).json({ error: "Error fetching hospital details", details: error.message });
  }
});

//  Update hospital details
router.put("/updatehospital/:id", async (req, res) => {
  try {
    const updatedHospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedHospital) return res.status(404).json({ message: "Hospital not found" });
    res.status(200).json({ message: "Hospital updated successfully", hospital: updatedHospital });
  } catch (error) {
    res.status(500).json({ error: "Error updating hospital", details: error.message });
  }
});

//  Delete hospital entry
router.delete("/deletehospital/:id", async (req, res) => {
  try {
    const deletedHospital = await Hospital.findByIdAndDelete(req.params.id);
    if (!deletedHospital) return res.status(404).json({ message: "Hospital not found" });
    res.status(200).json({ message: "Hospital deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting hospital", details: error.message });
  }
});

module.exports = router;
