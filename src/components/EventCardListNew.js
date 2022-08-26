import React from "react";
import { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import EventCardNew from "./EventCardNew";
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),

  },
}));

function EventCardListNew({ events }) {
  const classes = useStyles();

  const watcher = new IntersectionObserver(onEnterView)

  useEffect(() => {
    const lazyImages = document.querySelectorAll('img.MuiCardMedia-img');

    for (let image of lazyImages) {
      watcher.observe(image) // 開始監視
    }
  });


  function onEnterView(entries, observer) {
    for (let entry of entries) {
      if (entry.isIntersecting) {
        // 監視目標進入畫面
        const img = entry.target
        img.setAttribute('src', img.dataset.src) // 把值塞回 src
        observer.unobserve(img) // 取消監視
      }
    }
  }

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        {events.map((e, i) => {
          return (
            <Grid item lg={3} sm={6} md={4} key={i}>
              <EventCardNew event={e} />
            </Grid>
          )
        })}
      </Grid>
    </Container>
  );
}

export default EventCardListNew;
