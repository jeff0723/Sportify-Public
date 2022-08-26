import { useQuery } from '@apollo/client';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from "react-redux";
import { useMediaQuery } from 'react-responsive';

const { GET_MATCHES_QUERY } = require('../graphql');

const useStyles_table = makeStyles({
    table: {
        minWidth: 650,
    },
});

const useStyles_typo = makeStyles((theme) => ({
    root: {
        color: 'white',
        backgroundColor: "#212121",
        marginBottom: theme.spacing(2),
        borderRadius: 10
    },
    title: {
        marginTop: "30px",
        marginBottom: "30px",
    },
}));

function EventTrackingView(props) {

    const { loading, error, data, refetch } = useQuery(GET_MATCHES_QUERY, { variables: { event_id: props.eventID } });
    // if (error) console.log(error);

    useEffect(() => {
        let refetch_interval = setInterval(refetch, 10000);

        return () => clearInterval(refetch_interval);
    })

    if (error) {
        console.log(error.message);
    }
    if (loading) {
        return (<Typography>
            <FormattedMessage id='loading' />
        </Typography>)
    }
    if (data) {
        const total_score = data.getMatch
        return total_score.map(score => {
            return <TrackingTableView score={score} />
        })
    }
}

const TrackingTableView = ({ score }) => {
    const locale = useSelector(state => state.locale.locale);
    const isTabletOrMobile = useMediaQuery({ query: `(max-width: ${700}px),(min-width:${400}px)` })
    const isMobile = useMediaQuery({ query: `(max-width: ${400}px)` })
    const classes_table = useStyles_table();
    const classes_typo = useStyles_typo();
    const serve_p1 = score.serve_p1 === " " ? " " : (locale === "en" ? "Serve" : "發球")
    const serve_p2 = score.serve_p2 === " " ? " " : (locale === "en" ? "Serve" : "發球")

    if (score.live === true){
        return (

            // TrackingTable(score)
            <>
                {!isTabletOrMobile ?
                    <>
                        <Typography variant="h4" className={classes_typo.title}> {score.match_name} </Typography>

                        <TableContainer component={Paper}>
                            <Table className={classes_table.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell> <FormattedMessage id='eventTracking.player' /></TableCell>
                                        <TableCell align="center"> <FormattedMessage id='eventTracking.righttoserve' /> </TableCell>
                                        <TableCell align="center"> <FormattedMessage id='eventTracking.point' /> </TableCell>
                                        <TableCell align="center"> <FormattedMessage id='eventTracking.game1' /> </TableCell>
                                        <TableCell align="center"><FormattedMessage id='eventTracking.game2' />  </TableCell>
                                        <TableCell align="center"><FormattedMessage id='eventTracking.game3' />  </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    <TableRow key={score._id}>
                                        <TableCell component="th" scope="row">
                                            {score.player_p1}
                                        </TableCell>
                                        <TableCell align="center">
                                            {serve_p1}
                                        </TableCell>
                                        <TableCell align="center">
                                            {score.point_p1}
                                        </TableCell>
                                        <TableCell align="center">
                                            {score.set1_p1}
                                        </TableCell>
                                        <TableCell align="center">
                                            {score.set2_p1}
                                        </TableCell>
                                        <TableCell align="center">
                                            {score.set3_p1}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow key={score._id}>
                                        <TableCell component="th" scope="row">
                                            {score.player_p2}
                                        </TableCell>
                                        <TableCell align="center">
                                            {serve_p2}
                                        </TableCell>
                                        <TableCell align="center">
                                            {score.point_p2}
                                        </TableCell>
                                        <TableCell align="center">
                                            {score.set1_p2}
                                        </TableCell>
                                        <TableCell align="center">
                                            {score.set2_p2}
                                        </TableCell>
                                        <TableCell align="center">
                                            {score.set3_p2}
                                        </TableCell>
                                    </TableRow>

                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
                    :
                    (!isMobile ?
                        <>
                            <Typography variant="h4" className={classes_typo.title}> {score.match_name} </Typography>
                            <TableContainer component={Paper}>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell> <FormattedMessage id='eventTracking.player' /></TableCell>
                                            <TableCell align="center"> <FormattedMessage id='eventTracking.righttoserve' /> </TableCell>
                                            <TableCell align="center"> <FormattedMessage id='eventTracking.point' /> </TableCell>
                                            <TableCell align="center"> <FormattedMessage id='eventTracking.game1' /> </TableCell>
                                            <TableCell align="center"><FormattedMessage id='eventTracking.game2' />  </TableCell>
                                            <TableCell align="center"><FormattedMessage id='eventTracking.game3' />  </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                {score.player_p1}
                                            </TableCell>
                                            <TableCell align="center">
                                                {serve_p1}
                                            </TableCell>
                                            <TableCell align="center">
                                                {score.point_p1}
                                            </TableCell>
                                            <TableCell align="center">
                                                {score.set1_p1}
                                            </TableCell>
                                            <TableCell align="center">
                                                {score.set2_p1}
                                            </TableCell>
                                            <TableCell align="center">
                                                {score.set3_p1}
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                {score.player_p2}
                                            </TableCell>
                                            <TableCell align="center">
                                                {serve_p2}
                                            </TableCell>
                                            <TableCell align="center">
                                                {score.point_p2}
                                            </TableCell>
                                            <TableCell align="center">
                                                {score.set1_p2}
                                            </TableCell>
                                            <TableCell align="center">
                                                {score.set2_p2}
                                            </TableCell>
                                            <TableCell align="center">
                                                {score.set3_p2}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </> :
                        <>
                            <Typography variant="h5" className={classes_typo.title}> {score.match_name} </Typography>
                            <TableContainer component={Paper}>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell> <FormattedMessage id='eventTracking.player' /></TableCell>
                                            <TableCell align="center"> <FormattedMessage id='eventTracking.righttoserve_rwd' /> </TableCell>
                                            <TableCell align="center"> <FormattedMessage id='eventTracking.point_rwd' /> </TableCell>
                                            <TableCell align="center"> <FormattedMessage id='eventTracking.game1_rwd' /> </TableCell>
                                            <TableCell align="cente"><FormattedMessage id='eventTracking.game2_rwd' />  </TableCell>
                                            <TableCell align="center"><FormattedMessage id='eventTracking.game3_rwd' />  </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                {score.player_p1}
                                            </TableCell>
                                            <TableCell align="center">
                                                {serve_p1}
                                            </TableCell>
                                            <TableCell align="center">
                                                {score.point_p1}
                                            </TableCell>
                                            <TableCell align="center">
                                                {score.set1_p1}
                                            </TableCell>
                                            <TableCell align="center">
                                                {score.set2_p1}
                                            </TableCell>
                                            <TableCell align="center">
                                                {score.set3_p2}
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                {score.player_p2}
                                            </TableCell>
                                            <TableCell align="center">
                                                {serve_p2}
                                            </TableCell>
                                            <TableCell align="center">
                                                {score.point_p2}
                                            </TableCell>
                                            <TableCell align="center">
                                                {score.set1_p2}
                                            </TableCell>
                                            <TableCell align="center">
                                                {score.set2_p2}
                                            </TableCell>
                                            <TableCell align="center">
                                                {score.set3_p2}
                                            </TableCell>
                                        </TableRow>

                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </>)           
                }
            </>
        );
    }
    else{

        return([]);

    }
}

export default EventTrackingView;
