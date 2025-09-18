const express = require("express");
const cors = require("cors");
const contact = require("./db/Contact");
const user = require("./db/User");
const AuthUser = require("./db/UserAuth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());
const port = 8000;

// Middleware to verify user is logged in
const verifyUser = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Error while verifying the user" });
    }
    req.userId = decoded.id;
    next();
  });
};

// Middleware to verify admin role
const verifyAdmin = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Error while verifying the user" });
    }
    if (decoded.role !== "admin") {
      return res
        .status(403)
        .json({ error: "Access denied. Admin role required." });
    }
    req.userId = decoded.id;
    next();
  });
};

// Saving Contact Details

app.post("/contactDb", async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const contactData = new contact({ name, email, message });
    await contactData.save();
    res.status(201).json({ message: "contact details saved successfully" });
  } catch (err) {
    console.log("error while saving contacts" + err);
  }
});

// Retrieving User Portfolio details

app.get("/userDb", async (req, res) => {
  try {
    const userData = await user.find();
    res.status(200).json(userData);
  } catch (err) {
    console.log("error while fetching user data" + err);
  }
});

// Updating User Portfolio details

app.put("/userDb", verifyUser, async (req, res) => {
  const { about, projects, skills } = req.body;
  try {
    const updatedData = {};
    if (about !== undefined) {
      updatedData["data.0.about"] = about;
      updatedData["about"] = about;
    }
    if (projects !== undefined) updatedData["projects"] = projects;
    if (skills !== undefined) updatedData["skills"] = skills;

    const updatedUser = await user.findOneAndUpdate(
      {},
      { $set: updatedData },
      { new: true, upsert: true }
    );
    res
      .status(200)
      .json({ message: "Portfolio updated successfully", data: updatedUser });
  } catch (err) {
    console.log("error while updating user data" + err);
    res.status(500).json({ error: "Error updating portfolio" });
  }
});

// -------------------------------------------- SignUp -----------------------------------------------//

app.post("/signup", async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const existingUser = await AuthUser.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists!" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new AuthUser({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
    });
    await newUser.save();
    res.status(201).json({ message: "User Registered successfully" });
  } catch (err) {
    console.log("Error while SignUp" + err);
    res.status(400).json({ error: "Error in SignUp" });
  }
});

// ----------------------------------- Login -------------------------------------------- //

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await AuthUser.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ error: "User not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Password" });
    }
    const token = jwt.sign(
      {
        id: existingUser._id,
        role: existingUser.role, // include role in token
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (err) {
    console.log("Error while Login" + err);
    res.status(400).json({ error: "Error in Login" });
  }
});

// ------------------------------------------ Dashboard ----------------------------------------------------- //

app.get("/dashboard", async (req, res) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Error while verifying the user" });
    }

    res.status(200).json({
      message: "Welcome to your portfolio",
      id: decoded.id,
      role: decoded.role, // include role in response
    });
  });
});

// ----------------------------------------Server Port -------------------------------------------------------------//

app.listen(port, () => {
  console.log("server running at port 8000");
});
