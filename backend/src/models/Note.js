const { DataTypes } = require("sequelize")
const sequelize = require("../db")
const Tag = require("../models/Tag")

const Note = sequelize.define(
  "note",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    archived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "Notes",

    fields: {
      tags: {
        type: DataTypes.STRING,
        field: "tags",
      },
    },
  }
)

Note.belongsToMany(Tag, { through: "NoteTag", foreignKey: "noteId" })
Tag.belongsToMany(Note, { through: "NoteTag", foreignKey: "tagId" })

module.exports = Note
