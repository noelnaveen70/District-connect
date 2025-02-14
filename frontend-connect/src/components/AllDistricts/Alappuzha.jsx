import React from "react";
import { AppBar, Toolbar, Button, Box, CssBaseline, Container, Typography, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import "@fontsource/dancing-script"; // Import Dancing Script font

const StyledAppBar = styled(AppBar)({
  background: "transparent",
  boxShadow: "none",
  height: "60px",
  position: "absolute",
});

const StyledToolbar = styled(Toolbar)({
  minHeight: "60px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
});

const StyledButton = styled(Button)({
  color: "white",
  fontWeight: "bold",
  textTransform: "uppercase",
  fontSize: "16px",
  padding: "8px 16px",
  borderRadius: "8px",
  transition: "all 0.3s ease",
  "&:hover": {
    color: "#f39c12",
    transform: "scale(1.1)",
  },
});

// Animation for Letters
const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

const Navbar = () => {
  const title = "Alappuzha".split("");

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          backgroundImage: "url('/images/alappuzha.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100vw",
          height: "100vh",
          position: "relative",
          backgroundAttachment: "fixed",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <StyledAppBar>
          <Container>
            <StyledToolbar>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
                <StyledButton component={Link} to="/job-vacancy?district=Alappuzha">
                  Job Vacancy
                </StyledButton>
                <StyledButton component={Link} to="/tourism?district=Alappuzha">
                  Tourism
                </StyledButton>
                <StyledButton component={Link} to="/hospital?district=Alappuzha">
                  Hospital
                </StyledButton>
                <StyledButton component={Link} to="/school?district=Alappuzha">
                  School
                </StyledButton>
              </Stack>
            </StyledToolbar>
          </Container>
        </StyledAppBar>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            flexGrow: 1,
          }}
        >
          <motion.h1
            style={{
              color: "white",
              fontSize: "clamp(40px, 8vw, 80px)",
              fontWeight: "bold",
              fontFamily: "'Dancing Script', cursive",
              textTransform: "capitalize",
              letterSpacing: "5px",
              display: "flex",
              gap: "5px",
            }}
          >
            {title.map((letter, i) => (
              <motion.span key={i} variants={letterVariants} initial="hidden" animate="visible" custom={i}>
                {letter}
              </motion.span>
            ))}
          </motion.h1>
        </Box>

        <Box
          sx={{
            width: "90%",
            maxWidth: "800px",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            padding: "20px",
            borderRadius: "10px",
            color: "#fff",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: "clamp(18px, 3vw, 24px)",
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: "bold",
              letterSpacing: "2px",
              marginBottom: "15px",
            }}
          >
            Discover Alappuzha
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: "clamp(14px, 2vw, 18px)",
              fontFamily: "'Montserrat', sans-serif",
              lineHeight: 1.6,
            }}
          >
            Alappuzha, often called the "Venice of the East," is renowned for its stunning backwaters, houseboats, and serene landscapes. It is a prime destination in Kerala, offering a mix of natural beauty, vibrant traditions, and a peaceful ambiance perfect for relaxation and exploration.
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Navbar;