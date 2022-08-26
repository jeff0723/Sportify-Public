import { useMutation } from '@apollo/client';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from "react-redux";
import { useMediaQuery } from 'react-responsive';
import Navbar from "../components/Navbar";
const { CREATE_CONTACT_MUTATION } = require('../graphql');

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4)
    },
    appBarSpacer: theme.mixins.toolbar,
    paper: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
    },
    root: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(2)
    },
    message: {
        height: 400,
    },
}));
function ContactUs() {
    const locale = useSelector(state => state.locale.locale)
    const isMobile = useMediaQuery({ query: '(max-width: 500px)' });
    const classes = useStyles();
    const [state, setState] = useState({ name: " ", email: " ", message: " " });
    const [newContact] = useMutation(CREATE_CONTACT_MUTATION);
    const [, setSuccess] = useState(false);

    const handleNameChange = (event) => {
        setState({ name: event.target.value, email: state.email, message: state.message });
    }
    const handleEmailChange = (event) => {
        setState({ name: state.name, email: event.target.value, message: state.message });
    }
    const handleMessageChange = (event) => {
        setState({ name: state.name, email: state.email, message: event.target.value });
    }
    const submitEmail = async (e) => {
        e.preventDefault();
        var isSuccess = true;
        try {
            await newContact({
                variables: {
                    name: state.name,
                    email: state.email,
                    message: state.message
                }
            })
        } catch (e) {
           
            console.log(e);
            isSuccess = false;
        }


        if (isSuccess) {
            setSuccess(true);
            alert("我們收到您的回覆，感謝您的時間！");
            resetForm();
        } else {
            alert("送出失敗！");
        }
       
    }
    const resetForm = () => {
        setState({ name: "", email: "", message: "" })
    }
    const name = locale === 'en' ? 'Name' : '名字'
    const email = locale === 'en' ? 'Email' : '電子郵件'
    const message = locale === 'en' ? 'Message' : '您的訊息'

    return (
        <>
            <Navbar />

            <Container maxWidth="sm" className={classes.container}>
                <div className={classes.appBarSpacer} />
                <Paper className={classes.paper} elevation={5}>
                    <Typography variant='h4'><FormattedMessage id="contact-us" /></Typography>
                    <Typography className={classes.root} variant='h5'><FormattedMessage id="contact-us-message1" /></Typography>
                    {/* <form id="contact-form" onSubmit={submitEmail} method="POST"> */}
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <TextField fullWidth label={name} value={state.name} variant='outlined' onInput={handleNameChange} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField fullWidth label={email} value={state.email} variant='outlined' onInput={handleEmailChange} />
                        </Grid>
                    </Grid>
                    <Typography className={classes.root} variant='h5'><FormattedMessage id="contact-us-message2" /></Typography>
                    <Grid container>
                        <Grid item xs={12}>
                            {isMobile ?
                                <TextField fullWidth multiline rows={19} value={state.message} className={classes.message} label={message} variant='outlined' onInput={handleMessageChange} /> :
                                <TextField fullWidth multiline rows={20} value={state.message} className={classes.message} label={message} variant='outlined' onInput={handleMessageChange} />}
                        </Grid>
                    </Grid>
                    <Button className={classes.root} variant="contained" color="default" onClick={submitEmail}><FormattedMessage id="submit" /></Button>
                    {/* </form> */}
                </Paper>
            </Container>

        </>
    )

}
export default ContactUs;