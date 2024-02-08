const pool = require("../config/dbConfig");

// Get all notes
exports.getNotes = (req, res) => {
  pool.query(
    "SELECT * FROM notes WHERE user_id = ?",
    [req.userId],
    (error, results) => {
      if (error) {
        console.error("Error occurred while fetching notes:", error);
        return res.status(500).json({ error: "Error fetching notes" });
      }
      res.json(results);
    }
  );
};

// Add a new note
exports.addNote = (req, res) => {
  const { title, description } = req.body;
  pool.query(
    "INSERT INTO notes (title, description, user_id) VALUES (?, ?, ?)",
    [title, description, req.userId],
    (error, results) => {
      if (error) {
        console.error("Error occurred while creating note:", error);
        return res.status(500).json({ error: "Error creating note" });
      }
      res.status(201).json(results);
    }
  );
};

// Update a note
exports.updateNote = (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  pool.query(
    "UPDATE notes SET title = ?, description = ? WHERE id = ? AND user_id = ?",
    [title, description, id, req.userId],
    (error, results) => {
      if (error) {
        console.error("Error occurred while updating note:", error);
        return res.status(500).json({ error: "Error updating note" });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Note not found" });
      }
      res.json(results);
    }
  );
};

// Delete a note
exports.deleteNote = (req, res) => {
  const { id } = req.params;
  pool.query(
    "DELETE FROM notes WHERE id = ? AND user_id = ?",
    [id, req.userId],
    (error, results) => {
      if (error) {
        console.error("Error occurred while deleting note:", error);
        return res.status(500).json({ error: "Error deleting note" });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Note not found" });
      }
      res.json({ message: "Note deleted successfully" });
    }
  );
};
