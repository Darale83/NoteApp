const { Router } = require("express")
const {
  getNotes,
  createNote,
  deleteNote,
  updateNote,
  getNoteById,
  archiveNote,
  unarchiveNote,
  getArchivedNotes,
} = require("../controllers/notes.controller.js")

const router = Router()

router.get("/notes", getNotes)
router.post("/notes", createNote)
router.get("/notes/archive", getArchivedNotes)
router.put("/notes/:id", updateNote)
router.delete("/notes/:id", deleteNote)
router.get("/notes/:id", getNoteById)
router.put("/notes/:id/archive", archiveNote)
router.put("/notes/:id/unarchive", unarchiveNote)

module.exports = router
