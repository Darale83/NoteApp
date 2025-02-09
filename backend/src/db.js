require("dotenv").config()
const { Sequelize } = require("sequelize")
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/notes`,
  {
    dialect: "postgres",
    host: "localhost",
    logging: false,
    native: false,
  }
)

module.exports = sequelize
