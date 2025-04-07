// models/TaskModel.js
class TaskModel {
  async getAll(db) {
    try {
      const [rows] = await db.execute(
        "SELECT id, task, created_at, updated_at FROM task"
      );
      return rows;
    } catch (error) {
      console.error("Error in getAll:", error);
      throw error;
    }
  }

  async getById(db, id) {
    try {
      const [rows] = await db.execute(
        "SELECT id, task, created_at, updated_at FROM tasks WHERE id = ?",
        [id]
      );
      return rows[0];
    } catch (error) {
      console.error("Error in getById:", error);
      throw error;
    }
  }

  async create(db, task) {
    try {
      const [result] = await db.execute("INSERT INTO tasks (task) VALUES (?)", [
        task,
      ]);
      return result;
    } catch (error) {
      console.error("Error in create:", error);
      throw error;
    }
  }

  async update(db, id, task) {
    try {
      const [result] = await db.execute(
        "UPDATE tasks SET task = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
        [task, id]
      );
      return result;
    } catch (error) {
      console.error("Error in update:", error);
      throw error;
    }
  }

  async delete(db, id) {
    try {
      const [result] = await db.execute("DELETE FROM tasks WHERE id = ?", [id]);
      return result;
    } catch (error) {
      console.error("Error in delete:", error);
      throw error;
    }
  }
}

module.exports = new TaskModel();
