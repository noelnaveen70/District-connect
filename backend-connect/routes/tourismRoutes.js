const express = require('express');
const Tourism = require('../model/tourism'); // Import the Tourism model

const router = express.Router();

// Create a new tourism location
router.post('/createtourism', async (req, res) => {
    console.log("Received Data:", req.body);
  try {
    const { name, description, locationUrl, embedUrl, district } = req.body;

    if (!name || !description || !locationUrl || !embedUrl || !district) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newTourism = new Tourism({ name, description, locationUrl, embedUrl, district });
    await newTourism.save();

    res.status(201).json({ message: 'Tourism location created', newTourism });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Fetch all tourism locations
router.get('/displaytourism', async (req, res) => {
  try {
    const tourisms = await Tourism.find().sort({ createdAt: -1 });
    res.status(200).json(tourisms);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Fetch details of a single tourism location by ID
router.get('/details/:id', async (req, res) => {
  try {
    const tourism = await Tourism.findById(req.params.id);
    if (!tourism) {
      return res.status(404).json({ message: 'Tourism location not found' });
    }
    res.status(200).json(tourism);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update a tourism location by ID
router.put('/updatetourism/:id', async (req, res) => {
  try {
    const { name, description, locationUrl, embedUrl, district } = req.body;
    const updatedTourism = await Tourism.findByIdAndUpdate(
      req.params.id,
      { name, description, locationUrl, embedUrl, district },
      { new: true }
    );

    if (!updatedTourism) {
      return res.status(404).json({ message: 'Tourism location not found' });
    }

    res.status(200).json({ message: 'Tourism location updated successfully', updatedTourism });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete a tourism location by ID
router.delete('/deletetourism/:id', async (req, res) => {
  try {
    const deletedTourism = await Tourism.findByIdAndDelete(req.params.id);

    if (!deletedTourism) {
      return res.status(404).json({ message: 'Tourism location not found' });
    }

    res.status(200).json({ message: 'Tourism location deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
