import React, { useState } from "react";
import { TextField, Button, Typography, Box, MenuItem, Select, InputLabel, FormControl } from "@mui/material";

const CreateHospital = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [locationUrl, setLocationUrl] = useState("");
  const [embedUrl, setEmbedUrl] = useState("");
  const [district, setDistrict] = useState("");

  const keralaDistricts = [
    "Alappuzha", "Ernakulam", "Idukki", "Kottayam", "Kozhikode", 
    "Malappuram", "Palakkad", "Pathanamthitta", "Thrissur", "Trivandrum", 
    "Wayanad", "Kollam", "Kannur", "Kasargod"
  ];

  const handleSubmit = async () => {
    const hospitalData = {
      name,
      description,
      locationUrl,
      embedUrl,
      district,
    };

    try {
      const response = await fetch("http://localhost:5000/hospital/createhospital", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(hospitalData),
      });

      if (!response.ok) {
        const errorResponse = await response.text();
        throw new Error(`Server error: ${errorResponse}`);
      }

      const result = await response.json();
      alert("Hospital entry submitted successfully!");

      setName(""); 
      setDescription(""); 
      setLocationUrl(""); 
      setEmbedUrl(""); 
      setDistrict("");
      
    } catch (error) {
      alert("Error submitting hospital entry: " + error.message);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: "800px", mx: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Create Hospital Entry
      </Typography>

      <TextField
        fullWidth
        label="Hospital Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        margin="normal"
      />
      
      <TextField
        fullWidth
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        margin="normal"
        multiline
        rows={4}
      />

      <TextField
        fullWidth
        label="Location URL"
        value={locationUrl}
        onChange={(e) => setLocationUrl(e.target.value)}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Embed URL"
        value={embedUrl}
        onChange={(e) => setEmbedUrl(e.target.value)}
        margin="normal"
      />

      <FormControl fullWidth margin="normal">
        <InputLabel>District</InputLabel>
        <Select
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          label="District"
        >
          {keralaDistricts.map((district, index) => (
            <MenuItem key={index} value={district}>
              {district}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
        Submit
      </Button>
    </Box>
  );
};

export default CreateHospital;
