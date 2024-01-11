import React from "react"
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material"
import { Link, useNavigate } from "react-router-dom"

const NavBar = () => {
  const navigate = useNavigate()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Container>
          <Toolbar>
            <Typography sx={{ flexGrow: 1 }} variant="h6">
              <Link to="/" style={{ textDecoration: "none", color: "#eee" }}>
                NoteApp
              </Link>
            </Typography>
            <Typography sx={{ flexGrow: 1 }} variant="h6">
              <Link
                to="/notes/archive"
                style={{ textDecoration: "none", color: "#eee" }}
              >
                Archive
              </Link>
            </Typography>
            <Button variant="contained" onClick={() => navigate("/notes/new")}>
              New note
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  )
}

export default NavBar
