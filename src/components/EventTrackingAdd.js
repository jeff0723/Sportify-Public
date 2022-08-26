import { useMutation } from '@apollo/client';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
const { ADD_MATCH } = require('../graphql');

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),

    },
    title: {
        paddingTop: theme.spacing(4),
        marginLeft: theme.spacing(2),
        marginBottom: theme.spacing(4),

    },
    text: {
        marginLeft: theme.spacing(4),
    },
    inputfield: {
        marginLeft: theme.spacing(4),
        marginBottom: "10px",
        paddingBottom: theme.spacing(4)
    },
    submitBut: {
        // float:'right',
        // marginRight:theme.spacing(4)
        marginLeft: theme.spacing(4),
        marginBottom: theme.spacing(4)
    }
}));

function EventTrackingAdd(props) {
    // const classes = useStyles();
    // const [currentTab, setCurrentTab] = useState(1);
    // const isTabletOrMobile = useMediaQuery({ query: '(max-width: 375px)' });
    // const handleTabChange = (event, newValue) => {
    //     setCurrentTab(newValue);
    // }

    const classes = useStyles();
    const [MatchName, setMatchName] = useState("");
    const [player_a, setPlayerA] = useState("");
    const [player_b, setPlayerB] = useState("");

    const [newMatch] = useMutation(ADD_MATCH);

    const handleSubmit = async (event) => {
        event.preventDefault();
        var isSuccess = true;
        try {
            await newMatch({
                variables: {
                    event_id: props.eventID,
                    match_name: MatchName,
                    player_p1: player_a,
                    player_p2: player_b,
                }
            })
        } catch (e) {
            console.log(e); // here you can see your network
            isSuccess = false;
        }

        if (isSuccess) {
            alert("新增比賽成功！");
            // refetch();
        } else {
            alert("新增比賽失敗！請再試一次");
        }
    }
    return (
        <>
            <Container maxWidth='sm' className={classes.container}>
                <Paper elevation={3}>
                    <form>
                        <Typography variant="h4" className={classes.title}> <FormattedMessage id="eventTrackingAdd.addmatch" /> </Typography>

                        <Typography className={classes.text}> <FormattedMessage id="eventTrackingAdd.match-name" /> </Typography>
                        <TextField className={classes.inputfield} label="Match Name"
                            value={MatchName}
                            onInput={e => setMatchName(e.target.value)}
                            style={{ minWidth: "300px" }} />

                        <Typography Typography className={classes.text}> <FormattedMessage id="eventTrackingAdd.playera" /> </Typography>
                        <TextField className={classes.inputfield} label="Player A"
                            value={player_a}
                            onInput={e => setPlayerA(e.target.value)}
                            style={{ minWidth: "300px" }} />

                        <Typography Typography className={classes.text}> <FormattedMessage id="eventTrackingAdd.playerb" /> </Typography>
                        <TextField className={classes.inputfield} label="Player B"
                            value={player_b}
                            onInput={e => setPlayerB(e.target.value)}
                            style={{ minWidth: "300px" }} />

                        {/* <Typography > <FormattedMessage id="eventTrackingAdd.numofset" /> </Typography> */}
                        {/* <Select
                    value={num_set}
                    onChange={e => setNumSet(e.target.value)}
                >
                    <MenuItem value="1"> 1 </MenuItem>
                    <MenuItem value="3"> 3 </MenuItem>
                    <MenuItem value="5"> 5 </MenuItem>
                </Select> */}
                        <br />
                        <Button className={classes.submitBut} variant="contained" color="default"
                            type="submit"
                            onClick={handleSubmit}
                            style={{ minWidth: "80px" }}
                        >
                            <FormattedMessage id="eventTrackingAdd.addButton" />
                        </Button>

                    </form>
                </Paper>
            </Container>
        </>
    );
}

export default EventTrackingAdd;