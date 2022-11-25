import axios from "axios";
import { authConfig, baseURL, basicConfig } from "../config";

export const signinCall = (user) =>
  axios.post(baseURL + "/api/signin", user, basicConfig);

export const signupCall = (user) =>
  axios.post(baseURL + "/api/signup", user, basicConfig);

export const getPatient = (id) => axios.get(baseURL + "/api/patient/" + id);

export const addPatient = (patient, token) =>
  axios.post(baseURL + "/api/patient", patient, authConfig(token));

export const addDiagnoseCall = (diagnose, token) =>
  axios.patch(baseURL + "/api/patient", diagnose, authConfig(token));
