const express = require("express");
const { addNotes } = require("../controllers/addnotes");
const { getNotes, deleteNotes } = require("../controllers/getnotes");
const { editNotes } = require("../controllers/editnotes");

const router = express.Router()

router.route("/addnotes").post(addNotes)
router.route("/getnotes").get(getNotes)
router.route("/delete-notes").delete(deleteNotes)
router.route("/edit-note").put(editNotes)

module.exports = router;