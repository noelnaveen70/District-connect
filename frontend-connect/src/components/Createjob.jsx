import React, { useState } from "react";
import { TextField, Button, Typography, Box, MenuItem, Select, InputLabel, FormControl } from "@mui/material";

const CreateJobVacancy = () => {
  const [companyName, setCompanyName] = useState("");
  const [jobRole, setRole] = useState("");
  const [lastDate, setLastDate] = useState("");
  const [district, setDistrict] = useState("");

  const keralaDistricts = [
    "Alappuzha", "Ernakulam", "Idukki", "Kottayam", "Kozhikode", 
    "Malappuram", "Palakkad", "Pathanamthitta", "Thrissur", "Trivandrum", 
    "Wayanad", "Kollam", "Kannur", "Kasargod"
  ];

  const handleSubmit = async () => {
    const jobData = { companyName, jobRole, lastDate, districtName: district };
  
    try {
      const response = await fetch("http://localhost:5000/job/createjob", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobData),
      });
      
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
  
      alert("Job vacancy submitted successfully!");
      setCompanyName(""); setRole(""); setLastDate(""); setDistrict("");
    } catch (error) {
      alert("Error submitting job vacancy: " + error.message);
    }
  };
  

  return (
    <Box sx={{ p: 3, maxWidth: "800px", mx: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Create Job Vacancy
      </Typography>

      <TextField fullWidth label="Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} margin="normal" />
      <TextField fullWidth label="Job Role" value={jobRole} onChange={(e) => setRole(e.target.value)} margin="normal" />
      <TextField fullWidth label="Last Date" type="date" value={lastDate} onChange={(e) => setLastDate(e.target.value)} margin="normal" InputLabelProps={{ shrink: true }} />

      <FormControl fullWidth margin="normal">
        <InputLabel>District</InputLabel>
        <Select value={district} onChange={(e) => setDistrict(e.target.value)} label="District">
          {keralaDistricts.map((district, index) => (
            <MenuItem key={index} value={district}>{district}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
        Submit
      </Button>
    </Box>
  );
};

export default CreateJobVacancy;
