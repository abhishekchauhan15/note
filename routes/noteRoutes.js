const express = require("express");
const {
  getNotes,
  addNote,
  updateNote,
  deleteNote,
  getPreviousNoteVersion,
} = require("../controllers/noteController");
const authenticateUser = require("../middleware/authenticateUser");

const router = express.Router();

router.use(authenticateUser); // Middleware to authenticate user using JWT

router.get("/notes", getNotes); // Get all notes
router.get("/previousNote/:id", getPreviousNoteVersion); // Get previous note
router.post("/notes", addNote); // Add a new note
router.put("/notes/:id", updateNote); // Update a note
router.delete("/notes/:id", deleteNote); // Delete a note

module.exports = router;
