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

// GEtting 5 recent posts from database
app.get("/api/posts/recent", (req, res) => {
  const query = "SELECT * FROM posts ORDER BY createdAt DESC LIMIT 5";

  pool.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching recent posts from the database", error);
      return res.status(500).json({ error: "Failed to fetch recent posts" });
    }

    res.json(results);
  });
});

// getting all specific user posts
app.get("/api/posts/user/:usernickname", (req, res) => {
  const usernickname = req.params.usernickname;

  const query = "SELECT * FROM posts WHERE user = ?";
  pool.query(query, [usernickname], (error, results) => {
    if (error) {
      console.error("Error fetching user posts from the database", error);
      return res.status(500).json({ error: "Failed to fetch user posts" });
    }

    res.json(results);
  });
});

// Count accepted posts for a specific user
app.get("/api/posts/user/:usernickname/accepted/count", (req, res) => {
  const usernickname = req.params.usernickname;

  const query =
    "SELECT COUNT(*) AS count FROM posts WHERE user = ? AND status = 'Accepted'";
  pool.query(query, [usernickname], (error, results) => {
    if (error) {
      console.error("Error counting accepted posts for the user", error);
      return res.status(500).json({ error: "Failed to count accepted posts" });
    }

    const count = results[0].count;
    res.json({ count });
  });
});

// Count in progress posts for a specific user
app.get("/api/posts/user/:usernickname/inprogress/count", (req, res) => {
  const usernickname = req.params.usernickname;

  const query =
    "SELECT COUNT(*) AS count FROM posts WHERE user = ? AND status = 'In Progress'";
  pool.query(query, [usernickname], (error, results) => {
    if (error) {
      console.error("Error counting in progress posts for the user", error);
      return res
        .status(500)
        .json({ error: "Failed to count in progress posts" });
    }

    const count = results[0].count;
    res.json({ count });
  });
});

// Count declined posts for a specific user
app.get("/api/posts/user/:usernickname/declined/count", (req, res) => {
  const usernickname = req.params.usernickname;

  const query =
    "SELECT COUNT(*) AS count FROM posts WHERE user = ? AND status = 'Declined'";
  pool.query(query, [usernickname], (error, results) => {
    if (error) {
      console.error("Error counting declined posts for the user", error);
      return res.status(500).json({ error: "Failed to count declined posts" });
    }

    const count = results[0].count;
    res.json({ count });
  });
});

app.get("/api/posts/:postId", (req, res) => {
  const postId = req.params.postId;

  const query = "SELECT * FROM posts WHERE id = ?";
  pool.query(query, [postId], (error, results) => {
    if (error) {
      console.error("Error fetching post from the database", error);
      return res.status(500).json({ error: "Failed to fetch post" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    const post = results[0];
    res.json(post);
  });
});

// Handle POST request to create a new post
app.post("/api/posts", upload.single("image"), (req, res) => {
  // Extract form data from the request body
  const { title, intro, body, category } = req.body;
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
    const post = { title, intro, body, category, imageUrl, createdAt };
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
