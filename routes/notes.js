const express = require("express");
const { addNotes } = require("../controllers/addnotes");
const { getNotes, deleteNotes } = require("../controllers/getnotes");

const router = express.Router()

router.route("/addnotes").post(addNotes)
router.route("/getnotes").get(getNotes)
router.route("/delete-notes").delete(deleteNotes)
router.route("/edit-note").put()

module.exports = router;