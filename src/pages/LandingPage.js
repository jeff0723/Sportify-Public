import { AppBar, Box, Button, Container, Divider, Grid, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EventIcon from '@material-ui/icons/Event';
import FacebookIcon from '@material-ui/icons/Facebook';
import SearchIcon from '@material-ui/icons/Search';
import Skeleton from '@material-ui/lab/Skeleton';
import React,{useState} from 'react';
import { Link } from "react-router-dom";
import add_post from '../assets/image/add_post.svg';
import booking from '../assets/image/booking.svg';
import clock from '../assets/image/clock.svg';
import Sportify_Logo from '../assets/image/Sportify_Logo.svg';
import SelectSportType from '../components/SelectSportType';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const useStyles = makeStyles((theme) => ({
    main: {
        background: `url(https://images.unsplash.com/photo-1595435742656-5272d0b3fa82?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80)`,
        height: '80vh',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    },
    svg: {
        height: 200,
        width: 200,
    }
}))
export default function LandingPage() {
    const classes = useStyles();
    const [dialogOpen,setDialogOpen] = useState(false);
    const handleDialogClose = () =>{
        setDialogOpen(false);
    }
    return (
        <div>
            <AppBar style={{
                background: "#FFFFFF",
                boxShadow: 'none',
                borderBottom: '1px solid rgba(0, 0, 0, 0.125)'
            }}>
                <Toolbar >
                    <Container maxWidth='lg' >
                        <Box display="flex" flexDirection="row" justifyContent="space-between">
                            <Box>
                                <Button ><img src={Sportify_Logo} alt='logo' style={{ height: 40, width: 120 }} /></Button>
                            </Box>

                            <Box >
                                <Button
                                    variant='outlined'
                                    style={{
                                        color: "#4996ff", background: '#FFFFFF', fontWeight: 'bold',
                                        marginRight: 20, borderColor: "#4996ff", textTransform: 'none',
                                        marginTop: 10
                                    }}
                                    onClick={()=>{setDialogOpen(true)}}>Find Event</Button>
                                <Button
                                    variant='outlined'
                                    style={{
                                        color: "#4996ff", background: '#FFFFFF', fontWeight: 'bold',
                                        borderColor: "#4996ff", textTransform: 'none', marginTop: 10
                                    }}
                                    component={Link} to={'/auth'}>Host Event</Button>
                            </Box>
                        </Box>
                        <SelectSportType open={dialogOpen} handleClose={handleDialogClose}/>
                    </Container>
                </Toolbar>
            </AppBar>
            <Box dispaly='flex' flexDirection='column'>
                <Box display='flex'
                    className={classes.main}
                    style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Box>
                        <Typography
                            style={{
                                fontSize: 60,
                                color: '#FFFFFF',
                                textAlign: 'center',
                            }}
                        >
                            A new way to <span style={{ color: '#4996ff', fontWeight: 'bold' }}>experience</span> sport
                        </Typography>
                    </Box>
                </Box>

                <Box>
                    <Container style={{ height: '70vh' }}>
                        <Typography
                            style={{ paddingTop: 50, textAlign: 'center', fontSize: 36, color: '#4996ff', fontWeight: "bold" }}
                        > What we do</Typography>
                        <Grid container justifyContent="center" spacing={3} >
                            <Grid item lg={4} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <img src={booking} alt='booking' className={classes.svg} />
                                <Typography style={{ fontSize: 20, color: "#4996ff" }}>Find Events</Typography>
                                <Typography style={{ fontSize: 16, width: 250, marginTop: 20, color: "#707a83", textAlign: 'center' }}>All kinds of sport event on our platform. Choose any event your like and unleash your sport talent.</Typography>

                            </Grid>
                            <Grid item lg={4} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <img src={add_post} alt='booking' className={classes.svg} />
                                <Typography style={{ fontSize: 20, color: "#4996ff" }}>Host Events</Typography>
                                <Typography style={{ fontSize: 16, width: 250, marginTop: 20, color: "#707a83", textAlign: 'center' }}>Everything is automated on our platform. No more hustle to host an event. Become an host and provide the best experience.</Typography>

                            </Grid>
                            <Grid item lg={4} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <img src={clock} alt='booking' className={classes.svg} />
                                <Typography style={{ fontSize: 20, color: "#4996ff" }}>Participate Events</Typography>
                                <Typography style={{ fontSize: 16, width: 250, marginTop: 20, color: "#707a83", textAlign: 'center' }}>We provide real time event progress tracking including checkin system and live score. No more waste of time during any event.</Typography>



                            </Grid>
                        </Grid>
                    </Container>
                </Box>
                <Box>
                    <Container maxWidth='lg' style={{ marginTop: 150, height: '100vh' }}>

                        <Grid container spacing={10}>
                            <Grid item lg={6} >
                                <Button variant='contained' style={{ color: "#FFFFFF", height: 48, width: 48, background: "#4996ff", marginBottom: 20 }}><SearchIcon /></Button>
                                <Typography style={{ fontWeight: 'bold', fontSize: 36, marginBottom: 20 }}>Always find your enjoyable event with the least effort.</Typography>
                                <Typography style={{ fontSize: 20, marginBottom: 20, color: "#707a83" }}>Plug & Play preapproved deals ensure that you never have to run a newsletter without filling all of your ad units.</Typography>
                                <Typography style={{ fontSize: 20, marginBottom: 30, color: "#707a83" }}>We negotiate high paying affiliate deals with a curated list of brands, and pre-approve Swapstack writers to ensure you can run one of these deals at any moment.</Typography>
                                <Button variant='contained' style={{ color: "#FFFFFF", background: "#4996ff", textTransform: 'none' }} onClick={()=>{setDialogOpen(true)}}>Find your suitable event now    <ArrowForwardIosIcon style={{marginLeft:10,fontSize:12}}/></Button>



                            </Grid>
                            <Grid item lg={6} > <Skeleton variant="rect" width={'100%'} height={"100%"} animation={false} /></Grid>

                        </Grid>
                    </Container>
                </Box>
                <Box>
                    <Container maxWidth='lg' style={{ height: '100vh' }}>

                        <Grid container spacing={10}>
                            <Grid item lg={6} > <Skeleton variant="rect" width={'100%'} height={"100%"} animation={false} /></Grid>
                            <Grid item lg={6} >
                                <Button variant='contained' style={{ color: "#FFFFFF", height: 48, width: 48, background: "#4996ff", marginBottom: 20 }}><EventIcon /></Button>
                                <Typography style={{ fontWeight: 'bold', fontSize: 36, marginBottom: 20 }}>Always find your enjoyable event with the least effort.</Typography>
                                <Typography style={{ fontSize: 20, marginBottom: 20, color: "#707a83" }}>Plug & Play preapproved deals ensure that you never have to run a newsletter without filling all of your ad units.</Typography>
                                <Typography style={{ fontSize: 20, marginBottom: 30, color: "#707a83" }}>We negotiate high paying affiliate deals with a curated list of brands, and pre-approve Swapstack writers to ensure you can run one of these deals at any moment.</Typography>
                                <Button variant='contained' style={{ color: "#FFFFFF", background: "#4996ff", textTransform: 'none' }} component={Link} to={'/auth'}> <ArrowBackIosIcon style={{fontSize:12,marginRight:10}}/> Create an account to get started </Button>

                            </Grid>
                        </Grid>

                    </Container>
                    <Divider  />

                </Box>
                <Box>

                    <Container maxWidth='lg'>
                        <Box display='flex' flexDirection='row' justifyContent='space-between' style={{ paddingTop: 30, paddingBottom: 30 }}>
                            <Box>
                                <img src={Sportify_Logo}
                                    alt='none'
                                    style={{ height: 40, width: 120 }} />
                            </Box>
                            <Box >
                                <Button style={{ color: '#4996ff',textTransform:'none'}}>About us</Button>
                                <Button style={{ color: '#4996ff',textTransform:'none' }}>Term & Service</Button>
                                <Button style={{ color: '#4996ff',textTransform:'none' }}>FAQ</Button>
                                <Button style={{ color: '#4996ff',textTransform:'none' }}>Contact Us</Button>
                                <Button style={{ color: '#4996ff',textTransform:'none' }}><FacebookIcon /></Button>

                            </Box>
                            <Box>
                                <Button style={{ color: '#4996ff', textTransform: 'None' }}>jeffreylin0723@gmail.com</Button>
                            </Box>
                        </Box>
                        <Box style={{ color: "#707a83", textAlign: 'center' }}>
                            Copyright &copy; 2021 Sportify
                        </Box>
                    </Container>
                </Box>
            </Box>

        </div>
    )
}
