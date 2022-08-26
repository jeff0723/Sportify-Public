import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';



const useStyles = makeStyles((theme) => ({
    title: {
        marginTop: "30px",
        marginBottom: "30px",
    },
    submitBut: {
        marginTop: theme.spacing(4)
    }
}));

function EventTrackingDelete(props) {

    // const classes = useStyles();
    // const [currentTab, setCurrentTab] = useState(1);
    // const isTabletOrMobile = useMediaQuery({ query: '(max-width: 375px)' });
    // const handleTabChange = (event, newValue) => {
    //     setCurrentTab(newValue);
    // }

    const classes = useStyles();
    const [num_set, setNumSet] = useState(" ");

    return (
        [
            <Typography variant="h4" className={classes.title}> <FormattedMessage id="eventTrackingDelete.deletematch" /> </Typography>,

            <Container className={classes.container}>
                <form>

                    <Typography > <FormattedMessage id="eventTrackingDelete.selectmatch" /> </Typography>
                    <Select
                        value={num_set}
                        onChange={e => setNumSet(e.target.value)}
                        style={{
                            minWidth: "80px"
                        }}
                    >
                        <MenuItem value="1"> 第八輪第一場 </MenuItem>
                        <MenuItem value="2"> 第八輪第二場 </MenuItem>
                        <MenuItem value="3"> 第八輪第三場 </MenuItem>
                        <MenuItem value="4"> 第八輪第四場 </MenuItem>
                    </Select>
                    <br />
                    <Button className={classes.submitBut} variant="contained" color="default"
                        //type="submit"
                        //onClick={handleSubmit}
                        style={{ minWidth: "80px" }}
                    >
                        <FormattedMessage id="eventTrackingDelete.deleteButton" />
                    </Button>

                </form>
            </Container>
        ]
    );

}

export default EventTrackingDelete;