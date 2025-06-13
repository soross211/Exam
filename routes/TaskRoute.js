// routes/TaskRoute.js
const express = require("express");
const router = express.Router();
const taskController = require("../controllers/Tasks");

// GET all tasks
router.get("/", taskController.getAllTask.bind(taskController));

// POST a new task
router.post("/", taskController.createTask.bind(taskController));

// PUT (update) a task by ID
router.put("/:id", taskController.updeteTask.bind(taskController));

// DELETE a task by ID
router.delete("/:id", taskController.DeleteTask.bind(taskController));

module.exports = router;
