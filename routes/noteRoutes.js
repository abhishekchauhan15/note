const express = require("express");
const {
  getNotes,
  addNote,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");
const authenticateUser = require("../middlewares/authenticateUser");

const router = express.Router();

router.use(authenticateUser); // Middleware to authenticate user using JWT

router.get("/notes", getNotes); // Get all notes
router.post("/notes", addNote); // Add a new note
router.put("/notes/:id", updateNote); // Update a note
router.delete("/notes/:id", deleteNote); // Delete a note

module.exports = router;
