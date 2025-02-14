import React, { useState } from "react";
import {
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  CssBaseline,
  Box,
  Collapse,
  Divider,
} from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [jobOpen, setJobOpen] = useState(false);
  const [tourismOpen, setTourismOpen] = useState(false);
  const [hospitalOpen, setHospitalOpen] = useState(false);
  const [schoolOpen, setSchoolOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#121212", // Dark theme
        color: "white",
        overflow: "hidden",
      }}
    >
      <CssBaseline />

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: "18vw",
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: "18vw",
            boxSizing: "border-box",
            backgroundColor: "#1E1E1E", // Darker sidebar
            color: "white",
          },
        }}
      >
        <Toolbar />
        <List>
          <ListItem
            component="div"
            onClick={() => navigate("/dashboard")}
            sx={{
              cursor: "pointer",
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
            }}
          >
            <ListItemText primary="Dashboard" />
          </ListItem>

          <Divider sx={{ backgroundColor: "gray" }} />

          {/* Job Vacancy Menu */}
          <ListItem
            component="div"
            onClick={() => setJobOpen(!jobOpen)}
            sx={{ cursor: "pointer" }}
          >
            <ListItemText primary="Job Vacancy" />
            {jobOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItem>
          <Collapse in={jobOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ pl: 3 }}>
              <ListItem component="div" onClick={() => navigate("/Createjob")} sx={{ cursor: "pointer" }}>
                <ListItemText primary="Create Job Vacancy" />
              </ListItem>
              <ListItem component="div" onClick={() => navigate("/Viewjob")} sx={{ cursor: "pointer" }}>
                <ListItemText primary="View Job Vacancy" />
              </ListItem>
              <ListItem component="div" onClick={() => navigate("/JobApplications")} sx={{ cursor: "pointer" }}>
                <ListItemText primary="View Job Applications" />
              </ListItem>
            </List>
          </Collapse>

          <Divider sx={{ backgroundColor: "gray" }} />

          {/* Tourism Menu */}
          <ListItem component="div" onClick={() => setTourismOpen(!tourismOpen)} sx={{ cursor: "pointer" }}>
            <ListItemText primary="Tourism" />
            {tourismOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItem>
          <Collapse in={tourismOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ pl: 3 }}>
              <ListItem component="div" onClick={() => navigate("/Createtourism")} sx={{ cursor: "pointer" }}>
                <ListItemText primary="Create Tourism" />
              </ListItem>
              <ListItem component="div" onClick={() => navigate("/Viewtourism")} sx={{ cursor: "pointer" }}>
                <ListItemText primary="View Tourism" />
              </ListItem>
            </List>
          </Collapse>

          <Divider sx={{ backgroundColor: "gray" }} />

          {/* Hospitals Menu */}
          <ListItem component="div" onClick={() => setHospitalOpen(!hospitalOpen)} sx={{ cursor: "pointer" }}>
            <ListItemText primary="Hospitals" />
            {hospitalOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItem>
          <Collapse in={hospitalOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ pl: 3 }}>
              <ListItem component="div" onClick={() => navigate("/Createhospital")} sx={{ cursor: "pointer" }}>
                <ListItemText primary="Create Hospital" />
              </ListItem>
              <ListItem component="div" onClick={() => navigate("/Viewhospital")} sx={{ cursor: "pointer" }}>
                <ListItemText primary="View Hospital" />
              </ListItem>
            </List>
          </Collapse>

          <Divider sx={{ backgroundColor: "gray" }} />

          {/* School Menu */}
          <ListItem component="div" onClick={() => setSchoolOpen(!schoolOpen)} sx={{ cursor: "pointer" }}>
            <ListItemText primary="School" />
            {schoolOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItem>
          <Collapse in={schoolOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ pl: 3 }}>
              <ListItem component="div" onClick={() => navigate("/Createschool")} sx={{ cursor: "pointer" }}>
                <ListItemText primary="Create School" />
              </ListItem>
              <ListItem component="div" onClick={() => navigate("/Viewschool")} sx={{ cursor: "pointer" }}>
                <ListItemText primary="View School" />
              </ListItem>
            </List>
          </Collapse>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {/* Background Image Section */}
        <Box
          sx={{
            height: "30%",
            backgroundImage: "url('/images/admin.jpg')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            opacity: 0.9,
            filter: "brightness(0.8)",
          }}
        />

        {/* Admin Content Section */}
        <Box
          sx={{
            height: "70%",
            p: 4,
            color: "white",
            overflow: "auto",
            
            backgroundColor: "rgba(255, 255, 255, 0.1)",

            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Toolbar />
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
            Admin Dashboard
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "1.1rem", maxWidth: "60%" }}>
            Select an option from the sidebar to manage the platform efficiently.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
