require("dotenv").config();
const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const upload = multer({ dest: "uploads/" });

// Create a MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.REACT_APP_DB_HOST,
  user: process.env.REACT_APP_DB_USER,
  password: process.env.REACT_APP_DB_PASSWORD,
  database: process.env.REACT_APP_DB_NAME,
});

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.REACT_APP_CLOUD_NAME,
  api_key: process.env.REACT_APP_CLOUD_API_KEY,
  api_secret: process.env.REACT_APP_CLOUD_API_SECRET_KEY,
});

// Enable CORS
app.use(cors());

// Handle POST request to create a new post
app.post("/api/posts", upload.single("image"), (req, res) => {
  // Extract form data from the request body
  const { title, body } = req.body;
  const imageFile = req.file;

  // Upload the image to Cloudinary
  cloudinary.uploader.upload(imageFile.path, (error, result) => {
    if (error) {
      console.error("Error uploading image to Cloudinary", error);
      // Handle the error
      return res.status(500).json({ error: "Failed to upload image" });
    }

    // Get the image URL from the Cloudinary response
    const imageUrl = result.secure_url;
    // Date, when post created
    const createdAt = new Date();

    // Save the post data to the MySQL database
    const post = { title, body, imageUrl, createdAt };
    pool.query("INSERT INTO posts SET ?", post, (error, results) => {
      if (error) {
        console.error("Error saving post to database", error);
        // Handle the error
        return res.status(500).json({ error: "Failed to save post" });
      }

      // Return a success response
      res.json({ message: "Post created successfully" });
    });
  });
});

// Start the server
app.listen(8081, () => {
  console.log("Server is running on port 8081");
});
