import { gql, useMutation, useQuery } from '@apollo/client';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useMediaQuery } from 'react-responsive';
import { Link } from "react-router-dom";
import FormBlock from "../components/FormBlock";
import Navbar from "../components/Navbar";
import SignUpSuccess from '../components/SignUpSuccess';
const { CREATE_FORM_MUTATION } = require('../graphql');


const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    form: {
        marginTop: "20px",
        width: "inherit"
    },
    fromItemTitle: {
        marginTop: "10px",
        marginBottom: "10px",
    },
    formItemSubtitle: {
        fontSize: "75%",
    },
    textFieldLabel: {
        display: "inline",
        marginLeft: "5px",
        marginRight: "5px",
    },
    submitBut: {
        marginTop: "30px",
        float: "right",
    },
    appBarSpacer: theme.mixins.toolbar,
    backBut: {
        float: "right",
    },
    paper: {
        padding: "2em",
        marginBottom: "1em"
    },
}));

function EventRegistration(props) {
    const classes = useStyles();
    const isMobile = useMediaQuery({ query: `(max-width: ${400}px)` })
    const { loading, error, data } = useQuery(GET_EVENT_FORM_HOST_QUERY, { variables: { eventId: props.match.params.eventID } });
    if (error) console.log(error);

    const [success, setSuccess] = useState(false);
    const [blocksContent, setBlocksContent] = useState([]);
    const [finishInitial, setFinishInitial] = useState(false);

    // use context to store form content
    const FormBlockStore = React.createContext(null);

    // const { loading, error, data } = useQuery(GET_EVENT_FORM_HOST_QUERY, { variables: { eventId: props.match.params.eventID } });
    // if (error) console.log(error);
    const title = isMobile ? "h5" : "h4"
    const [newApplication] = useMutation(CREATE_FORM_MUTATION);

    useEffect(() => {
        if (data) {
            for (var i = 0; i < data.getEvent.form.blocks.length; i++) {
                let newContent = blocksContent;
                newContent[i] = { answer: "" };
                setBlocksContent(newContent);
            }
            setFinishInitial(true);
        }
    }, [data,blocksContent]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        var isSuccess = true;
        try {
            await newApplication({
                variables: {
                    event_id: props.match.params.eventID,
                    blocks: blocksContent,
                    paid: false
                }
            })
        } catch (e) {
            // console.log(e.networkError.result.errors); // here you can see your network
            console.log(e);
            isSuccess = false;
        }

        if (isSuccess) {
            setSuccess(true);
            alert("報名成功！");
        } else {
            alert("報名失敗！請再試一次");
        }

    }

    return (
        <>
            <Navbar />
            <Container maxWidth="md" className={classes.container}>
                <div className={classes.appBarSpacer} />
                {!success ?
                    <>
                        <Paper className={classes.paper}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Grid>
                                    <Typography variant={title}>{loading ? "" : data.getEvent.title} <FormattedMessage id='registration-form' /></Typography>
                                    <Typography>{loading ? "" : data.getEvent.form.description}</Typography>
                                </Grid>
                                <Button className={classes.backBut} variant="contained" color="default"
                                    component={Link} to={"/event/" + props.match.params.eventID}
                                    style={{ maxWidth: '117px', maxHeight: '40px', minWidth: '90px', minHeight: '35px' }}
                                >
                                    <FormattedMessage id='back-event-page' />
                                </Button>
                            </div>
                        </Paper>
                        <FormControl className={classes.form}>
                            <FormBlockStore.Provider value={[blocksContent, setBlocksContent]}>
                                {!loading && finishInitial ?
                                    data.getEvent.form.blocks.map((e, index) => (
                                        <div key={e.blockId}>
                                            <FormBlock block={e} blockIndex={index} formBlockStore={FormBlockStore} />
                                        </div>
                                    )) :
                                    <FormattedMessage id="loading" />
                                }
                            </FormBlockStore.Provider>
                            <Grid>
                                <Button className={classes.submitBut} variant="contained" color="default"
                                    type="submit"
                                    onClick={handleSubmit}
                                >
                                    <FormattedMessage id='submit-form' />
                                </Button>
                            </Grid>
                        </FormControl>
                    </> : <SignUpSuccess
                        bankInfo={data.getEventHost}
                        eventId={props.match.params.eventID} />
                }
            </Container >
        </>
    );
}

const GET_EVENT_FORM_HOST_QUERY = gql`
  query ($eventId: String!) {
    getEvent(eventId: $eventId) {
      title
      form {
        description
        blocks {
          blockType
          question
          description
          options
          _id
        }
      }
    }
    getEventHost(event_id: $eventId) {
        bank_code
        bank_account
    }
  }
`;

export default EventRegistration;
