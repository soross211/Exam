// models/TaskModel.js
class TaskModel {
  // Get all tasks
  async getAll(db) {
    try {
      const [rows] = await db.execute("SELECT id, task, created_at, updated_at FROM tasks");
      return rows;  // Return all tasks
    } catch (error) {
      console.error("Error in getAll:", error);
      throw error;
    }
  }

  // Get a task by ID
  async getById(db, id) {
    try {
      const [rows] = await db.execute("SELECT id, task, created_at, updated_at FROM tasks WHERE id = ?", [id]);
      return rows[0];  // Return the task
    } catch (error) {
      console.error("Error in getById:", error);
      throw error;
    }
  }

  // Create a new task
  async create(db, task) {
    try {
      const [result] = await db.execute("INSERT INTO tasks (task) VALUES (?)", [task]);
      return result;  // Return the result of the insert
    } catch (error) {
      console.error("Error in create:", error);
      throw error;
    }
  }

  // Update a task
  async update(db, id, task) {
    try {
      const [result] = await db.execute("UPDATE tasks SET task = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?", [task, id]);
      return result;  // Return the result of the update
    } catch (error) {
      console.error("Error in update:", error);
      throw error;
    }
  }

  // Delete a task
  async delete(db, id) {
    try {
      const [result] = await db.execute("DELETE FROM tasks WHERE id = ?", [id]);
      return result;  // Return the result of the delete
    } catch (error) {
      console.error("Error in delete:", error);
      throw error;
    }
  }
}

module.exports = new TaskModel();
