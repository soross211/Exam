// server.js
const express = require("express");
const mysql = require("mysql2/promise");
const bodyParser = require("body-parser");
const taskRoutes = require("./routes/TaskRoute");

const app = express();
const port = 8888;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Database connection pool (replace with your actual credentials)-
const dbPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "finaljs",
  waitForConnections: true,
  connectionLimit: 10,
  queueTimeout: 0,
});

// Middleware to make the database pool available in request objects
app.use(async (req, res, next) => {
  req.db = dbPool;
  next();
});

// Use the task routes -
app.use("/api/tasks", taskRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
