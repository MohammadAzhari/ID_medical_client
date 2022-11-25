import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function DiagnoseItem({ diagnose }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ width: "80%", marginBottom: "20px" }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={diagnose.text}
        subheader={diagnose.createdAt}
      />
      <CardContent>
        <Typography variant="body1" color="text.secondary">
          {"Hospital :" + diagnose.hospital} <br />
          {"Doctor :" + diagnose.doctor.name} <br />
          {"Treatment :" + diagnose.treatment} <br />
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton>
          <AssignmentTurnedInIcon
            color={diagnose.done ? "success" : "warning"}
          />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          About the doctor
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body1" color="text.secondary">
            {"Doctor :" + diagnose.doctor.name} <br />
            {"Email :" + diagnose.doctor.email} <br />
            {"Info :"}
          </Typography>
          <Typography paragraph>{diagnose.doctor.info}</Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton>See More</IconButton>
        </CardActions>
      </Collapse>
    </Card>
  );
}
