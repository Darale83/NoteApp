import { React, useState, useEffect } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import {
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const NoteForm = () => {
  const [note, setNote] = useState({
    title: "",
    content: "",
    tags: [],
    createdAt: "",
  })
  const [editing, setEditing] = useState(false)

  const navigate = useNavigate()
  const params = useParams()

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === "tags") {
      const tagsArray = value.split(",").map((tag) => tag.trim())
      console.log("Tags:", tagsArray)
      setNote((prevNote) => ({ ...prevNote, [name]: tagsArray }))
    } else {
      setNote((prevNote) => ({ ...prevNote, [name]: value }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!note.title || !note.content || note.tags.length === 0) {
      toast.warning("Please fill out all required fields", {
        position: "bottom-center",
        autoClose: 2000,
        theme: "dark",
      })
      return
    }

    if (editing) {
      const response = await axios.put(
        `http://localhost:3001/notes/${params.id}`,
        note
      )
      console.log(response.data)
      toast.success("Note successfully updated", {
        position: "bottom-center",
        autoClose: 2000,
        theme: "dark",
      })

      setTimeout(() => {
        navigate("/")
      }, 4500)
    } else {
      try {
        await axios.post("http://localhost:3001/notes", note)

        console.log("Note successfully saved:")

        toast.success("Saved successfully", {
          position: "bottom-center",
          autoClose: 2000,
          theme: "dark",
        })

        setTimeout(() => {
          navigate("/")
        }, 4500)
      } catch (error) {
        console.error("An error has occurred:", error)
        toast.error("Error saving the note", {
          position: "bottom-center",
          autoClose: 2000,
          theme: "dark",
        })
      }
    }
  }

  const loadTask = async (id) => {
    const response = await axios.get(`http://localhost:3001/notes/${id}`)
    console.log(response.data)
    setNote({
      title: response.data.title,
      content: response.data.content,
      tags: response.data.tags.map((tag) => tag.name).join(", "),
    })
    setEditing(true)
  }

  useEffect(() => {
    if (params.id) {
      loadTask(params.id)
    }
  }, [params.id])

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={3}>
        <Card
          sx={{ mt: 5 }}
          style={{
            backgroundColor: "#1e272e",
            padding: "1rem",
            width: "380px",
          }}
        >
          <Typography variant="5" textAlign="center" color="white">
            Create a Note
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div>
                <TextField
                  variant="filled"
                  label="Write a note title"
                  sx={{
                    display: "block",
                    margin: ".5rem 0",
                    width: "350px",
                  }}
                  onChange={handleChange}
                  name="title"
                  value={note.title}
                  inputProps={{ style: { color: "white" } }}
                  InputLabelProps={{ style: { color: "white" } }}
                />
              </div>
              <TextField
                variant="filled"
                label="Write your note"
                multiline
                rows={6}
                sx={{
                  display: "flex",
                  margin: ".5rem 0",
                  width: "350px",
                }}
                onChange={handleChange}
                name="content"
                value={note.content}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />
              <FormControl
                sx={{ display: "flex", margin: ".5rem 0", width: "350px" }}
              >
                <InputLabel
                  id="tags-label"
                  variant="filled"
                  style={{ color: "white" }}
                >
                  Tags
                </InputLabel>
                <Select
                  variant="filled"
                  labelId="tags-label"
                  id="tags-label-select"
                  value={note.tags}
                  name="tags"
                  label="tags"
                  onChange={handleChange}
                  style={{ color: "white" }}
                >
                  <MenuItem value="Personal">Personal</MenuItem>
                  <MenuItem value="Work">Work</MenuItem>
                  <MenuItem value="Travel">Travel</MenuItem>
                  <MenuItem value="Daily">Daily</MenuItem>
                  <MenuItem value="Family">Family</MenuItem>
                </Select>
              </FormControl>

              <Button variant="contained" color="primary" type="submit">
                Save
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
      <ToastContainer />
    </Grid>
  )
}

export default NoteForm
