import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React from "react";
import EventCard from "./EventCard";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),

  },
}));

function EventCardList({ events }) {
  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        {events.map((e, i) => {
          return (
            <Grid item lg={3} sm={6} md={4} key={i}>
              <EventCard event={e} />
            </Grid>
          )
        })}
      </Grid>
    </Container>
  );
}

export default EventCardList;
