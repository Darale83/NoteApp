import { React, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import {
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material"

const NoteList = () => {
  const [notes, setNotes] = useState([])
  const [selectedTag, setSelectedTag] = useState("")

  const navigate = useNavigate()

  const loadNotes = async () => {
    try {
      const response = await axios.get("http://localhost:3001/notes")

      const nonArchivedNotes = response.data.filter((note) => !note.archived)

      const sortedNotes = nonArchivedNotes.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      )

      setNotes(sortedNotes)
    } catch (error) {
      console.error("An error has occurred:", error)
    }
  }

  useEffect(() => {
    loadNotes()
  }, [])

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3001/notes/${id}`)

    loadNotes()
  }

  const handleArchive = async (id) => {
    try {
      await axios.put(`http://localhost:3001/notes/${id}/archive`, {
        archived: true,
      })

      loadNotes()
    } catch (error) {
      console.error("An error has occurred:", error)
    }
  }

  const handleReset = () => {
    setSelectedTag("")
    loadNotes()
  }

  const handleTagChange = (event) => {
    setSelectedTag(event.target.value)
  }

  const filteredNotes = selectedTag
    ? notes.filter((note) => note.tags.some((tag) => tag.name === selectedTag))
    : notes

  return (
    <>
      <div style={{ margin: "0 0 .5rem 30rem " }}>
        <h1>Notes List</h1>
      </div>
      <div>
        <FormControl
          sx={{ display: "flex", margin: ".5rem 0 0 25rem", width: "350px" }}
        >
          <InputLabel
            id="tags-label"
            variant="filled"
            style={{ color: "white" }}
          >
            Filter by Tag
          </InputLabel>
          <Select
            variant="filled"
            labelId="tags-label"
            id="tags-label-select"
            value={selectedTag}
            onChange={handleTagChange}
            style={{ marginBottom: "1rem" }}
          >
            <MenuItem value="Personal">Personal</MenuItem>
            <MenuItem value="Work">Work</MenuItem>
            <MenuItem value="Travel">Travel</MenuItem>
            <MenuItem value="Daily">Daily</MenuItem>
            <MenuItem value="Family">Family</MenuItem>
          </Select>
        </FormControl>
        <div style={{ margin: "0 0 3rem 32rem" }}>
          <Button variant="contained" color="secondary" onClick={handleReset}>
            Reset filter
          </Button>
        </div>
      </div>
      <Grid container spacing={2}>
        {filteredNotes?.map((note) => (
          <Grid item key={note.id} xs={4}>
            {" "}
            <Card
              key={note.id}
              style={{
                marginBottom: "1rem",
                backgroundColor: "#1e272e",
                color: "white",
              }}
            >
              <CardContent
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "320px",
                  overflowY: "auto",
                  padding: "1rem",
                }}
              >
                <div>
                  <Typography
                    variant="h5"
                    style={{
                      margin: "1rem 1rem 0 4rem",
                      color: "#4F42BD",
                    }}
                  >
                    {note.title}
                  </Typography>
                  <Typography mt={3} mb={4}>
                    {note.content}
                  </Typography>
                  <div style={{ display: "block", justifyContent: "flex-end" }}>
                    <Typography>
                      Tags: {note.tags.map((tag) => tag.name).join(", ")}
                    </Typography>
                    <Typography>
                      Created at: {new Date(note.createdAt).toLocaleString()}
                    </Typography>
                  </div>
                </div>
                <div>
                  <Button
                    variant="contained"
                    color="warning"
                    size="small"
                    onClick={() => navigate(`/notes/${note.id}/edit`)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginLeft: ".7rem" }}
                    size="small"
                    onClick={() => handleDelete(note.id)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    style={{ marginLeft: ".7rem" }}
                    size="small"
                    onClick={() => handleArchive(note.id)}
                  >
                    Archive
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default NoteList
