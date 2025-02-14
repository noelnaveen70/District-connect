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

const EditJobVacancy = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [lastDate, setLastDate] = useState("");
  const [district, setDistrict] = useState("");

  const keralaDistricts = [
    "Alappuzha",
    "Ernakulam",
    "Idukki",
    "Kottayam",
    "Kozhikode",
    "Malappuram",
    "Palakkad",
    "Pathanamthitta",
    "Thrissur",
    "Trivandrum",
    "Wayanad",
    "Kollam",
    "Kannur",
    "Kasargod",
  ];

  useEffect(() => {
    fetch(`http://localhost:5000/job/details/${id}`)
      .then((res) => res.json())
      .then((data) => {
        
        setCompanyName(data.companyName);
        setJobRole(data.jobRole);
        setLastDate(data.lastDate);
        setDistrict(data.districtName);
      })
      .catch((error) => console.error("Error fetching job details:", error));
  }, [id]);

  const handleSubmit = async () => {
    const updatedJob = { companyName, jobRole, lastDate, districtName: district };

    try {
      const response = await fetch(`http://localhost:5000/job/updatejob/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedJob),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message);

      alert("Job vacancy updated successfully!");
      navigate("/Viewjob");
    } catch (error) {
      alert("Error updating job vacancy: " + error.message);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: "800px", mx: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Edit Job Vacancy
      </Typography>

      <TextField
        fullWidth
        label="Company Name"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Job Role"
        value={jobRole}
        onChange={(e) => setJobRole(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Last Date"
        type="date"
        value={lastDate}
        onChange={(e) => setLastDate(e.target.value)}
        margin="normal"
        InputLabelProps={{ shrink: true }}
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

      <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
        Update Job
      </Button>
    </Box>
  );
};

export default EditJobVacancy;
