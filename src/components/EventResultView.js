import { useQuery } from '@apollo/client';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useMediaQuery } from 'react-responsive';
const { GET_MATCHES_QUERY, UPDATE_MATCH_SUBSCRIPTION } = require('../graphql');


function EventResultView(props) {

    const { loading, error, data, subscribeToMore } = useQuery(GET_MATCHES_QUERY, { variables: { event_id: props.eventID } });
    // if (error) console.log(error);

    subscribeToMore({
        document: UPDATE_MATCH_SUBSCRIPTION,
        variables: { event_id: props.eventID },
        updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
            const updateMatch = subscriptionData.data.updateMatch;
            const match_index = prev.getMatch.findIndex(e => e._id === updateMatch._id);
            var newMatches = [prev.getMatch.slice(0, match_index), updateMatch, prev.getMatch.slice(match_index + 1, prev.getMatch.length)]
            return newMatches;
        }
    });

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
            return <ResultTableView score={score} />
        })
    }
}

const ResultTableView = ({ score }) => {

    const isTabletOrMobile = useMediaQuery({ query: `(max-width: ${700}px),(min-width:${400}px)` })
    const isMobile = useMediaQuery({ query: `(max-width: ${400}px)` })


    if (score.live === false) {
        return (

            // TrackingTable(score)
            <>
                {!isTabletOrMobile ?
                    <>
                        {/* <Typography variant="h4" className={classes_typo.title}> {score.match_name} </Typography> */}

                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell> 賽事名稱 </TableCell>
                                        <TableCell align="center">  <FormattedMessage id="eventTracking.playername" />  </TableCell>
                                        <TableCell align="center">  </TableCell>
                                        <TableCell align="center"> 賽事結果 </TableCell>
                                        <TableCell align="center">  </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            {score.match_name}
                                        </TableCell>
                                        <TableCell align="center">
                                            {score.player_p1} {score.player_p2}
                                        </TableCell>
                                        <TableCell align="center">
                                            {score.set1_p1} - {score.set1_p2}
                                        </TableCell>
                                        <TableCell align="center">
                                            {score.set2_p1} - {score.set2_p2}
                                        </TableCell>
                                        <TableCell align="center">
                                            {score.set3_p1} - {score.set3_p2}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
                    :
                    (!isMobile ?
                        <>
                            {/* <Typography variant="h4" className={classes_typo.title}> {score.match_name} </Typography> */}
                            <TableContainer component={Paper}>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell> 賽事名稱 </TableCell>
                                            <TableCell align="center">  <FormattedMessage id="eventTracking.playername" />  </TableCell>
                                            <TableCell align="center">  </TableCell>
                                            <TableCell align="center"> 賽事結果 </TableCell>
                                            <TableCell align="center">  </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                {score.match_name}
                                            </TableCell>
                                            <TableCell align="center">
                                                {score.player_p1} {score.player_p2}
                                            </TableCell>
                                            <TableCell align="center">
                                                {score.set1_p1} - {score.set1_p2}
                                            </TableCell>
                                            <TableCell align="center">
                                                {score.set2_p1} - {score.set2_p2}
                                            </TableCell>
                                            <TableCell align="center">
                                                {score.set3_p1} - {score.set3_p2}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </> :
                        <>
                            {/* <Typography variant="h5" className={classes_typo.title}> {score.match_name} </Typography> */}
                            <TableContainer component={Paper}>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell> 賽事名稱 </TableCell>
                                            <TableCell align="center">  <FormattedMessage id="eventTracking.playername" />  </TableCell>
                                            <TableCell align="center">  </TableCell>
                                            <TableCell align="center"> 賽事結果 </TableCell>
                                            <TableCell align="center">  </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                {score.match_name}
                                            </TableCell>
                                            <TableCell align="center">
                                                {score.player_p1} {score.player_p2}
                                            </TableCell>
                                            <TableCell align="center">
                                                {score.set1_p1} - {score.set1_p2}
                                            </TableCell>
                                            <TableCell align="center">
                                                {score.set2_p1} - {score.set2_p2}
                                            </TableCell>
                                            <TableCell align="center">
                                                {score.set3_p1} - {score.set3_p2}
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
    else {

        return ([]);

    }
}

export default EventResultView;
