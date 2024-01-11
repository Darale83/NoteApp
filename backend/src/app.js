const express = require("express")
const cookieParser = require("cookie-parser")
const morgan = require("morgan")
const cors = require("cors")
const notesRoutes = require("./routes/notes.routes")

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev"))
app.use(cors())
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000")
  res.header("Access-Control-Allow-Credentials", "true")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
  next()
})

app.use("/", notesRoutes)

// Error catching endware.
app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500
  const message = err.message || err
  console.error(err)
  res.status(status).send(message)
})

module.exports = app
