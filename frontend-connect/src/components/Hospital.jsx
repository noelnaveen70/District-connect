import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Card, CardContent, Button, Container } from "@mui/material";
import { useSearchParams } from "react-router-dom";

const Hospital = () => {
  const [searchParams] = useSearchParams();
  const district = searchParams.get("district") || "Alappuzha"; // Default district
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/hospital/displayhospitals")
      .then((res) => res.json())
      .then((data) => {
        const filteredHospitals = district
          ? data.filter((hospital) => hospital.district === district)
          : data;
        setHospitals(filteredHospitals);
      })
      .catch((err) => console.error("Error fetching hospital data:", err));
  }, [district]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        minWidth: "100vw",
        padding: { xs: 2, sm: 3, md: 5 },
        backgroundImage: "url('/images/hospital.jpg')",
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
            background: "linear-gradient(45deg,rgb(192, 11, 11), #f06595)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" }, // Responsive font sizes
            marginBottom: 3,
          }}
        >
          Hospitals {district ? `in ${district}` : ""}
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          {hospitals.length > 0 ? (
            hospitals.map((hospital) => (
              <Grid item xs={12} sm={6} md={4} key={hospital._id}>
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
                      color="black"
                      sx={{ fontSize: { xs: "1rem", sm: "1.2rem", md: "1.3rem" } }}
                    >
                      {hospital.name}
                    </Typography>
                    <Typography variant="body1" color="black" sx={{ mt: 1 }}>
                      <strong>District:</strong> {hospital.district}
                    </Typography>
                    {hospital.description && (
                      <Typography variant="body2" color="black" sx={{ mt: 1 }}>
                        <strong>Description:</strong> {hospital.description}
                      </Typography>
                    )}
                  </CardContent>

                  {/* Google Map Embed - Fully Responsive */}
                  {hospital.embedUrl && (
                    <Box sx={{ width: "100%", height: { xs: 150, sm: 180, md: 200 }, overflow: "hidden" }}>
                      <iframe
                        width="100%"
                        height="100%"
                        src={hospital.embedUrl}
                        title={hospital.name}
                        frameBorder="0"
                        style={{ borderRadius: "0 0 12px 12px" }}
                        allowFullScreen
                      ></iframe>
                    </Box>
                  )}

                  {/* View Location Button */}
                  <Box sx={{ padding: 2 }}>
                    {hospital.locationUrl && (
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        href={hospital.locationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          borderRadius: "20px",
                          textTransform: "none",
                          fontWeight: "bold",
                          background: "linear-gradient(to right, #ff6b6b, #f06595)",
                          "&:hover": {
                            background: "linear-gradient(to right, #f06595, #d6336c)",
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
              No hospitals available {district ? `in ${district}` : ""}.
            </Typography>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default Hospital;
