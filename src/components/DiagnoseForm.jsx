import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import Navbar from "./Navbar";
// import { ProgressBar } from "react-toastify/dist/components";
import Loading from "./Loading";
import { addDiagnoseCall, getPatient } from "../services/apiRequests";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Copyright from "./Copyright";
import { getAgeFromDate } from "../helpers/helpers";

const steps = ["Diagnose", "Treatments", "Review"];

const theme = createTheme();

export default function DiagnoseForm() {
  // UI
  const [activeStep, setActiveStep] = React.useState(0);

  // Form
  const [formData, setFormData] = React.useState({
    text: "",
    hospital: "",
    treatment: "",
    chronic: false,
  });

  const { id } = useParams();
  const navigator = useNavigate();

  const handleSubmit = async () => {
    for (let key in formData) {
      if (formData[key] === "") {
        toast.error("please fill all the places");
        setActiveStep(0);
        return;
      }
    }
    try {
      await addDiagnoseCall(
        {
          ...formData,
          patientID: id,
        },
        localStorage.getItem("token")
      );
      toast.success("added succesfuly");
      navigator("/main");
    } catch (error) {
      const errString =
        error.code !== "ERR_NETWORK"
          ? error.response.data.message
          : error.message;
      toast.error(errString);
    }
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    if (activeStep === steps.length - 1) {
      handleSubmit();
    }
  };
  const handleBack = () => setActiveStep(activeStep - 1);

  // users
  const user = JSON.parse(localStorage.getItem("user"));
  const { isLoading, error, data } = useQuery(id, () => getPatient(id));

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
    <ThemeProvider theme={theme}>
      <Navbar />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Add Diagnose
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Loading />
          ) : (
            <React.Fragment>
              {activeStep === 0 && (
                <React.Fragment>
                  <Typography variant="h6" gutterBottom>
                    Diagnose
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        value={formData.text}
                        label="Diagnose Title"
                        fullWidth
                        variant="standard"
                        onChange={(e) =>
                          setFormData({ ...formData, text: e.target.value })
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        id="hospital"
                        name="hospital"
                        label="hospital"
                        fullWidth
                        variant="standard"
                        value={formData.hospital}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            hospital: e.target.value,
                          })
                        }
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            color="primary"
                            checked={formData.chronic}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                chronic: e.target.checked,
                              })
                            }
                          />
                        }
                        label="Mark it as a chronic disease"
                      />
                    </Grid>
                  </Grid>
                </React.Fragment>
              )}
              {activeStep === 1 && (
                <React.Fragment>
                  <Typography variant="h6" gutterBottom>
                    Treatments
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        label="Traatments"
                        fullWidth
                        variant="standard"
                        multiline
                        value={formData.treatment}
                        rows={3}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            treatment: e.target.value,
                          })
                        }
                      />
                    </Grid>
                  </Grid>
                </React.Fragment>
              )}
              {activeStep === 2 && (
                <React.Fragment>
                  <Typography variant="h6" gutterBottom>
                    Diagnose Summary
                  </Typography>
                  <List disablePadding>
                    <ListItem sx={{ py: 1, px: 0 }}>
                      <ListItemText primary={"Diagnose Title"} />
                      <Typography variant="body2"> {formData.text} </Typography>
                    </ListItem>
                    <ListItem sx={{ py: 1, px: 0 }}>
                      <ListItemText primary={"Hospital"} />
                      <Typography variant="body2">
                        {" "}
                        {formData.hospital}{" "}
                      </Typography>
                    </ListItem>
                    <ListItem sx={{ py: 1, px: 0 }}>
                      <ListItemText primary={"Is Coronic ?"} />
                      <Typography variant="body2">
                        {" "}
                        {formData.chronic ? "yes" : "no"}{" "}
                      </Typography>
                    </ListItem>
                    <ListItem sx={{ py: 1, px: 0 }}>
                      <ListItemText
                        primary={"Treatments"}
                        secondary={formData.treatment}
                      />
                    </ListItem>
                  </List>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Patient
                      </Typography>
                      <Typography gutterBottom>name: {patient.name}</Typography>
                      <Typography gutterBottom>
                        address: {patient.address}
                      </Typography>
                      <Typography gutterBottom>
                        age: {getAgeFromDate(patient.dateOfBirth)}
                      </Typography>
                    </Grid>
                    <Grid item container direction="column" xs={12} sm={6}>
                      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Doctor
                      </Typography>
                      <Grid container>
                        <React.Fragment>
                          <Grid item xs={6}>
                            <Typography gutterBottom>name: </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography gutterBottom>{user.name}</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography gutterBottom>info: </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography gutterBottom>{user.info}</Typography>
                          </Grid>
                        </React.Fragment>
                      </Grid>
                    </Grid>
                  </Grid>
                </React.Fragment>
              )}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? "Submit" : "Next"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}
