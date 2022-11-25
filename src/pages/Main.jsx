import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import DiagnosesContainer from "../components/DiagnosesContainer";
import Navbar from "../components/Navbar";

export default function Main() {
  const [ID_input, setID_input] = useState("");

  const [ID, setID] = useState();

  const handleClick = () => {
    setID(ID_input);
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          minHeight: "80vh",
          height: "100%",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#fff",
            padding: "20px",
            margin: "20px",
          }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            type="text"
            label="Enter Patient ID"
            autoFocus
            onChange={(e) => setID_input(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleClick}
          >
            Search
          </Button>
        </Box>
        {ID && <DiagnosesContainer ID={ID} />}
      </Box>
    </>
  );
}
