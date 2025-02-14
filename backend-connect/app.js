require("dotenv").config();
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const cloudinary = require("cloudinary").v2;

const app = express();
const PORT = process.env.PORT || 5000;

//  Ensure MONGO_URI is set
if (!process.env.MONGO_URI) {
  console.error(" MONGO_URI is not set in .env file");
  process.exit(1);
}

//  Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(" MongoDB Connected"))
  .catch((err) => {
    console.error(" MongoDB Connection Error:", err);
    process.exit(1);
  });

//  Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//  Setup CORS
app.use(
  cors({
    credentials: true,
    origin: ["https://district-connect-backend.onrender.com", "http://localhost:5173"],
  })
);

//  Express Middleware
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve uploaded files

//  Session Configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_secret_key",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60, // 1 hour
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    },
  })
);

//  Import Routes
const loginRoutes = require("./routes/LoginRoutes");
const jobRoutes = require("./routes/jobRoutes");
const jobApplyRoutes = require("./routes/jobapplyRoutes");
const tourismRoutes = require("./routes/tourismRoutes");
const hospitalRoutes = require("./routes/hospitalRoutes");
const schoolRoutes = require("./routes/schoolRoutes");

//  Use Routes (Fixed API Paths)
app.use("/log", loginRoutes);
app.use("/job", jobRoutes);
app.use("/jobapply", jobApplyRoutes);
app.use("/tourism", tourismRoutes);
app.use("/hospital", hospitalRoutes);
app.use("/school", schoolRoutes);

//  Start Server
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
