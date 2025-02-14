import React, { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ViewJobsPage = () => {
  const navigate = useNavigate();
  const [jobVacancies, setJobVacancies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/job/displayjobs")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setJobVacancies(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job vacancy?")) return;

    try {
      const response = await fetch(`http://localhost:5000/job/deletejob/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete job vacancy");
      }

      setJobVacancies(jobVacancies.filter((job) => job._id !== id));
      alert("Job vacancy deleted successfully!");
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("Error deleting job vacancy.");
    }
  };

  const handleUpdate = (id) => {
    navigate(`/edit-job/${id}`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Job Vacancies
      </Typography>

      <Grid container spacing={2}>
        {jobVacancies.map((job) => (
          <Grid item xs={12} sm={6} md={4} key={job._id}>
            <Card sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
              <CardContent>
                <Typography variant="h5">{job.companyName}</Typography>
                <Typography variant="body1">
                  <strong>Role:</strong> {job.jobRole}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>District:</strong> {job.districtName}
                </Typography>
                <Typography variant="body2" color="error">
                  <strong>Last Date:</strong> {new Date(job.lastDate).toLocaleDateString()}
                </Typography>
              </CardContent>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button variant="contained" color="secondary" onClick={() => handleDelete(job._id)}>
                  Delete
                </Button>
                <Button variant="contained" color="primary" onClick={() => handleUpdate(job._id)}>
                  Update
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ViewJobsPage;
