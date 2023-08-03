require("dotenv").config();
const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");
const url = require("url");

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.resolve(__dirname, "public")));

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

// Getting user views from all posts
app.get("/api/users/viewstotal/:usernickname", (req, res) => {
  const usernickname = req.params.usernickname;

  const query =
    "SELECT SUM(views) as totalViews FROM posts WHERE user = ? AND status = 'Accepted'";
  pool.query(query, [usernickname], (error, results) => {
    if (error) {
      console.error("Error fetching user profile from the database", error);
      return res.status(500).json({ error: "Failed to fetch user profile" });
    }
    res.json(results[0]);
  });
});

// Fetch user profile information
app.get("/api/users/:usernickname", (req, res) => {
  const usernickname = req.params.usernickname;

  const query = "SELECT * FROM users WHERE user = ?";
  pool.query(query, [usernickname], (error, results) => {
    if (error) {
      console.error("Error fetching user profile from the database", error);
      return res.status(500).json({ error: "Failed to fetch user profile" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "User profile not found" });
    }

    const user = results[0];
    res.json(user);
  });
});

// Monthly chart data for accepted posts
app.get("/api/posts/user/:usernickname/monthly", (req, res) => {
  const usernickname = req.params.usernickname;

  const query = `
    SELECT
      MONTH(createdAt) AS month,
      SUM(CASE WHEN status = 'Accepted' THEN 1 ELSE 0 END) AS acceptedCount
    FROM posts
    WHERE user = ?
    GROUP BY MONTH(createdAt)
    ORDER BY MONTH(createdAt) ASC
  `;

  pool.query(query, [usernickname], (error, results) => {
    if (error) {
      console.error(
        "Error fetching monthly post data from the database",
        error
      );
      return res
        .status(500)
        .json({ error: "Failed to fetch monthly post data" });
    }

    res.json(results);
  });
});

// Getting posts from specific category
app.get("/api/posts/categories/:categoryName", (req, res) => {
  const query = "SELECT * FROM posts WHERE category = ?";
  const categoryName = req.params.categoryName;

  pool.query(query, [categoryName], (error, results) => {
    if (error) {
      console.error("Error fetching category posts from database", error);
      return res.status(500).json({ error: "Failed to fetch category posts" });
    }
    res.json(results);
  });
});

// Getting top 3 posts for each category
app.get("/api/posts/category/top3", (req, res) => {
  const query = "SELECT category FROM posts GROUP BY category";

  pool.query(query, (error, categories) => {
    if (error) {
      console.error("Error fetching categories from the database", error);
      return res.status(500).json({ error: "Failed to fetch categories" });
    }

    const promises = categories.map(({ category }) => {
      return new Promise((resolve, reject) => {
        pool.query(
          "SELECT * FROM posts WHERE status='Accepted' AND category = ? ORDER BY createdAt DESC LIMIT 3",
          [category],
          (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve({ category, posts: results });
            }
          }
        );
      });
    });

    Promise.all(promises)
      .then((results) => res.json(results))
      .catch((error) => {
        console.error(
          "Error fetching top 3 posts per category from the database",
          error
        );
        return res
          .status(500)
          .json({ error: "Failed to fetch top 3 posts per category" });
      });
  });
});

// Getting featured video information
app.get("/api/featured", (req, res) => {
  const query = "SELECT * FROM featured_video";

  pool.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching featured video from database", error);
      return res.status(500).json({ error: "Failed to fetch featured video" });
    }
    res.json(results);
  });
});

// GEtting 4 trending posts from database excluding the current post
app.get("/api/posts/trending", (req, res) => {
  const postIdToExclude = req.query.postId;

  const query = `
    SELECT *
    FROM posts
    WHERE status='Accepted' AND id <> ?
    ORDER BY createdAt DESC
    LIMIT 4
  `;

  pool.query(query, [postIdToExclude], (error, results) => {
    if (error) {
      console.error("Error fetching trending posts from the database", error);
      return res.status(500).json({ error: "Failed to fetch trending posts" });
    }

    res.json(results);
  });
});

