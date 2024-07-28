// app.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const authRoutes = require("./routes/auth");
const path = require("path");

// Connect to MongoDB
// mongoose.connect("mongodb://localhost:27017/nodejs-login-app", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
mongoose.connect('mongodb://localhost:27017/yourdb', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/auth", authRoutes);

// Home Route
app.get("/", (req, res) => {
  res.render("index");
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
app.get('/', async (req, res) => {
  try {
      const posts = await Post.find(); // Fetch all posts
      res.render('index', { posts });
  } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
  }
});