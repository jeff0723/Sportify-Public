import { useMutation } from '@apollo/client';
import { Box, Button, Container, Divider, FormControl, Paper, Snackbar, TextField, Typography } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useMediaQuery } from 'react-responsive';

const { CHECK_IN } = require('../graphql');

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function CheckIn(props) {
    const isMobile = useMediaQuery({ query: `(max-width: 390px)` })
    const isIphone5 = useMediaQuery({ query: `(max-width: 320px)` })
    let inputSize = !isMobile ? "290px" : (!isIphone5 ? "240px" : "190px");
    const [state, setState] = useState({ name: "", email: "" });
    const [isCheckIn, setIsCheckIn] = useState(false);
    const [newCheckIn] = useMutation(CHECK_IN);

    const onSubmit = async (e) => {
        e.preventDefault();
        // need to add check player in event
        var isSuccess = true;
        try {
            await newCheckIn({
                variables: {
                    event_id: props.eventID,
                    name: state.name,
                    email: state.email,
                }
            })
        } catch (e) {

            isSuccess = false;
            console.log(e);

        }
        setState({ name: "", email: "" });
        setIsCheckIn(isSuccess);
    }
    const handleSnackClose = () => {
        setIsCheckIn(false);
    }
    return (
        <Container style={{ marginTop: 20 }} maxWidth="xs">
            <Paper elevation={3}>
                <Box style={{ marginLeft: '45px', paddingTop: 30, marginBottom: 10 }}>
                    <Typography variant='h4'><FormattedMessage id='checkin' /></Typography>
                    <Typography variant='body2' style={{ color: "#9e9e9e" }}><FormattedMessage id='checkin.helper' /></Typography>

                </Box>
                <Divider />
                <FormControl>
                    <Box display="flex" flexDirection="column" style={{ marginLeft: '45px', marginRight: '45px', paddingTop: 30, paddingBottom: 30, gap: 20 }}>

                        <Box>
                            <Typography><FormattedMessage id="name" /></Typography>
                            <TextField style={{ width: inputSize }} variant='outlined' name='name' value={state.name} onChange={(e) => setState({ ...state, [e.target.name]: e.target.value })}></TextField>
                        </Box>
                        <Box>
                            <Typography><FormattedMessage id="email" /></Typography>
                            <TextField style={{ width: inputSize }} variant='outlined' name='email' value={state.email} onChange={(e) => setState({ ...state, [e.target.name]: e.target.value })}></TextField>
                        </Box>
                        <Box>
                            <Button type="submit" variant="contained" style={{ backgroundColor: "#2196f3", color: "#FFFFFF" }} onClick={onSubmit}><FormattedMessage id="checkin" /></Button>
                        </Box>
                    </Box>
                </FormControl>
                <Snackbar open={isCheckIn} autoHideDuration={6000} onClose={handleSnackClose}>
                <Alert onClose={handleSnackClose} severity="success">
                    <FormattedMessage id="checkin.result1" />{new Date().toLocaleString()}<FormattedMessage id="checkin.result2" />
                </Alert>
            </Snackbar>
            </Paper>
            
        </Container>
    )
}

export default CheckIn;