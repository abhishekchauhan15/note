const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/dbConfig");
require("dotenv").config();


// User registration
exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    pool.query(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, hashedPassword],
      (error, results) => {
        if (error) {
          console.error("Error occurred during registration:", error);
          if (error.code === "ER_DUP_ENTRY") {
            return res.status(400).json({ error: "Username already exists" });
          }
          return res.status(500).json({ error: "Error registering user" });
        }
        res.status(201).json({
          message: "User registered successfully",
          userId: results.insertId,
        });
      }
    );
  } catch (error) {
    console.error("Error occurred during registration:", error);
    res.status(500).json({ error: "Error registering user" });
  }
};

// User login
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    pool.query(
      "SELECT * FROM users WHERE username = ?",
      [username],
      async (error, results) => {
        if (error) {
          console.error("Error occurred during login:", error);
          return res.status(500).json({ error: "Error logging in" });
        }
        const user = results[0];
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return res.status(401).json({ error: "Invalid credentials" });
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
        res.json({ token });
      }
    );
  } catch (error) {
    console.error("Error occurred during login:", error);
    res.status(500).json({ error: "Error logging in" });
  }
};
