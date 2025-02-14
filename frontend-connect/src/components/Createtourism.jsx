import React, { useState } from "react";
import { TextField, Button, Typography, Box, MenuItem, Select, InputLabel, FormControl } from "@mui/material";

const CreateTourism = () => {
  const [name, setName] = useState("");  // ✅ Changed from Name to name
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
    const tourismData = {
      name,
      description,
      locationUrl,
      embedUrl,
      district,
    };
  
    try {
      const response = await fetch("http://localhost:5000/tourism/createtourism", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tourismData),
      });
  
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
  
      alert("Tourism entry submitted successfully!");
      setName(""); setDescription(""); setLocationUrl(""); setEmbedUrl(""); setDistrict("");
    } catch (error) {
      alert("Error submitting tourism entry: " + error.message);
    }
  };
  

  return (
    <Box sx={{ p: 3, maxWidth: "800px", mx: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Create Tourism Entry
      </Typography>

      <TextField
      fullWidth
      label="Tourism Name"
      value={name}  // ✅ Changed from Name to name
      onChange={(e) => setName(e.target.value)}
      margin="normal"
      />
      
      {/* Description Field */}
      <TextField
        fullWidth
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        margin="normal"
        multiline
        rows={4}
      />

      {/* Location URL Field */}
      <TextField
        fullWidth
        label="Location URL"
        value={locationUrl}
        onChange={(e) => setLocationUrl(e.target.value)}
        margin="normal"
      />

      {/* Embed URL Field */}
      <TextField
        fullWidth
        label="Embed URL"
        value={embedUrl}
        onChange={(e) => setEmbedUrl(e.target.value)}
        margin="normal"
      />

      {/* Kerala District Dropdown */}
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

      {/* Submit Button */}
      <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
        Submit
      </Button>
    </Box>
  );
};

export default CreateTourism;