// GEtting 5 recent posts from database
app.get("/api/posts/recent", (req, res) => {
  const query =
    "SELECT * FROM posts WHERE status='Accepted' ORDER BY createdAt DESC LIMIT 5";

  pool.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching recent posts from the database", error);
      return res.status(500).json({ error: "Failed to fetch recent posts" });
    }

    res.json(results);
  });
});

// GEtting all accepted posts from database
app.get("/api/posts/all", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const query =
    "SELECT * FROM posts WHERE status='Accepted' ORDER BY id LIMIT ? OFFSET ?";

  pool.query(query, [limit, offset], (error, results) => {
    if (error) {
      console.error("Error fetching all posts from the database", error);
      return res.status(500).json({ error: "Failed to fetch all posts" });
    }

    pool.query(
      "SELECT COUNT(*) AS count FROM posts WHERE status='Accepted'",
      (err, countResult) => {
        if (err) {
          console.error("Error counting all posts from the database", err);
          return res.status(500).json({ error: "Failed to count all posts" });
        }

        res.json({
          posts: results,
          totalCount: countResult[0].count,
        });
      }
    );
  });
});

// getting all specific user posts ordered by createdAt and status
app.get("/api/posts/user/:usernickname", (req, res) => {
  const usernickname = req.params.usernickname;

  const query =
    "SELECT * FROM posts WHERE user = ? ORDER BY status='In Progress' DESC, createdAt DESC";
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

// Updating featured video
app.put("/api/featured/update", (req, res) => {
  const { title, description, link } = req.body;

  const query =
    "UPDATE featured_video SET title = ?, description = ?, link = ?";
  const values = [title, description, link];
  pool.query(query, values, (error, results) => {
    if (error) {
      console.error("Error updating featured video", error);
      return res.status(500).json({ error: "Failed to update featured video" });
    }

    res.json({ message: "Featured video updated!" });
  });
});

// Route to accept a post
app.put("/api/posts/:postId/accept", (req, res) => {
  const postId = req.params.postId;

  const query = "UPDATE posts SET status = 'Accepted' WHERE id = ?";
  pool.query(query, [postId], (error, results) => {
    if (error) {
      console.error("Error accepting post", error);
      return res.status(500).json({ error: "Failed to accept post" });
    }

    res.json({ message: "Post accepted" });
  });
});

// Route to decline a post with a note
app.put("/api/posts/:postId/decline", (req, res) => {
  const postId = req.params.postId;
  const declineNote = req.body.note; // Assuming the note is passed in the request body

  const query =
    "UPDATE posts SET status = 'Declined', decline_note = ? WHERE id = ?";
  pool.query(query, [declineNote, postId], (error, results) => {
    if (error) {
      console.error("Error declining post", error);
      return res.status(500).json({ error: "Failed to decline post" });
    }

    res.json({ message: "Post declined" });
  });
});

// Update blog views
app.put("/api/posts/views/:postId", (req, res) => {
  const postId = req.params.postId;

  const query = "UPDATE posts SET views = views + 1 WHERE id = ?";
  pool.query(query, [postId], (error, results) => {
    if (error) {
      console.error("Error updating post views in the database", error);
      return res.status(500).json({ error: "Failed to update post views" });
    }
    res.json({ message: "Post views updated successfully" });
  });
});

// Update or insert user profile information
app.post("/api/users/create-update/:usernickname", (req, res) => {
  const { description } = req.body;
  const usernickname = req.params.usernickname;

  const query =
    "INSERT INTO users (user, description) VALUES (?, ?) ON DUPLICATE KEY UPDATE description = ?";
  pool.query(
    query,
    [usernickname, description, description],
    (error, results) => {
      if (error) {
        console.error("Error updating user profile in the database", error);
        return res.status(500).json({ error: "Failed to update user profile" });
      }

      res.json({ message: "User profile updated successfully" });
    }
  );
});

// Handle POST request to create a new post
app.post("/api/posts", upload.single("image"), (req, res) => {
  const { title, intro, body, category, user } = req.body;
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

    const post = {
      title,
      intro,
      body,
      category,
      imageUrl,
      createdAt,
      user,
    };
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
const port = process.env.PORT || 8081;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

export default app;
