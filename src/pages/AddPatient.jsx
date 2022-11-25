import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import { addPatient } from "../services/apiRequests";

export default function AddPatient() {
  const [patient, setPatient] = React.useState({
    name: "",
    date: "",
    blood: "",
    address: "",
  });

  const token = localStorage.getItem("token");

  const navigator = useNavigate();

  useEffect(() => {
    if (!token) {
      navigator("/");
    }
  }, [navigator, token]);

  const handleClick = async () => {
    if (!patient.name || !patient.date || !patient.blood || !patient.address) {
      toast.error("please fill all the places");
      return;
    }

    const filtredPatient = {
      ...patient,
      date: {
        year: Number(patient.date.slice(0, 4)),
        month: Number(patient.date.slice(5, 7)),
        day: Number(patient.date.slice(8)),
      },
    };

    try {
      const { data } = await addPatient(filtredPatient, token);
      toast.success(data.patient.name + "added successfuly");
      navigator("/patient/" + data.patient.ID);
    } catch (error) {
      const errString =
        error.code !== "ERR_NETWORK"
          ? error.response.data.message
          : error.message;
      toast.error(errString);
    }
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          width: "100%",
          height: "100%",
        }}
      >
        <Box
          sx={{
            marginTop: "20px",
            backgroundColor: "#fff",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "15px",
            width: "345px",
          }}
        >
          <Typography variant="h5">Add a new patient</Typography>
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              onChange={(e) => setPatient({ ...patient, name: e.target.value })}
              label="Name"
              variant="outlined"
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              onChange={(e) =>
                setPatient({ ...patient, address: e.target.value })
              }
              label="address"
              variant="outlined"
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Blood</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Blood"
              onChange={(e) =>
                setPatient({ ...patient, blood: e.target.value })
              }
            >
              <MenuItem value={"A+"}>A+</MenuItem>
              <MenuItem value={"A-"}>A-</MenuItem>
              <MenuItem value={"B+"}>B+</MenuItem>
              <MenuItem value={"B-"}>B-</MenuItem>
              <MenuItem value={"O+"}>O+</MenuItem>
              <MenuItem value={"O-"}>O-</MenuItem>
              <MenuItem value={"AB+"}>AB-</MenuItem>
              <MenuItem value={"AB-"}>AB+</MenuItem>
            </Select>
          </FormControl>
          <InputLabel id="qq">Date of birth</InputLabel>
          <TextField
            onChange={(e) => setPatient({ ...patient, date: e.target.value })}
            id="outlined-basic"
            type="date"
            labelId="qq"
            variant="outlined"
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleClick}
          >
            Add patient
          </Button>
        </Box>
      </Box>
    </>
  );
}
