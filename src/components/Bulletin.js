import { Box, Button, Paper } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SportsTennisIcon from '@material-ui/icons/SportsTennis';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Carousel from 'react-material-ui-carousel';
import { NavLink } from "react-router-dom";
const url = [
  'https://www.perfect-tennis.com/wp-content/uploads/2019/10/atp-finals-prize-money.jpg',
  'https://images.unsplash.com/photo-1519672808815-bdd52bb3bd41?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80',
  'https://images.unsplash.com/photo-1524951525241-4144ce9de04b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=968&q=80',
  'https://images.unsplash.com/flagged/photo-1576972405668-2d020a01cbfa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1053&q=80',
  'https://images.unsplash.com/photo-1572854252129-a18ce4979ff4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1051&q=80',
  'https://images.unsplash.com/photo-1507324915753-e6b6ca43ed1e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1029&q=80',
  'https://i.ibb.co/M2TWGdL/photo-1618888214467-d9e325c92fe1.jpg',
  'https://i.ibb.co/jRHVCm1/photo-1595435934249-5df7ed86e1c0.jpg',
  'https://i.ibb.co/WKvRWrQ/photo-1545809074-59472b3f5ecc.jpg',
  'https://i.ibb.co/B6FtGxT/photo-1567220720374-a67f33b2a6b9.jpg',




]
const useStyles = makeStyles((theme) => ({
  // summary: {
  //   overflow: 'hidden',
  //   textOverflow: 'ellipsis'
  // },
  root: {
    color: 'white',
    backgroundColor: "#212121",
    marginTop: theme.spacing(6),
    borderRadius: 20
  },
  mainFeaturedPost: {
    position: 'relative',
    height: 500,
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    // marginTop: theme.spacing(6),
    // backgroundImage: 'url(https://www.perfect-tennis.com/wp-content/uploads/2019/10/atp-finals-prize-money.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
}));


function Bulletin(props) {
  var items = props.eventList
  return (
    <Carousel timeout={1000} interval={10000}>

      {
        items.map((item, i) => <Item key={i} item={item} index={i} />)
      }
    </Carousel>
  )
}

function Item(props) {
  const classes = useStyles();
  // console.log(props)
  const URL = url[props.index]
  const imgURL = props.item.imgURL ? props.item.imgURL : URL
  return (
    <Paper data-cy='carousel' className={classes.mainFeaturedPost} style={{ backgroundImage: `url(${imgURL})` }} >
      {/* Increase the priority of the hero background image */}
      {/* {<img style={{ display: 'none' }} src={props.item.img} />} */}
      <div className={classes.overlay} />
      {/* <Grid container> */}
      <Grid item md={6}>
        <div className={classes.mainFeaturedPostContent} >
          <Typography data-cy='carousel-title' component="h1" variant="h3" color="inherit" gutterBottom>
            {props.item.title}
          </Typography>
          <Box>
            <Typography data-cy='carousel-highlight' variant="h5" color="inherit" >
              {props.item.highlight}
            </Typography>
          </Box >
          <Link variant="subtitle1" href="#">
            <Button data-cy='carousel-button' className={classes.root} variant='outlined' component={NavLink} to={"/event/" + props.item._id} startIcon={<SportsTennisIcon />}><FormattedMessage id='register-main' /></Button>
          </Link>
        </div>
      </Grid>
      {/* </Grid> */}
    </Paper>
  )
}
export default Bulletin;