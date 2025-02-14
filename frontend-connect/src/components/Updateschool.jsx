import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

const EditSchool = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [district, setDistrict] = useState("");
  const [locationUrl, setLocationUrl] = useState("");
  const [embedUrl, setEmbedUrl] = useState("");

  const keralaDistricts = [
    "Alappuzha", "Ernakulam", "Idukki", "Kottayam", "Kozhikode", 
    "Malappuram", "Palakkad", "Pathanamthitta", "Thrissur", "Trivandrum", 
    "Wayanad", "Kollam", "Kannur", "Kasargod"
  ];

  useEffect(() => {
    fetch(`http://localhost:5000/school/details/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setName(data.name);
        setDescription(data.description);
        setDistrict(data.district);
        setLocationUrl(data.locationUrl || "");
        setEmbedUrl(data.embedUrl || "");
      })
      .catch((error) => console.error("Error fetching school details:", error));
  }, [id]);

  const handleSubmit = async () => {
    const updatedSchool = { name, description, district, locationUrl, embedUrl };

    try {
      const response = await fetch(`http://localhost:5000/school/updateschool/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedSchool),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message);

      alert("School updated successfully!");
      navigate("/ViewSchool");
    } catch (error) {
      alert("Error updating school: " + error.message);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: "800px", mx: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Edit School
      </Typography>

      <TextField
        fullWidth
        label="School Name"
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
        rows={3}
      />

      <FormControl fullWidth margin="normal">
        <InputLabel>District</InputLabel>
        <Select value={district} onChange={(e) => setDistrict(e.target.value)} label="District">
          {keralaDistricts.map((dist, index) => (
            <MenuItem key={index} value={dist}>
              {dist}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Location URL"
        value={locationUrl}
        onChange={(e) => setLocationUrl(e.target.value)}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Embed URL (YouTube/Map)"
        value={embedUrl}
        onChange={(e) => setEmbedUrl(e.target.value)}
        margin="normal"
      />

      <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
        Update School
      </Button>
    </Box>
  );
};

export default EditSchool;
