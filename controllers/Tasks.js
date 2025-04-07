// controllers/Tasks.js
const TaskModel = require("../models/TaskModel");

class TaskController {
  async getAllTasks(req, res) {
    try {
      const tasks = await TaskModel.getAll(req.db);
      res.json(task);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ error: "Failed to fetch tasks" });
    }
  }

  async createTask(req, res) {
    const { task } = req.body;
    if (!task) {
      return res.status(400).json({ error: "Task description is required" });
    }
    try {
      const result = await TaskModel.create(req.db, task);
      const newTask = await TaskModel.getById(req.db, result.insertId);
      res.status(201).json(newTask);
    } catch (error) {
      console.error("Error creating task:", error);
      res.status(500).json({ error: "Failed to create task" });
    }
  }

  async updateTask(req, res) {
    const { id } = req.params;
    const { task } = req.body;
    if (!task) {
      return res
        .status(400)
        .json({ error: "Task description is required for update" });
    }
    try {
      const existingTask = await TaskModel.getById(req.db, id);
      if (!existingTask) {
        return res.status(404).json({ error: "Task not found" });
      }
      await TaskModel.update(req.db, id, task);
      const updatedTask = await TaskModel.getById(req.db, id);
      res.json(updatedTask);
    } catch (error) {
      console.error("Error updating task:", error);
      res.status(500).json({ error: "Failed to update task" });
    }
  }

  async deleteTask(req, res) {
    const { id } = req.params;
    try {
      const existingTask = await TaskModel.getById(req.db, id);
      if (!existingTask) {
        return res.status(404).json({ error: "Task not found" });
      }
      await TaskModel.delete(req.db, id);
      res.status(204).send(); // No content on successful deletion
    } catch (error) {
      console.error("Error deleting task:", error);
      res.status(500).json({ error: "Failed to delete task" });
    }
  }
}

module.exports = new TaskController();
