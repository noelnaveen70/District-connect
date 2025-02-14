import React, { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, Button, Grid, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ViewSchoolPage = () => {
  const navigate = useNavigate();
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/school/displayschools")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setSchools(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this school entry?")) return;

    try {
      const response = await fetch(`http://localhost:5000/school/deleteschool/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete school entry");
      }

      setSchools(schools.filter((school) => school._id !== id));
      alert("School entry deleted successfully!");
    } catch (error) {
      console.error("Error deleting school entry:", error);
      alert("Error deleting school entry.");
    }
  };

  const handleUpdate = (id) => {
    navigate(`/edit-school/${id}`);
  };

  return (
    <Box sx={{ p: 5 }}>
      <Typography variant="h4" gutterBottom align="center">
        Schools
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {schools.map((school) => (
          <Grid item key={school._id}>
            <Card
              sx={{
                width: 400,
                height: "auto",
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
                  {school.name}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  <strong>District:</strong> {school.district}
                </Typography>

                {school.description && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    <strong>Description:</strong> {school.description}
                  </Typography>
                )}

                {school.locationUrl && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    <strong>Location:</strong>{" "}
                    <Link href={school.locationUrl} target="_blank" rel="noopener noreferrer">
                      View on Map
                    </Link>
                  </Typography>
                )}
              </CardContent>

              {school.embedUrl && (
                <Box sx={{ width: "100%", height: 200, mb: 2 }}>
                  <iframe
                    width="100%"
                    height="100%"
                    src={school.embedUrl}
                    title="Embedded School Location"
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
                  onClick={() => handleDelete(school._id)}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ width: "45%" }}
                  onClick={() => handleUpdate(school._id)}
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

export default ViewSchoolPage;
