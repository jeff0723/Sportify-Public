import { useQuery } from '@apollo/client';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from 'react-intl';
// import { Host_EventOverview_QUERY } from '../graphql';
const { Host_EventOverview_QUERY } = require('../graphql');


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        width: '90%',
        // flexWrap:'wrap',

    }
}));

function EventOverview(props) {
    const classes = useStyles();
    const { loading, error, data } = useQuery(Host_EventOverview_QUERY, { variables: { eventId: props.eventID } });
    // if (error) console.log(error);
    if (error) console.log(error.networkError.result.errors);

    return (
        <List className={classes.root}>
            {loading ?
                <Typography variant="h4"><FormattedMessage id="loading" /></Typography>
                :
                <>
                    <Typography variant="h4" className={classes.title}><FormattedMessage id="eventOverview.name" />：{data.getEvent.title}</Typography>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                {/* <ImageIcon /> */}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={<FormattedMessage id="eventOverview.public" />}
                            secondary={data.getEvent.public ? "已公開" : "未公開"} />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                {/* <WorkIcon /> */}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={<FormattedMessage id="eventOverview.release" />}
                            secondary="功能未開放" />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                {/* <BeachAccessIcon /> */}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={<FormattedMessage id="eventOverview.views" />} secondary="功能未開放" />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                {/* <BeachAccessIcon /> */}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={<FormattedMessage id="eventOverview.count" />} secondary="功能未開放" />
                    </ListItem></>}
        </List>

    );
}

export default EventOverview;