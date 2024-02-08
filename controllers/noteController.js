const pool = require("../config/dbConfig");

// Function to execute a SQL query and return a Promise
const query = (sql, params) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, params, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

// Get all notes
exports.getNotes = async (req, res) => {
  try {
    const results = await query("SELECT * FROM notes WHERE user_id = ?", [
      req.userId,
    ]);
    res.json(results);
  } catch (error) {
    console.error("Error occurred while fetching notes:", error);
    res.status(500).json({ error: "Error fetching notes" });
  }
};

// Add a new note
exports.addNote = async (req, res) => {
  const { title, description } = req.body;
  try {
    const results = await query(
      "INSERT INTO notes (title, description, user_id) VALUES (?, ?, ?)",
      [title, description, req.userId]
    );
    res.status(201).json(results);
  } catch (error) {
    console.error("Error occurred while creating note:", error);
    res.status(500).json({ error: "Error creating note" });
  }
};

// Update a note
exports.updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    // Retrieve the current version of the note from the notes table
    const noteQueryResult = await query(
      "SELECT title, description FROM notes WHERE id = ?",
      [id]
    );
    const { title: currentTitle, description: currentDescription } =
      noteQueryResult[0];

    // Insert the current version into the note_versions table
    await query(
      "INSERT INTO note_versions (note_id, title, description) VALUES (?, ?, ?)",
      [id, currentTitle, currentDescription]
    );

    // Update the note in the notes table
    const updateResults = await query(
      "UPDATE notes SET title = ?, description = ?, has_versions = true WHERE id = ? AND user_id = ?",
      [title, description, id, req.userId]
    );

    if (updateResults.affectedRows === 0) {
      res.status(404).json({ error: "Note not found" });
    } else {
      res.json(updateResults);
    }
  } catch (error) {
    console.error("Error occurred while updating note:", error);
    res.status(500).json({ error: "Error updating note" });
  }
};


// Get the previous version of a note
exports.getPreviousNoteVersion = async (req, res) => {
  const { note_id } = req.params;
  console.log("id getting in prev note, backend", note_id)
  try {
    // Query the database to retrieve the previous version of the note
    const result = await query(
      "SELECT * FROM note_versions WHERE note_id = ?",
      [note_id]
    );
    if (result.length === 0) {
      return res.status(404).json({ error: "Previous version not found" });
    }
    res.json(result[0]); // Return the previous version of the note
  } catch (error) {
    console.error("Error occurred while fetching previous note version:", error);
    res.status(500).json({ error: "Error fetching previous note version" });
  }
};


// Delete a note
exports.deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    // Delete all versions of the note from note_versions table
    await query("DELETE FROM note_versions WHERE note_id = ?", [id]);

    // Then delete the note from the notes table
    const results = await query(
      "DELETE FROM notes WHERE id = ? AND user_id = ?",
      [id, req.userId]
    );

    if (results.affectedRows === 0) {
      res.status(404).json({ error: "Note not found" });
    } else {
      res.json({ message: "Note deleted successfully" });
    }
  } catch (error) {
    console.error("Error occurred while deleting note:", error);
    res.status(500).json({ error: "Error deleting note" });
  }
};
