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

const EditHospital = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [district, setDistrict] = useState("");
  const [locationUrl, setLocationUrl] = useState("");
  const [embedUrl, setEmbedUrl] = useState("");
  const [description, setDescription] = useState("");  // ✅ Added description field
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHospitalDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/hospital/details/${id}`);

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setName(data.name || "");
        setDistrict(data.district || "");
        setLocationUrl(data.locationUrl || "");
        setEmbedUrl(data.embedUrl || "");
        setDescription(data.description || "");  // ✅ Fetch description
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchHospitalDetails();
  }, [id]);

  const handleSubmit = async () => {
    const updatedHospital = { name, district, locationUrl, embedUrl, description };  // ✅ Include description

    try {
      const response = await fetch(`http://localhost:5000/hospital/updatehospital/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedHospital),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to update");

      alert("Hospital details updated successfully!");
      navigate("/Viewhospital");
    } catch (error) {
      alert("Error updating hospital details: " + error.message);
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Box sx={{ p: 3, maxWidth: "800px", mx: "auto" }}>
      <Typography variant="h4" gutterBottom>Edit Hospital Details</Typography>

      <TextField fullWidth label="Name" value={name} onChange={(e) => setName(e.target.value)} margin="normal" />

      <FormControl fullWidth margin="normal">
        <InputLabel>District</InputLabel>
        <Select value={district} onChange={(e) => setDistrict(e.target.value)} label="District">
          {["Alappuzha", "Ernakulam", "Idukki", "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thrissur", "Trivandrum", "Wayanad", "Kollam", "Kannur", "Kasargod"].map((dist, index) => (
            <MenuItem key={index} value={dist}>{dist}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField fullWidth label="Location URL" value={locationUrl} onChange={(e) => setLocationUrl(e.target.value)} margin="normal" />
      <TextField fullWidth label="Embed URL (Google Maps)" value={embedUrl} onChange={(e) => setEmbedUrl(e.target.value)} margin="normal" />
      
      {/* ✅ Added Description Field */}
      <TextField
        fullWidth
        label="Description"
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        margin="normal"
      />

      <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>Update Hospital Details</Button>
    </Box>
  );
};

export default EditHospital;
