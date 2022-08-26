import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import React from "react";
import EventStatusTable from "../components/EventStatusTable";
import Navbar from "../components/Navbar";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

function EventManagement(props) {
  const classes = useStyles();

  return (
    <>
    <Navbar/>
    <Container maxWidth="md" className={classes.container}>
      <Toolbar />

      <EventStatusTable hostID={props.match.params.hostID} />
    </Container>
    </>
  );
}

export default EventManagement;