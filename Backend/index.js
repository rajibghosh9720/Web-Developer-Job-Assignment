const express = require("express");
const app = express();
const mysql = require("mysql2/promise");
const bodyParser = require("body-parser");

const cors = require("cors");

const PORT = process.env.PORT || 3001;
app.use(cors());

app.use(bodyParser.json());
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

app.post("/api/addSchool", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const { name, address, city, state, contact, image, email_id } = req.body;

    const insertQuery = `
      INSERT INTO schools (name, address, city, state, contact, image, email_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    await connection.query(insertQuery, [
      name,
      address,
      city,
      state,
      contact,
      image,
      email_id,
    ]);
    connection.release();

    res
      .status(200)
      .json({ success: true, message: "School added successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Failed to add school" });
  }
});

app.get("/api/getSchools", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT * FROM schools");
    connection.release();

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to fetch schools" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
