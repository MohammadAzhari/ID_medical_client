import { Typography, Link } from "@mui/material";
// import { Link } from "react-router-dom";

export default function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mazhari.herokuapp.com">
        M.Azhari
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
