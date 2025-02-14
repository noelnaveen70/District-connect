import React, { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, Button, Grid, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ViewHospitalPage = () => {
  const navigate = useNavigate();
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
  fetch("http://localhost:5000/hospital/displayhospitals")

      .then((res) => res.json())
      .then((data) => setHospitals(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this hospital entry?")) return;

    try {
      const response = await fetch(`http://localhost:5000/hospital/deletehospital/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete hospital entry");

      setHospitals(hospitals.filter((hospital) => hospital._id !== id));
      alert("Hospital entry deleted successfully!");
    } catch (error) {
      alert("Error deleting hospital entry.");
    }
  };

  const handleUpdate = (id) => {
    navigate(`/edit-hospital/${id}`);
  };

  return (
    <Box sx={{ p: 5 }}>
      <Typography variant="h4" gutterBottom align="center">
        Hospitals
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {hospitals.map((hospital) => (
          <Grid item key={hospital._id}>
            <Card
              sx={{
                width: 400,
                height: 400,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                p: 2,
                boxShadow: 6,
                borderRadius: 4,
                textAlign: "center",
                backgroundColor: "#f9f9f9",
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" fontWeight="bold">
                  {hospital.name}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  <strong>District:</strong> {hospital.district}
                </Typography>

                {hospital.locationUrl && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    <strong>Location:</strong>{" "}
                    <Link href={hospital.locationUrl} target="_blank" rel="noopener noreferrer">
                      View on Map
                    </Link>
                  </Typography>
                )}
              </CardContent>

              {hospital.embedUrl && (
                <Box sx={{ width: "100%", height: 200, mb: 2 }}>
                  <iframe
                    width="100%"
                    height="100%"
                    src={hospital.embedUrl}
                    title="Embedded Hospital Location"
                    frameBorder="0"
                    style={{ borderRadius: "10px" }}
                    allowFullScreen
                  ></iframe>
                </Box>
              )}

              <Box sx={{ display: "flex", justifyContent: "center", gap: 2, width: "100%", pb: 2 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  sx={{ width: "45%" }}
                  onClick={() => handleDelete(hospital._id)}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ width: "45%" }}
                  onClick={() => handleUpdate(hospital._id)}
                >
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

export default ViewHospitalPage;
