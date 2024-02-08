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
