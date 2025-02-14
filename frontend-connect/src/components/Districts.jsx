import React from "react";
import { useNavigate } from "react-router-dom";  // React Router v6

const Districts = () => {
  const navigate = useNavigate();  // Hook to manage navigation

  const districts = [
    "Alappuzha",
    "Ernakulam",
    "Idukki",
    "Kannur",
    "Kasaragod",
    "Kottayam",
    "Kollam",
    "Kozhikode",
    "Malappuram",
    "Palakkad",
    "Pathanamthitta",
    "Thiruvananthapuram",
    "Thrissur",
    "Wayanad",
  ];

  // Function to handle button click and navigation
  const handleClick = (district) => {
    navigate(`/district/${district.toLowerCase()}`);  // Navigate to the district's details page
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px",
        flexWrap: "wrap",
      }}
    >
      {/* Left side - District buttons */}
      <div
        style={{
          width: "25%",
          textAlign: "left",
          fontFamily: "Arial, sans-serif",
          padding: "10px",
          fontSize: "18px",
          color: "#4b4b4b",
          background: "#f1f1f1",
          borderRadius: "15px",
          boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
          height: "100vh",
          overflowY: "auto",
        }}
      >
        <h2 style={{ textAlign: "center", fontSize: "26px", color: "#2d2d2d", fontWeight: "600" }}>
          Kerala Districts
        </h2>
        {districts.map((district, index) => (
          <button
            key={index}
            onClick={() => handleClick(district)}
            style={{
              padding: "12px 18px",
              fontSize: "18px",
              fontWeight: "bold",
              marginBottom: "10px",
              borderRadius: "10px",
              backgroundColor: "#e3e3e3",
              color: "#333",
              border: "none",
              cursor: "pointer",
              width: "100%",
              transition: "transform 0.2s ease, box-shadow 0.3s ease, background-color 0.3s ease",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#c7c7c7";
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0px 6px 10px rgba(0, 0, 0, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#e3e3e3";
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
            }}
          >
            {district}
          </button>
        ))}
      </div>

      {/* Right side - Kerala map */}
      <div
        style={{
          width: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src="/images/Kerala.png"
          alt="Kerala Map"
          style={{
            width: "70%",
            maxWidth: "600px",
            height: "auto",
            borderRadius: "10px",
          }}
        />
      </div>
    </div>
  );
};

export default Districts;
