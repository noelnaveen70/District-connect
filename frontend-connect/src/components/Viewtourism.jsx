import React, { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, Button, Grid, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ViewTourismPage = () => {
  const navigate = useNavigate();
  const [tourismSpots, setTourismSpots] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/tourism/displaytourism")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setTourismSpots(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this tourism entry?")) return;

    try {
      const response = await fetch(`http://localhost:5000/tourism/deletetourism/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete tourism entry");
      }

      setTourismSpots(tourismSpots.filter((spot) => spot._id !== id));
      alert("Tourism entry deleted successfully!");
    } catch (error) {
      console.error("Error deleting tourism entry:", error);
      alert("Error deleting tourism entry.");
    }
  };

  const handleUpdate = (id) => {
    navigate(`/edit-tourism/${id}`);
  };

  return (
    <Box sx={{ p: 5 }}>
      <Typography variant="h4" gutterBottom align="center">
        Tourism Spots
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {tourismSpots.map((spot) => (
          <Grid item key={spot._id}>
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
                  {spot.name}
                </Typography>

                <Typography variant="body1" sx={{ mt: 1 }}>
                  <strong>District:</strong> {spot.district}
                </Typography>

                {spot.description && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    <strong>Description:</strong> {spot.description}
                  </Typography>
                )}

                {spot.locationUrl && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    <strong>Location:</strong>{" "}
                    <Link href={spot.locationUrl} target="_blank" rel="noopener noreferrer">
                      View on Map
                    </Link>
                  </Typography>
                )}
              </CardContent>

              {spot.embedUrl && (
                <Box sx={{ width: "100%", height: 200, mb: 2 }}>
                  <iframe
                    width="100%"
                    height="100%"
                    src={spot.embedUrl}
                    title="Embedded Tourism Spot"
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
                  onClick={() => handleDelete(spot._id)}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ width: "45%" }}
                  onClick={() => handleUpdate(spot._id)}
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

export default ViewTourismPage;
