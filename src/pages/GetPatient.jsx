import { Box, Button, CircularProgress } from "@mui/material";
import { QRCodeCanvas } from "qrcode.react";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getPatient } from "../services/apiRequests";
import "../styles/patientcard.css";

export default function GetPatient() {
  const { id } = useParams();

  const { isLoading, error, data } = useQuery(id, () => getPatient(id));

  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (hidden) window.print();
  }, [hidden]);

  if (isLoading) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "350px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    const errString =
      error.code !== "ERR_NETWORK"
        ? error.response.data.message
        : error.message;
    toast.error(errString);

    return null;
  }

  const { patient } = data.data;
  return (
    <div className="container">
      <QRCodeCanvas className="qr" value={window.location.href} />
      <div className="card">
        <div className="item">ID : {id}</div>
        <div className="item">Name : {patient.name}</div>
        <div className="item">Address : {patient.address}</div>
        <div className="item">Blood: {patient.blood}</div>
        <div className="item">
          Date:{" "}
          {patient.dateOfBirth.slice(0, 4) +
            "-" +
            patient.dateOfBirth.slice(5, 7) +
            "-" +
            patient.dateOfBirth.slice(8, 10)}
        </div>
      </div>
      <div className="btn">
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, display: hidden ? "none" : "block" }}
          onClick={() => setHidden(true)}
        >
          Print
        </Button>
      </div>
    </div>
  );
}
