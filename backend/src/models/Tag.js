const { DataTypes } = require("sequelize")
const sequelize = require("../db")

const Tag = sequelize.define("tag", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    field: "tags",
  },
})

module.exports = Tag
