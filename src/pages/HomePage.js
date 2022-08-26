import { useQuery } from '@apollo/client';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Suspense, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import Bulletin from '../components/Bulletin';
import EventCardList from "../components/EventCardList";
import Footer from '../components/Footer';
import LoadingGif from '../components/LoadingGif';
import NavbarH from "../components/NavbarH";

const { GET_EVENTS_QUERY } = require('../graphql');

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),

    },
    appBarSpacer: theme.mixins.toolbar,
    body:{
     paddingLeft:theme.spacing(4)
    },
    divider: {
        marginTop: theme.spacing(4),
    },
    divider2: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
    }
}));

function HomePage() {
    const classes = useStyles();
    const { loading, error, data, refetch } = useQuery
        (GET_EVENTS_QUERY);
    const [eventList, setEventList] = useState([]);
    if (error) console.log(error);
    // if (!eventList.length && data) {
    //     setEventList(data.getEvents);
    // }

    useEffect(() => {
        refetch();
        if (!loading)
            setEventList(data.getEvents);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return (
        <div>
            <Suspense fallback={<LoadingGif />}>
                <NavbarH/>
                <div className={classes.appBarSpacer} />
                {data ?
                    <>
                        <Bulletin eventList={data.getEvents.slice(0, 10)} />
                    </>
                    : <></>
                }
                <Suspense fallback={<LoadingGif />}>
                    <Container maxWidth="lg" className={classes.container} >
                        {data ?
                            <Typography data-cy='all-events' className={classes.body} gutterBottom variant="h5" component="h2">
                                <FormattedMessage id="homePage.allEvents" />
                            </Typography> : <></>}
                        {loading ?

                            <Typography data-cy='loading' className={classes.body} >
                                <FormattedMessage id="loading" />
                            </Typography>      
                            //LoadingGif() 

                                : (
                                data ? (eventList.length ?                             
                                    <EventCardList events={eventList} /> 

                                    :
                                    <Typography>
                                        <FormattedMessage id="no-result" />
                                    </Typography>
                                )
                                    :
                                    <Typography>
                                        Cannot connect to server.
                            </Typography>)
                        }
                    </Container> 
                </Suspense>

                <Divider />
                <Footer />
            </Suspense>
        </div>
    )
}

export default HomePage;