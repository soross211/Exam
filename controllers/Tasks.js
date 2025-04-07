// controllers/Tasks.js
const TaskModel = require("../models/TaskModel");

class TaskController {
  // Get all tasks
  async getAllTasks(req, res) {
    try {
      const tasks = await TaskModel.getAll(req.db);  // Fetch tasks from model
      res.json(tasks);  // Respond with tasks
    } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ error: "Failed to fetch tasks" });
    }
  }

  // Get a task by ID
  async getTaskById(req, res) {
    const { id } = req.params;  // Get ID from URL params
    try {
      const task = await TaskModel.getById(req.db, id);  // Fetch single task
      if (!task) {
        return res.status(404).json({ error: "Task not found" });  // If not found, return 404
      }
      res.json(task);  // Respond with the task
    } catch (error) {
      console.error("Error fetching task:", error);
      res.status(500).json({ error: "Failed to fetch task" });
    }
  }

  // Create a new task
  async createTask(req, res) {
    const { task } = req.body;  // Get task description from body
    if (!task) {
      return res.status(400).json({ error: "Task description is required" });  // Validate input
    }
    try {
      const result = await TaskModel.create(req.db, task);  // Insert task into DB
      const newTask = await TaskModel.getById(req.db, result.insertId);  // Fetch the newly created task
      res.status(201).json(newTask);  // Respond with the newly created task
    } catch (error) {
      console.error("Error creating task:", error);
      res.status(500).json({ error: "Failed to create task" });
    }
  }

  // Update a task
  async updateTask(req, res) {
    const { id } = req.params;  // Get ID from URL params
    const { task } = req.body;  // Get updated task description from body
    if (!task) {
      return res.status(400).json({ error: "Task description is required for update" });  // Validate input
    }
    try {
      const existingTask = await TaskModel.getById(req.db, id);  // Check if the task exists
      if (!existingTask) {
        return res.status(404).json({ error: "Task not found" });  // If not found, return 404
      }
      await TaskModel.update(req.db, id, task);  // Update task in DB
      const updatedTask = await TaskModel.getById(req.db, id);  // Fetch updated task
      res.json(updatedTask);  // Respond with updated task
    } catch (error) {
      console.error("Error updating task:", error);
      res.status(500).json({ error: "Failed to update task" });
    }
  }

  // Delete a task
  async deleteTask(req, res) {
    const { id } = req.params;  // Get ID from URL params
    try {
      const existingTask = await TaskModel.getById(req.db, id);  // Check if the task exists
      if (!existingTask) {
        return res.status(404).json({ error: "Task not found" });  // If not found, return 404
      }
      await TaskModel.delete(req.db, id);  // Delete task from DB
      res.status(204).send();  // Respond with status 204 (no content)
    } catch (error) {
      console.error("Error deleting task:", error);
      res.status(500).json({ error: "Failed to delete task" });
    }
  }
}

module.exports = new TaskController();
