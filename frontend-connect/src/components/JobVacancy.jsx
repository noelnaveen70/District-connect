import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Card, CardContent, Button, Container } from "@mui/material";
import { useSearchParams, useNavigate } from "react-router-dom"; // ✅ Import useNavigate

const JobVacancy = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const district = searchParams.get("district"); // Get district from query param
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/job/displayjobs")
      .then((res) => res.json())
      .then((data) => {
        const filteredJobs = district
          ? data.filter((job) => job.districtName === district)
          : data;
        setJobs(filteredJobs);
      })
      .catch((err) => console.error("Error fetching jobs:", err));
  }, [district]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        minWidth: "100vw",
        padding: 3,
        backgroundImage: "url('/images/jobvacancy.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Container maxWidth="lg">
      <Typography 
    variant="h4" 
    gutterBottom 
    textAlign="center" 
    color="red"
    sx={{ fontFamily: "'Playfair Display', serif" , fontWeight: "bold" }}
      >
          Job Vacancies {district ? `in ${district}` : ""}
      </Typography>


        <Grid container spacing={3}>
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={job._id}>
                <Card
                  sx={{
                    boxShadow: 3,
                    borderRadius: 3,
                    height: "100%",
                    backgroundColor: "rgba(136, 123, 123, 0.2)", // Semi-transparent background
                    backdropFilter: "blur(20px)", // Apply blur effect
                    padding: 2,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      color="white"
                      sx={{ wordWrap: "break-word" }}
                    >
                      {job.jobRole}
                    </Typography>
                    <Typography variant="body1" color="white">
                      <strong>Company:</strong> {job.companyName}
                    </Typography>
                    <Typography variant="body2" color="white">
                      <strong>District:</strong> {job.districtName}
                    </Typography>
                    <Typography variant="body2" color="white">
                      <strong>Last Date:</strong> {new Date(job.lastDate).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                  <Box sx={{ padding: 2, textAlign: "center" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                      onClick={() =>
                        navigate("/jobapply", {
                          state: {
                            jobRole: job.jobRole,
                            companyName: job.companyName,
                            district: job.districtName,
                          },
                        })
                      }
                    >
                      Apply
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="h6" color="white" textAlign="center">
              No job vacancies available {district ? `in ${district}` : ""}.
            </Typography>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default JobVacancy;
