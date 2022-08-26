import { useQuery } from '@apollo/client';
import { AppBar, Box, Button, Container, Divider, Drawer, InputAdornment, TextField, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Pagination from '@material-ui/lab/Pagination';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Sportify_Logo from '../assets/image/Sportify_Logo.svg';
import EventCardListNew from "../components/EventCardListNew";

const country_city_data = require('../static/country_city.json');

const { GET_EVENTS_BY_SPORT_QUERY } = require('../graphql');

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),

    },
    appBarSpacer: theme.mixins.toolbar,
    body: {
        paddingLeft: theme.spacing(4)
    },
    divider: {
        background: "rgba(73, 150, 255,0.4)"
    },
    divider2: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
    },
    drawer: {
        width: 300,
        flexShrink: 0,
    },
    drawerPaper: {
        width: 300,
        border: '1px solid rgba(73, 150, 255,0.4)'
    },
    filter: {
        '&:hover': {
            backgroundColor: "rgba(73, 150, 255, 0.1)"
        }
    },
    autoComplete: {
        width: "250",
    },
}));
// const CssTextField = withStyles({
//     root: {
//         '& input:valid + fieldset': {
//             borderColor: "rgba(73, 150, 255,0.4)",
//             borderWidth: 2,
//         },
//         '& input:valid:focus + fieldset': {
//             borderColor: "#4996ff",
//         },
//         '& input:valid:hover + fieldset': {
//             borderColor: "#4996ff",
//         },
//     }
// })(TextField)
function FindEventPage(props) {
    const classes = useStyles();
    const { loading, data, refetch } = useQuery
        (GET_EVENTS_BY_SPORT_QUERY, {
            variables: { sportType: props.match.params.sportType }
        });
    const [eventList, setEventList] = useState([]);
    const [searchWord, setSearchWord] = useState("");
    const [date, setDate] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    useEffect(() => {
        refetch();
        if (!loading) {
            if (data.getEventsBySport.length >= 18)
                setEventList(data.getEventsBySport.slice(0, 18));
            else
                setEventList(data.getEventsBySport.slice(0, data.getEventsBySport.length));
            setTotalPage(Math.ceil(data.getEventsBySport.length / 18));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    console.log("eventlist: ", eventList);
   
    const handleCountry = (e, v, r) => {
        if (r !== 'clear')
            setCountry(v);
        else
            setCountry("");
        setCity("");
    }

    const countries = Object.keys(country_city_data);
    var cities = country === "" ? [] : country_city_data[country];
    const displayList = eventList.filter(event=>(
        (event.title?.includes(searchWord) || event.location?.includes(searchWord) || event.description?.includes(searchWord)) && ((event.date <= date && event.dateEnd >= date) || date==="") && (event.country===country || country==="") && (event.city===city || city==="")
    ))
    const handleChangePage = (e, v) => {
        let upper = (v - 1) * 18 + 18;
        let lower = (v - 1) * 18;
        if (data.getEventsBySport.length >= upper)
            setEventList(data.getEventsBySport.slice(lower, upper));
        else
            setEventList(data.getEventsBySport.slice(lower, data.getEventsBySport.length));
        setPage(v);
    }

    return (
        <div>
            <AppBar style={{
                background: "#FFFFFF",
                boxShadow: 'none',
                borderBottom: '1px solid rgba(73, 150, 255,0.4)',
                zIndex: 1201
            }}>
                <Toolbar>
                    <Container maxWidth='xl' >
                        <Box display="flex" flexDirection="row" justifyContent="space-between">
                            <Box>
                                <Button component={Link} to={'/'}><img src={Sportify_Logo} alt='logo' style={{ height: 40, width: 120 }} /></Button>
                            </Box>
                            <Box>
                                <Button
                                    variant='outlined'
                                    style={{
                                        color: "#4996ff", background: '#FFFFFF', fontWeight: 'bold',
                                        borderColor: "#4996ff", textTransform: 'none', marginTop: 10
                                    }}
                                    component={Link} to={'/auth'}>Host Event</Button>
                            </Box>
                        </Box>
                    </Container>
                </Toolbar>

            </AppBar>
            <Box display='flex' flexDirection='row'>
                <Box display='flex' flexDirection='column'>
                    <Drawer
                        variant="permanent"
                        anchor="left"
                        open={true}
                        className={classes.drawer}
                        classes={{
                            paper: classes.drawerPaper,
                        }}>
                        <Toolbar />
                        <Box style={{ color: "#4996ff", paddingTop: 10, paddingLeft: 30, paddingRight: 30, paddingBottom: 20, marginBottom: 20 }}>
                            <Box style={{ marginTop: 20, marginBottom: 10 }}>
                                <Typography >Search Event</Typography>
                            </Box>
                            <TextField
                                variant='outlined'
                                placeholder='Enter keyword...'
                                borderColor="#4996ff"
                                value={searchWord}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                onChange={(e) => { setSearchWord(e.target.value) }}></TextField>
                        </Box>
                        <Divider className={classes.divider} />

                        <Box display='flex' flexDirection='column' className={classes.filter} style={{ color: "#4996ff", padding: 30 }}>
                            <Box style={{marginBottom:10}}>
                                <Typography >Location</Typography>
                            </Box>

                            <Autocomplete
                                id="country"
                                className={classes.autoComplete}
                                value={country}
                                onChange={handleCountry}
                                options={countries}
                                size="small"
                                getOptionLabel={(option) => option}
                                style={{marginBottom:10}}
                                renderInput={(params) => <TextField {...params} label="Country" variant="outlined" 
                                />}
                            />
                            <Autocomplete
                                id="city"
                                className={classes.autoComplete}
                                value={city}
                                onChange={(e, v) => setCity(v)}
                                options={cities}
                                size="small"
                                getOptionLabel={(option) => option}
                                renderInput={(params) => <TextField {...params} label="City" variant="outlined" />
                                }
                                style={{display:country?"":"none"}}
                            />
                        </Box>

                        <Divider className={classes.divider} />

                        <Box display='flex' flexDirection='column' className={classes.filter} style={{ color: "#4996ff", padding: 30 }}>
                            <Box >
                                <Typography>Date</Typography>
                            </Box>
                            <TextField variant='outlined' type='date'
                                value={date}
                                format=""
                                onChange={(e) => { setDate(e.target.value) }}

                            />
                        </Box>
                        <Divider className={classes.divider} />


                    </Drawer>
                </Box>
                <Box display='flex' flexDirection='column' style={{ width: "100%" }}>
                    {/* <Box style={{ marginLeft: 'auto', marginRight: 'auto', width: '80%', marginTop: 50 }}>
                        <Toolbar />
                        <FindEventBulletin eventList={eventList} />
                    </Box>
                    <Box>
                        hi
                    </Box> */}
                    <Container maxWidth='xl'>
                        <Toolbar />
                        <Typography style={{ marginTop: 50, marginLeft: 20, marginBottom: 40, fontSize: 30, color: "#4996ff" }}>Event List</Typography>
                        <EventCardListNew style={{ marginTop: 50 }} events={displayList} />
                        <Pagination
                            style={{ marginBottom: '30px' }}
                            count={totalPage}
                            page={page}
                            onChange={handleChangePage}
                            showFirstButton showLastButton
                        />
                    </Container>
                </Box>
            </Box>
        </div>
    )
}

export default FindEventPage;