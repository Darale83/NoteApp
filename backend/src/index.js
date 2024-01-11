const sequelize = require("../src/db")
const app = require("./app.js")

sequelize.sync({ force: false }).then(() => {
  console.log("Connected to database")
  app.listen(3001)
  console.log("Server is running on port 3001")
})
