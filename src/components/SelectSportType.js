import { AppBar, Box, Card, CardActionArea, CardActions, Container, Dialog, Grid, IconButton, Toolbar, Typography,Slide} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from "react-router-dom";
import { badminton_icon, baseball_icon, basketball_icon, handball_icon, soccer_icon, table_tennis_icon, tennis_icon } from '../assets/image/landingPage/index';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
        backgroundColor: '#4996ff'
    },
    title: {
        flexGrow: 1,
        textAlign: 'center',
    },
    card: {
        transition: "transform 250ms",
        "&:hover": {
            transform: "translateY(-10px)"
        }
    }
}));
const sportType = [
    {
        name: 'Tennis',
        value:'tennis',
        url: tennis_icon
    },
    {
        name: 'Basketball',
        value:'basketball',
        url: basketball_icon
    },
    {
        name: 'Baseball',
        value:'baseball',
        url: baseball_icon
    },
    {
        name: 'Table Tennis',
        value:'table-tennis',
        url: table_tennis_icon
    },
    {
        name: 'Badminton',
        value:'badminton',
        url: badminton_icon
    },
    {
        name: 'Soccer',
        value:'soccer',
        url: soccer_icon
    },
    {
        name: 'Handball',
        value:'handball',
        url: handball_icon
    },
]
// const sportType = [
//     {
//         name: 'Tennis',
//         value:'tennis',
//         url: 'https://images.unsplash.com/photo-1519611103964-90f61a50d3e6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
//     },
//     {
//         name: 'Basketball',
//         value:'basketball',
//         url: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
//     },
//     {
//         name: 'Baseball',
//         value:'baseball',
//         url: 'https://images.unsplash.com/photo-1529768167801-9173d94c2a42?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
//     },
//     {
//         name: 'Table Tennis',
//         value:'table-tennis',
//         url: 'https://images.unsplash.com/photo-1534158914592-062992fbe900?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80'
//     },
//     {
//         name: 'Badminton',
//         value:'badminton',
//         url: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
//     },
//     {
//         name: 'Soccer',
//         value:'soccer',
//         url: 'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
//     },
//     {
//         name: 'Handball',
//         value:'soccer',
//         url: 'https://images.unsplash.com/photo-1553627220-92f0446b6a5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
//     },
// ]
export default function SelectSportType({ open, handleClose }) {
    const classes = useStyles();
    return (
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Select Sport
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth='lg'>
                <Grid container spacing={5} style={{ marginTop: 20 }}>
                    {sportType.map((item,index) => (
                        <Grid item lg={3} md={3} sm={6} xs={12} key={index}>
                            <Card className={classes.card} >
                                <CardActionArea component={Link} to={"/find-event-page/" + item.value}>
                                    <Box style={{width:300,height:250,alignItems:'center',display:'flex',justifyContent:'center'}}> 
                                        <img src={item.url} alt={item.name} style={{width:'50%',height:'50%'}}/>
                                    </Box>
                                    <CardActions style={{ justifyContent: 'center' }}>
                                        <Typography>{item.name}</Typography>
                                    </CardActions>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))
                    }
                </Grid>
            </Container>
        </Dialog >
    )
}

SelectSportType.prototype = {
    open: PropTypes.bool,
    handleClose: PropTypes.func.isRequired
}