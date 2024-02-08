const express = require("express");
const {
  getNotes,
  addNote,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");
const authenticateUser = require("../middlewares/authenticateUser");

const router = express.Router();

router.use(authenticateUser); 

router.get("/notes", getNotes); 

module.exports = router;
