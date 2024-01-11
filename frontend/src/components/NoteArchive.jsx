import { useState, useEffect } from "react"
import axios from "axios"
import { Button, Card, CardContent, Grid, Typography } from "@mui/material"

const ArchivedNotes = () => {
  const [archivedNotes, setArchivedNotes] = useState([])

  const loadArchivedNotes = async () => {
    try {
      const response = await axios.get("http://localhost:3001/notes/archive")
      setArchivedNotes(response.data)
    } catch (error) {
      console.error("An error has occurred:", error)
    }
  }

  const handleUnarchive = async (id) => {
    try {
      await axios.put(`http://localhost:3001/notes/${id}/unarchive`, {
        archived: false,
      })

      loadArchivedNotes()
    } catch (error) {
      console.error("An error has occurred:", error)
    }
  }

  useEffect(() => {
    loadArchivedNotes()
  }, [])

  return (
    <>
      <h1>Archived Notes</h1>
      <Grid container spacing={2}>
        {archivedNotes.map((note) => (
          <Grid item key={note.id} xs={12} sm={6} md={4} lg={3}>
            <Card
              style={{
                marginBottom: "1rem",
                backgroundColor: "#1e272e",
                color: "white",
              }}
            >
              <CardContent
                style={{
                  display: "block",
                  justifyContent: "space-between",
                  height: "250px",
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
                  <Typography>{note.content}</Typography>
                  <hr
                    style={{
                      margin: "4rem 0 1rem 0",
                      borderColor: "#AF7AC5",
                      borderWidth: "1px",
                    }}
                  />
                  <Typography>
                    Tags: {note.tags.map((tag) => tag.name).join(", ")}
                  </Typography>
                </div>
                <div>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    style={{ margin: ".5rem 0 0 6rem" }}
                    onClick={() => handleUnarchive(note.id)}
                  >
                    Unarchive
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

export default ArchivedNotes
