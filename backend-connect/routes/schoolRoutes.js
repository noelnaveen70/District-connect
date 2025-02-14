const express = require('express');
const School = require('../model/school'); // Import the School model

const router = express.Router();

// Create a new school
router.post('/createschool', async (req, res) => {
    console.log("Received Data:", req.body);
    try {
        const { name, description, locationUrl, embedUrl, district } = req.body;

        if (!name || !description || !locationUrl || !embedUrl || !district) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newSchool = new School({ name, description, locationUrl, embedUrl, district });
        await newSchool.save();

        res.status(201).json({ message: 'School created successfully', newSchool });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Fetch all schools
router.get('/displayschools', async (req, res) => {
    try {
        const schools = await School.find().sort({ createdAt: -1 });
        res.status(200).json(schools);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Fetch details of a single school by ID
router.get('/details/:id', async (req, res) => {
    try {
        const school = await School.findById(req.params.id);
        if (!school) {
            return res.status(404).json({ message: 'School not found' });
        }
        res.status(200).json(school);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Update a school by ID
router.put('/updateschool/:id', async (req, res) => {
    try {
        const { name, description, locationUrl, embedUrl, district } = req.body;
        const updatedSchool = await School.findByIdAndUpdate(
            req.params.id,
            { name, description, locationUrl, embedUrl, district },
            { new: true }
        );

        if (!updatedSchool) {
            return res.status(404).json({ message: 'School not found' });
        }

        res.status(200).json({ message: 'School updated successfully', updatedSchool });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Delete a school by ID
router.delete('/deleteschool/:id', async (req, res) => {
    try {
        const deletedSchool = await School.findByIdAndDelete(req.params.id);

        if (!deletedSchool) {
            return res.status(404).json({ message: 'School not found' });
        }

        res.status(200).json({ message: 'School deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
