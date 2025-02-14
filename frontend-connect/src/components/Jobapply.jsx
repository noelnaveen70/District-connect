import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  CircularProgress,
} from "@mui/material";
import { AuthContext } from "../components/AuthContext"; // Import authentication context

const JobApplicationForm = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useContext(AuthContext); // Get auth status

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (location.state) {
      setValue("jobRole", location.state.jobRole || "Unknown Job Role");
      setValue("companyName", location.state.companyName || "Unknown Company");
      setValue("district", location.state.district || "Unknown District");
    }
  }, [location.state, setValue]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const onSubmit = async (data) => {
    if (!image) {
      setMessage("Please upload an image as a resume.");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("district", data.district);
      formData.append("jobRole", data.jobRole);
      formData.append("companyName", data.companyName);
      formData.append("resume", image);

      const response = await axios.post(
        "http://localhost:5000/jobapply/job-apply",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setMessage(response.data.message || "Application submitted successfully!");
    } catch (error) {
      setMessage(error.response?.data?.message || "Submission failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 5, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          Job Application
        </Typography>

        {message && (
          <Typography variant="body1" color="error" textAlign="center">
            {message}
          </Typography>
        )}

        <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: "20px" }}>
          <TextField
            fullWidth
            label="Full Name"
            {...register("name", { required: "Name is required" })}
            margin="normal"
            error={!!errors.name}
            helperText={errors.name?.message}
          />

          <TextField
            fullWidth
            label="Email"
            type="email"
            {...register("email", { required: "Email is required" })}
            margin="normal"
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            fullWidth
            label="Phone Number"
            type="tel"
            {...register("phone", { required: "Phone number is required" })}
            margin="normal"
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />

          <TextField
            fullWidth
            label="Job Title"
            {...register("jobRole")}
            margin="normal"
            InputProps={{ readOnly: true }}
          />

          <TextField
            fullWidth
            label="Company Name"
            {...register("companyName")}
            margin="normal"
            InputProps={{ readOnly: true }}
          />

          <TextField
            fullWidth
            label="District"
            {...register("district")}
            margin="normal"
            InputProps={{ readOnly: true }}
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ marginTop: "16px", marginBottom: "16px" }}
          />

          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? <CircularProgress size={24} /> : "Submit Application"}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default JobApplicationForm;
