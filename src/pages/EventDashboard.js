import { gql, useMutation, useQuery } from '@apollo/client';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import InfoIcon from '@material-ui/icons/Info';
import MenuIcon from '@material-ui/icons/Menu';
import SportsTennisIcon from '@material-ui/icons/SportsTennis';
import MuiAlert from '@material-ui/lab/Alert';
import clsx from 'clsx';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { Link } from "react-router-dom";
import CheckInStatus from '../components/CheckInStatus';
import EventInfo from '../components/EventInfo';
import EventResult from "../components/EventResult";
import EventTracking from "../components/EventTracking";
import EventTrackingAdd from "../components/EventTrackingAdd";
import FormEdit from '../components/FormEdit';
import Navbar from "../components/Navbar";
import RegistrationStatus from '../components/RegistrationStatus';
import { LOCALE_OPTIONS } from '../i18n/locale-settings';
import { logOut, setLocale } from '../redux/actions';
const { RELEASE_EVENT } = require('../graphql');

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const drawerWidth = 120;
const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  container_mobile: {
    marginLeft: theme.spacing(13),
    marginRight: theme.spacing(10),
  },
  root: {
    display: 'flex',
    padding: theme.spacing(1),
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  releaseBut: {
    marginLeft: '5px',
    marginRight: '5px'
  }
}));

