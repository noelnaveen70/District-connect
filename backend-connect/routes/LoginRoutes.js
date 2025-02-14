const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
require("dotenv").config();

const router = express.Router();

//  Register Route
router.post("/register", async (req, res) => {
  
  
  const { username, email, password } = req.body;

  try {
    //  Check if user already exists
    const userExists = await User.findOne({ $or: [{ username }, { email }] });
    if (userExists) {
      return res.status(400).json({ message: "Username or Email already exists" });
    }

    //  Hash password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //  Create new user
    const newUser = new User({ username, email, password: hashedPassword});
    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    console.error(" Registration Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

//  Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  

  try {
    //  Find user by email
    const user = await User.findOne({ email:email });

    if (!user) {
      console.log(" User not found:", email);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    //  Check password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(" Password Match:", isMatch);

    if (!isMatch) {
      
      return res.status(401).json({ message: "Invalid email or password" });
    }

    //  Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "your_secret_key",
      { expiresIn: "1h" }
    );

  
    res.status(200).json({ token, user });
  } catch (err) {
    console.error(" Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
