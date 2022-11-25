import { Box } from "@mui/system";
import { getPatient } from "../services/apiRequests";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import { useQuery } from "react-query";
import DiagnoseItem from "./DiagnoseItem";
import { Button, CardContent, Fab, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAgeFromDate } from "../helpers/helpers";

export default function DiagnosesContainer({ ID }) {
  const [toasted, setToasted] = useState(null);
  const { isLoading, error, data } = useQuery(ID, () => getPatient(ID));
  const navigator = useNavigate();
  const user = localStorage.getItem("user");

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
    if (toasted !== ID) {
      const errString =
        error.code !== "ERR_NETWORK"
          ? error.response.data.message
          : error.message;
      toast.error(errString);
      setToasted(ID);
    }
    return null;
  }

  const { patient } = data.data;

  return (
    <Box
      sx={{
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
        marginBottom: "100px",
        marginTop: "30px",
        position: "relative",
      }}
    >
      {user && (
        <Box
          sx={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            cursor: "pointer",
          }}
          onClick={() => navigator("/diagnose/" + ID)}
        >
          <Fab color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </Box>
      )}
      <Box>
        <Box
          sx={{
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <CardContent
            sx={{
              borderRadius: "5px",
              backgroundColor: "#fff",
              width: "340px",
            }}
          >
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {patient.ID}
            </Typography>
            <Typography variant="h5" component="div">
              {patient.name}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              age: {getAgeFromDate(patient.dateOfBirth)}
            </Typography>
            <Typography variant="body2">
              Address: {patient.address}
              <br />
              {"Blood : " + patient.blood}
            </Typography>
            <Link to={"/patient/" + ID}>
              <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Get QR code
              </Button>
            </Link>
          </CardContent>
          <Box
            sx={{
              borderRadius: "10px",
              backgroundColor: "#eeeeee",
              padding: "5px",
            }}
            margin={5}
          >
            <Typography variant="h6">
              {patient.history.length} Diagnoses: {"  "}
            </Typography>
          </Box>

          <Box
            width={"80vw"}
            sx={{
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {patient.history?.map((item, i) => (
              <DiagnoseItem key={i} diagnose={item} />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
