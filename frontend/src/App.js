import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import NoteList from "./components/NoteList"
import { Container } from "@mui/material"
import NavBar from "./components/NavBar.jsx"
import NoteArchive from "./components/NoteArchive"
import NoteForm from "./components/NoteForm"

const App = () => {
  return (
    <Router>
      <NavBar />
      <Container>
        <Routes>
          <Route exact path="/" element={<NoteList />} />
          <Route exact path="/notes/new" element={<NoteForm />} />
          <Route exact path="/notes/archive" element={<NoteArchive />} />
          <Route path="/notes/:id/edit" element={<NoteForm />} />
        </Routes>
      </Container>
    </Router>
  )
}

export default App
