import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  Container, Paper, Typography, CircularProgress, 
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Button, Snackbar, Alert
} from "@mui/material";

const JobApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/jobapply/applications")
      .then((response) => {
        setApplications(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch job applications.");
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/jobapply/applications/${id}`);
      setApplications((prev) => prev.filter((app) => app._id !== id));

      // Show success notification
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Failed to delete application:", error.response?.data || error.message);
    }
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 4, mt: 5, borderRadius: 2 }}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          Job Applications
        </Typography>

        {loading && <CircularProgress sx={{ display: "block", mx: "auto" }} />}
        {error && <Typography color="error" textAlign="center">{error}</Typography>}

        {!loading && !error && applications.length === 0 && (
          <Typography textAlign="center">No job applications found.</Typography>
        )}

        {!loading && !error && applications.length > 0 && (
          <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table>
              <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                <TableRow>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell><strong>Email</strong></TableCell>
                  <TableCell><strong>Phone</strong></TableCell>
                  <TableCell><strong>District</strong></TableCell>
                  <TableCell><strong>Job Role</strong></TableCell>
                  <TableCell><strong>Company</strong></TableCell>
                  <TableCell><strong>Resume</strong></TableCell>
                  <TableCell><strong>Action</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {applications.map((app) => (
                  <TableRow key={app._id}>
                    <TableCell>{app.name}</TableCell>
                    <TableCell>{app.email}</TableCell>
                    <TableCell>{app.phone}</TableCell>
                    <TableCell>{app.district}</TableCell>
                    <TableCell>{app.jobRole || "N/A"}</TableCell>
                    <TableCell>{app.companyName || "N/A"}</TableCell>
                    <TableCell>
                      <a 
                        href={app.resume} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ color: "#007BFF", textDecoration: "none" }}
                      >
                        View Resume
                      </a>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="contained" 
                        color="error" 
                        onClick={() => handleDelete(app._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* Snackbar Notification */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          Application deleted successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default JobApplications;