function EventDashboard(props) {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1162px)' });
  const classes = useStyles();
  const theme = useTheme();
  const [currentTab, setCurrentTab] = useState(1);
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  // const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const userData = useSelector(state => state.auth.userData);
  const dispatch = useDispatch();
  const handleTabClick = (index) => {
    setCurrentTab(index);
  }
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  }

  const renderView = () => {
    switch (currentTab) {
      case 1:
        return <EventInfo eventID={props.match.params.eventID} />;
      case 2:
        return <RegistrationStatus eventID={props.match.params.eventID} />;
      case 3:
        return <CheckInStatus eventID={props.match.params.eventID} />;
      case 4:
        return <FormEdit eventID={props.match.params.eventID} />;
      case 5:
        return <EventTrackingAdd eventID={props.match.params.eventID} />;
      case 6:
        return <EventTracking eventID={props.match.params.eventID} currentTab={currentTab} />;
      case 7:
        return <EventResult eventID={props.match.params.eventID} currentTab={currentTab} />;
      default:
        return <div>Something's wrong...</div>
    }
  }

  const { loading, error, data, refetch } = useQuery(GET_EVENT_SPORT_TYPE_RELEASE_QUERY, { variables: { eventId: props.match.params.eventID } });
  if (error) console.log(error.networkError.result.errors);

  const [releaseEvent] = useMutation(RELEASE_EVENT);

  var isSuccess = true;
  const handleRelease = async () => {
    try {
      await releaseEvent({
        variables: {
          _id: props.match.params.eventID,
          release: true
        }
      })
    } catch (e) {
      console.log(e.networkError.result.errors); // here you can see your network
      isSuccess = false;
    }

    if (isSuccess) {
      refetch();
      setDialogOpen(false);
    }
    setSnackbarOpen(true);
  }

  return (
    <div className={classes.root}>
      <Dialog open={dialogOpen} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title"><FormattedMessage id="eventDashBoard.releaseEventTitle" /></DialogTitle>
        <DialogContent>
          <DialogContentText>
            <FormattedMessage id="eventDashBoard.releaseEventContent" />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            <FormattedMessage id="eventDashBoard.releaseEventCancel" />
          </Button>
          <Button onClick={handleRelease} color="primary">
            <FormattedMessage id="eventDashBoard.releaseEventConfirm" />
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        {isSuccess ? <Alert onClose={handleSnackbarClose} severity="success">
          <FormattedMessage id="eventDashBoard.releaseSuccess" />
        </Alert> :
          <Alert onClose={handleSnackbarClose} severity="error">
            <FormattedMessage id="eventDashBoard.releaseFailed" />
          </Alert>}
      </Snackbar>
      {!isTabletOrMobile ?
        <>
          <Navbar />
          <Drawer
            style={{ width: { drawerWidth }, flexShrink: 0 }}
            variant="permanent"
          >
            <Toolbar />
            <div>
              <List>
                {[<FormattedMessage id="eventDashBoard.info" />, <FormattedMessage id="eventDashBoard.registration" />, <FormattedMessage id="eventDashBoard.checkinStatus" />, <FormattedMessage id="eventDashBoard.editRegistration" />,
                // eslint-disable-next-line array-callback-return
                <FormattedMessage id="eventDashBoard.addMatch" />, <FormattedMessage id="eventDashBoard.progress" />, <FormattedMessage id="eventDashBoard.result" />].map((text, index) => {
                  // Show Event Tracking tabs only if sportType is tennis
                  if (index < 4 || (!loading && data.getEvent && data.getEvent.sportType === "tennis")) {
                    return (
                      <ListItem button key={index} onClick={() => handleTabClick(index + 1)}>
                        <ListItemText primary={text} />
                      </ListItem>)
                  }
                })}
              </List>
            </div>
            {!loading && !data.getEvent.release ?
              <Button className={classes.releaseBut} variant="contained" color="default"
                onClick={handleDialogOpen}
              >
                <FormattedMessage id="eventDashBoard.release" />
              </Button> :
              <Button className={classes.releaseBut} variant="contained" color="default" disabled>
                <FormattedMessage id="eventDashBoard.release" />
              </Button>}
          </Drawer>

          <Container maxWidth="md" className={classes.container}>
            <Toolbar />
            {renderView()}
          </Container></> : <>
          <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: open,
            })}
          >
            <Toolbar className={classes.root}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <IconButton color="inherit" component={Link} to="/">
                <SportsTennisIcon />
              </IconButton>
              {/* Show ManageEvents link if user is logged in, else show Services link */
                userData ?
                  <IconButton color="inherit" component={Link} to={`/manage/${userData.profile._id}/all`}>
                    <DashboardIcon />
                  </IconButton> :
                  <IconButton color="inherit" component={Link} to="/about">
                    <InfoIcon />
                  </IconButton>
              }
              <div style={{ flexGrow: 1 }}></div>
              <IconButton size='small' color="inherit" onClick={() => dispatch(setLocale(LOCALE_OPTIONS.zh))}>CH</IconButton>
              <IconButton size='small' color="inherit" onClick={() => dispatch(setLocale(LOCALE_OPTIONS.en))}>EN</IconButton>
              {/* Show log out button if user is currently logged in, and vice versa */
                userData ?
                  <>
                    <IconButton color="inherit" component={Link} to={`/manage/${userData.profile._id}/organizerInfo`}>
                      <ContactMailIcon />
                    </IconButton>
                    <IconButton size='small' color="inherit" component={Link} to="/" onClick={() => dispatch(logOut())}>
                      <ExitToAppIcon />
                    </IconButton>
                  </>
                  :
                  <IconButton size='small' color="inherit" component={Link} to="/auth">
                    <FormattedMessage id="login" />
                  </IconButton>
              }
            </Toolbar>
          </AppBar>

          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </div>
            <Divider />
            <div>
              <List>
                {[<FormattedMessage id="eventDashBoard.info" />, <FormattedMessage id="eventDashBoard.registration" />, <FormattedMessage id="eventDashBoard.checkinStatus" />, <FormattedMessage id="eventDashBoard.editRegistration" />, <FormattedMessage id="eventDashBoard.addMatch" />, <FormattedMessage id="eventDashBoard.progress" />, 
                // eslint-disable-next-line array-callback-return
                <FormattedMessage id="eventDashBoard.result" />].map((text, index) => {
                  if (index < 4 || (!loading && data.getEvent && data.getEvent.sportType === "tennis")) {
                    return (
                      <ListItem button key={index} onClick={() => handleTabClick(index + 1)}>
                        <ListItemText primary={text} />
                      </ListItem>)
                  }
                })}
              </List>
            </div>
            {!loading && !data.getEvent.release ?
              <Button className={classes.releaseBut} variant="contained" color="default"
                onClick={handleDialogOpen}
              >
                <FormattedMessage id="eventDashBoard.release" />
              </Button> :
              <Button className={classes.releaseBut} variant="contained" color="default" disabled>
                <FormattedMessage id="eventDashBoard.release" />
              </Button>}
          </Drawer>
          <main
            className={clsx(classes.content, {
              [classes.contentShift]: open,
            })}
          >
            <Container>
              <Toolbar />
              {renderView()}
            </Container>
          </main>
        </>
      }
    </div >
  );
}

const GET_EVENT_SPORT_TYPE_RELEASE_QUERY = gql`
  query ($eventId: String!) {
    getEvent(eventId: $eventId) {
      sportType
      release
    }
  }
`;

export default EventDashboard;