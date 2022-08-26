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
const { GET_MATCHES_QUERY } = require('../graphql');

const useStyles_table = makeStyles({
    table: {
        minWidth: 650,
    },
});


function EventResult(props) {

    // const { loading, error, data, subscribeToMore } = useQuery(GET_MATCHES_QUERY, { variables: { event_id: props.eventID } });
    // // if (error) console.log(error);

    // subscribeToMore({
    //     document: UPDATE_MATCH_SUBSCRIPTION,
    //     variables: { event_id: props.eventID },
    //     updateQuery: (prev, { subscriptionData }) => {
    //         if (!subscriptionData.data) return prev;
    //         const updateMatch = subscriptionData.data.updateMatch;
    //         const match_index = prev.getMatch.findIndex(e => e._id === updateMatch._id);
    //         var newMatches = [prev.getMatch.slice(0, match_index), updateMatch, prev.getMatch.slice(match_index + 1, prev.getMatch.length)]
    //         return newMatches;
    //     }
    // });

    const { loading, error, data, refetch } = useQuery(GET_MATCHES_QUERY, { variables: { event_id: props.eventID } });


    useEffect(() => {
        refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.currentTab])

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
            return <ResultTable score={score} />
        })
    }
}

const ResultTable = ({ score }) => {

  
    const classes_table = useStyles_table();

    if (score.live === false){

        return (

            [
    
                <TableContainer component={Paper}>
                    <Table className={classes_table.table} aria-label="simple table">
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
            ]

        );

    }
    else{

        return ([

            //<Typography variant="h4" className={classes_typo.title}> <FormattedMessage id="eventTrackingResult.title" /> </Typography>

        ]);

    }
    
}

export default EventResult;


