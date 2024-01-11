const Note = require("../models/Note.js")
const Tag = require("../models/Tag.js")

const getNotes = async (req, res, next) => {
  try {
    const notes = await Note.findAll({
      include: [
        { model: Tag, attributes: ["name"], through: { attributes: [] } },
      ],
    })
    res.json(notes)
  } catch (error) {
    next(error)
  }
}

const getNoteById = async (req, res, next) => {
  try {
    const noteId = req.params.id

    const note = await Note.findByPk(noteId, {
      include: [
        { model: Tag, attributes: ["name"], through: { attributes: [] } },
      ],
    })

    if (!note) {
      return res.status(404).json({ message: "Note not found." })
    }

    res.send(note)
  } catch (error) {
    next(error)
  }
}

const createNote = async (req, res, next) => {
  try {
    const { title, content, tags } = req.body
    const newNote = await Note.create({ title, content, tags })

    if (tags && Array.isArray(tags) && tags.length > 0) {
      const tagInstances = await Promise.all(
        tags.map((tagName) => Tag.findOrCreate({ where: { name: tagName } }))
      )

      await newNote.setTags(tagInstances.map(([tag]) => tag))
    }

    res.status(201).json(newNote)
  } catch (error) {
    next(error)
  }
}

const deleteNote = async (req, res, next) => {
  try {
    const noteId = req.params.id

    const existingNote = await Note.findOne({ where: { id: noteId } })

    if (!existingNote) {
      return res.status(404).json({ message: "Note not found." })
    }

    await existingNote.destroy()

    res.status(204).send()
  } catch (error) {
    next(error)
  }
}

const updateNote = async (req, res, next) => {
  try {
    const noteId = req.params.id
    const { title, content } = req.body

    const existingNote = await Note.findByPk(noteId)

    if (!existingNote) {
      return res.status(404).json({ message: "Note not found." })
    }

    await existingNote.update({ title, content })
    res.json(existingNote).send()
  } catch (error) {
    next(error)
  }
}

const archiveNote = async (req, res, next) => {
  try {
    const noteId = req.params.id

    const existingNote = await Note.findByPk(noteId)

    if (!existingNote) {
      return res.status(404).json({ message: "Note not found." })
    }

    existingNote.archived = true
    await existingNote.save()

    res.json({ message: "Note successfully archived.", existingNote })
  } catch (error) {
    next(error)
  }
}

const unarchiveNote = async (req, res, next) => {
  try {
    const noteId = req.params.id

    const existingNote = await Note.findByPk(noteId)

    if (!existingNote) {
      return res.status(404).json({ message: "Note not found." })
    }

    existingNote.archived = false
    await existingNote.save()

    res.json({ message: "Note successfully unarchived.", existingNote })
  } catch (error) {
    next(error)
  }
}

const getArchivedNotes = async (req, res, next) => {
  try {
    const archivedNotes = await Note.findAll({
      where: {
        archived: true,
      },
      include: [
        { model: Tag, attributes: ["name"], through: { attributes: [] } },
      ],
    })

    res.json(archivedNotes)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getNotes,
  createNote,
  deleteNote,
  updateNote,
  getNoteById,
  archiveNote,
  unarchiveNote,
  getArchivedNotes,
}
