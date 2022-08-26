import { useMutation, useQuery } from '@apollo/client';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import MuiAlert from '@material-ui/lab/Alert';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from "react-redux";



function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const { GET_MATCHES_QUERY, UPDATE_MATCH, DELETE_MATCH } = require('../graphql');

const useStyles_table = makeStyles({
    table: {
        minWidth: 1000,
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

function SwitchServe(serve1) {

    switch (serve1) {
        case ' ':
            return { p1: <FormattedMessage id="eventTracking.serve" />, p2: ' ' }

        default:
            return { p1: ' ', p2: ' ' }
    }
}

function AddPoint(point_p1, point_p2, game1_p1, game1_p2, game2_p1, game2_p2, game3_p1, game3_p2) {

    if ((game1_p1 === 6 && game1_p2 === 6) || ((game1_p1 >= 6 || game1_p2 >= 6) && (game2_p1 === 6 && game2_p2 === 6)) || ((game1_p1 >= 6 || game1_p2 >= 6) && (game2_p1 >= 6 || game2_p2 >= 6) && (game3_p1 === 6 && game3_p2 === 6))) {

        if (point_p1 <= 5 && point_p2 <= 6) {
            return { p1: point_p1 + 1, p2: point_p2, g1p1: game1_p1, g1p2: game1_p2, g2p1: game2_p1, g2p2: game2_p2, g3p1: game3_p1, g3p2: game3_p2 }
        }
        else if (point_p1 + 1 === point_p2 || point_p1 === point_p2) {
            return { p1: point_p1 + 1, p2: point_p2, g1p1: game1_p1, g1p2: game1_p2, g2p1: game2_p1, g2p2: game2_p2, g3p1: game3_p1, g3p2: game3_p2 }
        }
        else if (point_p1 >= point_p2 + 1) {
            var r = AddGameIterative(game1_p1, game1_p2, game2_p1, game2_p2, game3_p1, game3_p2)
            return { p1: 0, p2: 0, g1p1: r.g1p1, g1p2: r.g1p2, g2p1: r.g2p1, g2p2: r.g2p2, g3p1: r.g3p1, g3p2: r.g3p2 }
        }

    }
    else {

        switch (point_p1) {
            case 0:
                return { p1: 15, p2: point_p2, g1p1: game1_p1, g1p2: game1_p2, g2p1: game2_p1, g2p2: game2_p2, g3p1: game3_p1, g3p2: game3_p2 }

            case 15:
                return { p1: 30, p2: point_p2, g1p1: game1_p1, g1p2: game1_p2, g2p1: game2_p1, g2p2: game2_p2, g3p1: game3_p1, g3p2: game3_p2 }

            case 30:
                return { p1: 40, p2: point_p2, g1p1: game1_p1, g1p2: game1_p2, g2p1: game2_p1, g2p2: game2_p2, g3p1: game3_p1, g3p2: game3_p2 }

            case 40:
                switch (point_p2) {
                    case 40:
                        return { p1: 'AD', p2: 40, g1p1: game1_p1, g1p2: game1_p2, g2p1: game2_p1, g2p2: game2_p2, g3p1: game3_p1, g3p2: game3_p2 }

                    case 'AD':
                        return { p1: 40, p2: 40, g1p1: game1_p1, g1p2: game1_p2, g2p1: game2_p1, g2p2: game2_p2, g3p1: game3_p1, g3p2: game3_p2 }

                    default:
                        r = AddGameIterative(game1_p1, game1_p2, game2_p1, game2_p2, game3_p1, game3_p2)
                        return { p1: 0, p2: 0, g1p1: r.g1p1, g1p2: r.g1p2, g2p1: r.g2p1, g2p2: r.g2p2, g3p1: r.g3p1, g3p2: r.g3p2 }
                }

            case 'AD':
                r = AddGameIterative(game1_p1, game1_p2, game2_p1, game2_p2, game3_p1, game3_p2)
                return { p1: 0, p2: 0, g1p1: r.g1p1, g1p2: r.g1p2, g2p1: r.g2p1, g2p2: r.g2p2, g3p1: r.g3p1, g3p2: r.g3p2 }

            default:
                return { p1: point_p1, p2: point_p2, g1p1: game1_p1, g1p2: game1_p2, g2p1: game2_p1, g2p2: game2_p2, g3p1: game3_p1, g3p2: game3_p2 }
        }

    }
}

function AddGameIterative(game1_p1, game1_p2, game2_p1, game2_p2, game3_p1, game3_p2) {

    var r = AddGame(game1_p1, game1_p2)
    if (r.add === 1) {
        return { g1p1: r.p1, g1p2: r.p2, g2p1: game2_p1, g2p2: game2_p2, g3p1: game3_p1, g3p2: game3_p2 }
    }
    else {
        r = AddGame(game2_p1, game2_p2)
        if (r.add === 1) {
            return { g1p1: game1_p1, g1p2: game1_p2, g2p1: r.p1, g2p2: r.p2, g3p1: game3_p1, g3p2: game3_p2 }
        }
        else {
            r = AddGame(game3_p1, game3_p2)
            if (r.add === 1) {
                return { g1p1: game1_p1, g1p2: game1_p2, g2p1: game2_p1, g2p2: game2_p2, g3p1: r.p1, g3p2: r.p2 }
            }
            else {
                return { g1p1: game1_p1, g1p2: game1_p2, g2p1: game2_p1, g2p2: game2_p2, g3p1: game3_p1, g3p2: game3_p2 }
            }
        }
    }
}

function MinusPoint(point_p1, point_p2) {

    switch (point_p1) {
        case 15:
            return { p1: 0, p2: point_p2 }

        case 30:
            return { p1: 15, p2: point_p2 }

        case 40:
            switch (point_p2) {
                case 'AD':
                    return { p1: point_p1, p2: point_p2 }

                default:
                    return { p1: 30, p2: point_p2 }
            }

        case 'AD':
            return { p1: 40, p2: point_p2 }

        default:
            return { p1: point_p1, p2: point_p2 }
    }
}

function AddGame(game_p1, game_p2) {

    if (game_p1 <= 5 && game_p2 <= 5) {
        return { p1: game_p1 + 1, p2: game_p2, add: 1 }
    }
    else if (game_p1 === 5 && game_p2 === 6) {
        return { p1: 6, p2: 6, add: 1 }
    }
    else if (game_p1 === 6 && game_p2 === 6) {
        return { p1: 7, p2: 6, add: 1 }
    }
    else if (game_p1 === 6 && game_p2 === 5) {
        return { p1: 7, p2: 5, add: 1 }
    }
    return { p1: game_p1, p2: game_p2, add: 0 }

}

function MinusGame(game_p1, game_p2) {

    if (game_p1 >= 1 && game_p2 <= 6) {
        return game_p1 - 1
    }
    return game_p1
}

var do_refetch = null;

function EventTracking(props) {

    const { loading, error, data, refetch } = useQuery(GET_MATCHES_QUERY, { variables: { event_id: props.eventID } });
    // if (error) console.log(error);

    do_refetch = refetch;

    useEffect(() => {
        refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.currentTab])

    if (error) {
        console.log(error.message);
    }
    if (loading) {
        return (<Typography>
            <FormattedMessage id='lodaing' />
        </Typography>)
    }
    if (data) {
        const total_score = data.getMatch
        return total_score.map(score => {
            return <TrackingTable score={score} />
        })
    }
}

const TrackingTable = ({ score }) => {

    const locale = useSelector(state => state.locale.locale);
    const classes_table = useStyles_table();
    const classes_typo = useStyles_typo();
    const [updateMatch] = useMutation(UPDATE_MATCH);
    const [deleteMatch] = useMutation(DELETE_MATCH);

    const [serve_p1, setservep1] = useState(score.serve_p1)
    const [serve_p2, setservep2] = useState(score.serve_p2)
    const [point_p1, setpointp1] = useState(score.point_p1)
    const [point_p2, setpointp2] = useState(score.point_p2)
    const [game1_p1, setgame1p1] = useState(score.set1_p1)
    const [game1_p2, setgame1p2] = useState(score.set1_p2)
    const [game2_p1, setgame2p1] = useState(score.set2_p1)
    const [game2_p2, setgame2p2] = useState(score.set2_p2)
    const [game3_p1, setgame3p1] = useState(score.set3_p1)
    const [game3_p2, setgame3p2] = useState(score.set3_p2)
    const [gamelive, setlive] = useState(score.live)

    const [open, setOpen] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const update = async () => {
        // event.preventDefault();
        var sp1 = " ", sp2 = " ";
        if (serve_p1 !== " ")
            sp1 = locale === "en" ? "Serve" : "發球";
        else if (serve_p2 !== " ")
            sp2 = locale === "en" ? "Serve" : "發球";
        try {
            await updateMatch({
                variables: {
                    _id: score._id,
                    event_id: score.event_id,
                    match_name: score.match_name,
                    player_p1: score.player_p1,
                    player_p2: score.player_p2,
                    serve_p1: sp1,
                    serve_p2: sp2,
                    point_p1: point_p1,
                    point_p2: point_p2,
                    set1_p1: game1_p1,
                    set1_p2: game1_p2,
                    set2_p1: game2_p1,
                    set2_p2: game2_p2,
                    set3_p1: game3_p1,
                    set3_p2: game3_p2,
                    live: gamelive
                }
            });
        } catch (e) {
            // console.log(e.networkError.result.errors); // here you can see your network
            console.log(e.message);
        }

    }

    const handleDeleteMatch = async () => {
        var isSuccess = true;

        try {
            await deleteMatch({
                variables: {
                    _id: score._id
                }
            });
        } catch (e) {
            isSuccess = false;
            console.log(e.networkError);
        }

        if (isSuccess) {
            setDeleteSuccess(true);
            setTimeout(1000);
            do_refetch();
            handleClose();
        } else {
            alert("刪除失敗！請再試一次");
        }
    }

    const handleSnackClose = () => {
        setDeleteSuccess(false);
    }

    useEffect(() => {
        update()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [score, serve_p1, serve_p2, point_p1, point_p2, game1_p1, game1_p2, game2_p1, game2_p2, game3_p1, game3_p2, gamelive]);

    //if (true){
    if (gamelive === true) {

        return (

            // TrackingTable(score)
            [
                //<Typography variant="h4" className={classes_typo.title}> <FormattedMessage id="eventTracking.title" /> </Typography>,

                <Typography variant="h4" className={classes_typo.title}> {score.match_name} </Typography>,

                <Button variant="contained" onClick={handleDeleteMatch}>
                    <FormattedMessage id="eventTracking.deleteMatchBut" />
                </Button>,

                <Button variant="contained" onClick={() => (setlive(false))}>
                    <FormattedMessage id="eventTracking.endMatch" />
                </Button>,

                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title"><FormattedMessage id="eventTracking.deleteMatch" /></DialogTitle>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            <FormattedMessage id="deleteCancel" />
                        </Button>
                        <Button onClick={handleDeleteMatch} color="primary">
                            <FormattedMessage id="deleteSubmit" />
                        </Button>
                    </DialogActions>
                </Dialog>,
                <Snackbar open={deleteSuccess} autoHideDuration={6000} onClose={handleSnackClose}>
                    <Alert onClose={handleSnackClose} severity="success">
                        This is a success message!
                    </Alert>
                </Snackbar>,

                <TableContainer component={Paper}>
                    <Table className={classes_table.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell> <FormattedMessage id="eventTracking.playername" /> </TableCell>
                                <TableCell align="center"> <FormattedMessage id="eventTracking.righttoserve" /> </TableCell>
                                <TableCell align="center">  </TableCell>
                                <TableCell align="center"> <FormattedMessage id="eventTracking.point" /> </TableCell>
                                <TableCell align="center">  </TableCell>
                                <TableCell align="center"> <FormattedMessage id="eventTracking.game1" /> </TableCell>
                                <TableCell align="center">  </TableCell>
                                <TableCell align="center"> <FormattedMessage id="eventTracking.game2" /> </TableCell>
                                <TableCell align="center">  </TableCell>
                                <TableCell align="center"> <FormattedMessage id="eventTracking.game3" /> </TableCell>
                                <TableCell align="center">  </TableCell>
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
                                    {<Button onClick={() =>
                                    (setservep1(SwitchServe(serve_p1).p1)
                                        // eslint-disable-next-line no-sequences
                                        , setservep2(SwitchServe(serve_p1).p2)
                                        , setlive(true)
                                    )}> <FormattedMessage id="eventTracking.switchserve" /> </Button>}
                                </TableCell>
                                <TableCell align="center">
                                    {point_p1}
                                </TableCell>
                                <TableCell align="center">
                                    <div>
                                        {<Button size="small" onClick={() =>
                                        (setpointp1(AddPoint(point_p1, point_p2, game1_p1, game1_p2, game2_p1, game2_p2, game3_p1, game3_p2).p1)
                                            // eslint-disable-next-line no-sequences
                                            , setpointp2(AddPoint(point_p1, point_p2, game1_p1, game1_p2, game2_p1, game2_p2, game3_p1, game3_p2).p2)
                                            , setgame1p1(AddPoint(point_p1, point_p2, game1_p1, game1_p2, game2_p1, game2_p2, game3_p1, game3_p2).g1p1)
                                            , setgame1p2(AddPoint(point_p1, point_p2, game1_p1, game1_p2, game2_p1, game2_p2, game3_p1, game3_p2).g1p2)
                                            , setgame2p1(AddPoint(point_p1, point_p2, game1_p1, game1_p2, game2_p1, game2_p2, game3_p1, game3_p2).g2p1)
                                            , setgame2p2(AddPoint(point_p1, point_p2, game1_p1, game1_p2, game2_p1, game2_p2, game3_p1, game3_p2).g2p2)
                                            , setgame3p1(AddPoint(point_p1, point_p2, game1_p1, game1_p2, game2_p1, game2_p2, game3_p1, game3_p2).g3p1)
                                            , setgame3p2(AddPoint(point_p1, point_p2, game1_p1, game1_p2, game2_p1, game2_p2, game3_p1, game3_p2).g3p2)
                                        )}> + </Button>}
                                    </div>
                                    <div>
                                        {<Button size="small" onClick={() =>
                                        (setpointp1(MinusPoint(point_p1, point_p2).p1)
                                            // eslint-disable-next-line no-sequences
                                            , setpointp2(MinusPoint(point_p1, point_p2).p2)
                                        )}> - </Button>}
                                    </div>
                                </TableCell>
                                <TableCell align="center">
                                    {game1_p1}
                                </TableCell>
                                <TableCell align="center">
                                    <div>
                                        {<Button size="small" onClick={() =>
                                        (setgame1p1(AddGame(game1_p1, game1_p2).p1)
                                            // eslint-disable-next-line no-sequences
                                            , setgame1p2(AddGame(game1_p1, game1_p2).p2)
                                            , setpointp1(0)
                                            , setpointp2(0)
                                        )}> + </Button>}
                                    </div>
                                    <div>
                                        {<Button size="small" onClick={() =>
                                        (setgame1p1(MinusGame(game1_p1, game1_p2))
                                            // eslint-disable-next-line no-sequences
                                            , setpointp1(0)
                                            , setpointp2(0)
                                        )}> - </Button>}
                                    </div>
                                </TableCell>
                                <TableCell align="center">
                                    {game2_p1}
                                </TableCell>
                                <TableCell align="center">
                                    <div>
                                        {<Button size="small" onClick={() =>
                                        (setgame2p1(AddGame(game2_p1, game2_p2).p1)
                                            // eslint-disable-next-line no-sequences
                                            , setgame2p2(AddGame(game2_p1, game2_p2).p2)
                                            , setpointp1(0)
                                            , setpointp2(0)
                                        )}> + </Button>}
                                    </div>
                                    <div>
                                        {<Button size="small" onClick={() =>
                                        (setgame2p1(MinusGame(game2_p1, game2_p2))
                                            // eslint-disable-next-line no-sequences
                                            , setpointp1(0)
                                            , setpointp2(0)
                                        )}> - </Button>}
                                    </div>
                                </TableCell>
                                <TableCell align="center">
                                    {game3_p1}
                                </TableCell>
                                <TableCell align="center">
                                    <div>
                                        {<Button size="small" onClick={() =>
                                        (setgame3p1(AddGame(game3_p1, game3_p2).p1)
                                            // eslint-disable-next-line no-sequences
                                            , setgame3p2(AddGame(game3_p1, game3_p2).p2)
                                            , setpointp1(0)
                                            , setpointp2(0)
                                        )}> + </Button>}
                                    </div>
                                    <div>
                                        {<Button size="small" onClick={() =>
                                        (setgame3p1(MinusGame(game3_p1, game3_p2))
                                            // eslint-disable-next-line no-sequences
                                            , setpointp1(0)
                                            , setpointp2(0)
                                        )}> - </Button>}
                                    </div>
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
                                    {<Button onClick={() =>
                                    (setservep2(SwitchServe(serve_p2).p1)
                                        // eslint-disable-next-line no-sequences
                                        , setservep1(SwitchServe(serve_p2).p2)
                                        , setlive(false)
                                    )}> <FormattedMessage id="eventTracking.switchserve" /> </Button>}
                                </TableCell>
                                <TableCell align="center">
                                    {point_p2}
                                </TableCell>
                                <TableCell align="center">
                                    <div>
                                        {<Button size="small" onClick={() =>
                                        (setpointp2(AddPoint(point_p2, point_p1, game1_p2, game1_p1, game2_p2, game2_p1, game3_p2, game3_p1).p1)
                                            // eslint-disable-next-line no-sequences
                                            , setpointp1(AddPoint(point_p2, point_p1, game1_p2, game1_p1, game2_p2, game2_p1, game3_p2, game3_p1).p2)
                                            , setgame1p2(AddPoint(point_p2, point_p1, game1_p2, game1_p1, game2_p2, game2_p1, game3_p2, game3_p1).g1p1)
                                            , setgame1p1(AddPoint(point_p2, point_p1, game1_p2, game1_p1, game2_p2, game2_p1, game3_p2, game3_p1).g1p2)
                                            , setgame2p2(AddPoint(point_p2, point_p1, game1_p2, game1_p1, game2_p2, game2_p1, game3_p2, game3_p1).g2p1)
                                            , setgame2p1(AddPoint(point_p2, point_p1, game1_p2, game1_p1, game2_p2, game2_p1, game3_p2, game3_p1).g2p2)
                                            , setgame3p2(AddPoint(point_p2, point_p1, game1_p2, game1_p1, game2_p2, game2_p1, game3_p2, game3_p1).g3p1)
                                            , setgame3p1(AddPoint(point_p2, point_p1, game1_p2, game1_p1, game2_p2, game2_p1, game3_p2, game3_p1).g3p2)
                                        )}> + </Button>}
                                    </div>
                                    <div>
                                        {<Button size="small" onClick={() =>
                                        (setpointp2(MinusPoint(point_p2, point_p1).p1)
                                            // eslint-disable-next-line no-sequences
                                            , setpointp1(MinusPoint(point_p2, point_p1).p2)
                                        )}> - </Button>}
                                    </div>
                                </TableCell>
                                <TableCell align="center">
                                    {game1_p2}
                                </TableCell>
                                <TableCell align="center">
                                    <div>
                                        {<Button size="small" onClick={() =>
                                        (setgame1p2(AddGame(game1_p2, game1_p1).p1)
                                            // eslint-disable-next-line no-sequences
                                            , setgame1p1(AddGame(game1_p2, game1_p1).p2)
                                            , setpointp1(0)
                                            , setpointp2(0)
                                        )}> + </Button>}
                                    </div>
                                    <div>
                                        {<Button size="small" onClick={() =>
                                        (setgame1p2(MinusGame(game1_p2, game1_p1))
                                            // eslint-disable-next-line no-sequences
                                            , setpointp1(0)
                                            , setpointp2(0)
                                        )}> - </Button>}
                                    </div>
                                </TableCell>
                                <TableCell align="center">
                                    {game2_p2}
                                </TableCell>
                                <TableCell align="center">
                                    <div>
                                        {<Button size="small" onClick={() =>
                                        (setgame2p2(AddGame(game2_p2, game2_p1).p1)
                                            // eslint-disable-next-line no-sequences
                                            , setgame2p1(AddGame(game2_p2, game2_p1).p2)
                                            , setpointp1(0)
                                            , setpointp2(0)
                                        )}> + </Button>}
                                    </div>
                                    <div>
                                        {<Button size="small" onClick={() =>
                                        (setgame2p2(MinusGame(game2_p2, game2_p1))
                                            // eslint-disable-next-line no-sequences
                                            , setpointp1(0)
                                            , setpointp2(0)
                                        )}> - </Button>}
                                    </div>
                                </TableCell>
                                <TableCell align="center">
                                    {game3_p2}
                                </TableCell>
                                <TableCell align="center">
                                    <div>
                                        {<Button size="small" onClick={() =>
                                        (setgame3p2(AddGame(game3_p2, game3_p1).p1)
                                            // eslint-disable-next-line no-sequences
                                            , setgame3p1(AddGame(game3_p2, game3_p1).p2)
                                            , setpointp1(0)
                                            , setpointp2(0)
                                        )}> + </Button>}
                                    </div>
                                    <div>
                                        {<Button size="small" onClick={() =>
                                        (setgame3p2(MinusGame(game3_p2, game3_p1))
                                            // eslint-disable-next-line no-sequences
                                            , setpointp1(0)
                                            , setpointp2(0)
                                        )}> - </Button>}
                                    </div>
                                </TableCell>

                            </TableRow>

                        </TableBody>
                    </Table>
                </TableContainer>

            ]

        );

    }
    else {

        return ([

            //<Typography variant="h4" className={classes_typo.title}> <FormattedMessage id="eventTracking.title" /> </Typography>,

            <Button variant="contained" onClick={() => setlive(true)}>
                <FormattedMessage id="eventTrackingResult.reMatch" /> {score.match_name}
            </Button>,

        ]);

    }

}

export default EventTracking;
