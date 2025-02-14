import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Card, CardContent, Button, Container } from "@mui/material";
import { useSearchParams } from "react-router-dom";

const School = () => {
  const [searchParams] = useSearchParams();
  const district = searchParams.get("district") || "Alappuzha"; // Default district
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/school/displayschools")
      .then((res) => res.json())
      .then((data) => {
        const filteredSchools = district
          ? data.filter((school) => school.district === district)
          : data;
        setSchools(filteredSchools);
      })
      .catch((err) => console.error("Error fetching school data:", err));
  }, [district]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        minWidth: "100vw",
        padding: { xs: 2, sm: 3, md: 5 },
        backgroundImage: "url('/images/school.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          textAlign="center"
          sx={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: "bold",
            background: "linear-gradient(45deg,rgb(255, 255, 255),rgb(255, 255, 255))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" }, // Responsive font sizes
            marginBottom: 3,
          }}
        >
          Schools {district ? `in ${district}` : ""}
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          {schools.length > 0 ? (
            schools.map((school) => (
              <Grid item xs={12} sm={6} md={4} key={school._id}>
                <Card
                  sx={{
                    boxShadow: 4,
                    borderRadius: "12px",
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    backdropFilter: "blur(10px)",
                    transition: "0.3s",
                    "&:hover": {
                      boxShadow: 10,
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      color="white"
                      sx={{ fontSize: { xs: "1rem", sm: "1.2rem", md: "1.3rem" } }}
                    >
                      {school.name}
                    </Typography>
                    <Typography variant="body1" color="white" sx={{ mt: 1 }}>
                      <strong>District:</strong> {school.district}
                    </Typography>
                    {school.description && (
                      <Typography variant="body2" color="white" sx={{ mt: 1 }}>
                        <strong>Description:</strong> {school.description}
                      </Typography>
                    )}
                  </CardContent>

                  {/* Google Map Embed - Fully Responsive */}
                  {school.embedUrl && (
                    <Box sx={{ width: "100%", height: { xs: 150, sm: 180, md: 200 }, overflow: "hidden" }}>
                      <iframe
                        width="100%"
                        height="100%"
                        src={school.embedUrl}
                        title={school.name}
                        frameBorder="0"
                        style={{ borderRadius: "0 0 12px 12px" }}
                        allowFullScreen
                        loading="lazy" // Improves performance
                      ></iframe>
                    </Box>
                  )}

                  {/* View Location Button */}
                  <Box sx={{ padding: 2 }}>
                    {school.locationUrl && (
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        href={school.locationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          borderRadius: "20px",
                          textTransform: "none",
                          fontWeight: "bold",
                          background: "linear-gradient(to right, #007bff, #0056b3)",
                          "&:hover": {
                            background: "linear-gradient(to right, #0056b3, #003b80)",
                          },
                          fontSize: { xs: "0.8rem", sm: "1rem" }, // Responsive font size
                          padding: { xs: "8px 12px", sm: "10px 16px" }, // Adjust padding
                        }}
                      >
                        View Location
                      </Button>
                    )}
                  </Box>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography
              variant="h6"
              color="white"
              textAlign="center"
              sx={{ fontSize: { xs: "1rem", sm: "1.2rem" } }}
            >
              No schools available {district ? `in ${district}` : ""}.
            </Typography>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default School;
