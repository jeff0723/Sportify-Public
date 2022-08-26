import { useQuery } from '@apollo/client';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import InfoIcon from '@material-ui/icons/Info';
import MenuIcon from '@material-ui/icons/Menu';
import SportsTennisIcon from '@material-ui/icons/SportsTennis';
import clsx from 'clsx';
import React, { useState,Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { LOCALE_OPTIONS } from '../i18n/locale-settings';
import { logOut, setLocale } from '../redux/actions';
import LoadingGif from '../components/LoadingGif';


const EventDescription = React.lazy(() => import('../components/EventDescription'));
const EventTrackingView = React.lazy(() => import('../components/EventTrackingView'));
const EventResultView = React.lazy(() => import('../components/EventResultView'));
const EventBracket = React.lazy(() => import('../components/EventBracket'));
const CheckIn = React.lazy(() => import('../components/CheckIn'));

const { GET_EVENT_QUERY } = require('../graphql');

const drawerWidth = 120;
const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
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
  checkinContent: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -145,
  }
  ,
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

function EventInfo(props) {
  const isTabletOrMobile = useMediaQuery({ query: `(max-width: ${1350}px)` })
  const classes = useStyles();
  const theme = useTheme();
  const [currentTab, setCurrentTab] = useState(0);
  const [open, setOpen] = useState(false);
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

  console.log(props);
  const { loading, error, data } = useQuery(GET_EVENT_QUERY, {
    variables: { eventId: props.match.params.eventID }
  });
  // if (error) console.log(error);
  if (error) console.log(error.networkError.result.errors);

  if (!loading)
    console.log(data.getEvent.sportType);

  return (
    <div className={classes.root}>
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
                {[<FormattedMessage id="eventPage.registerInfo" />, <FormattedMessage id="eventPage.regulations" />, <FormattedMessage id="eventPage.traffic" />, <FormattedMessage id="eventPage.prize" />].map((text, index) => (
                  <ListItem button key={text} onClick={() => handleTabClick(index)}>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
              <Divider />
              <List>
                {[<FormattedMessage id="eventPage.contect" />, <FormattedMessage id="eventPage.register" />, <FormattedMessage id="eventPage.checkin" />].map((text, index) => (
                  !(index === 1) ?
                    (<ListItem button key={text} onClick={() => handleTabClick(index + 4)}
                    >
                      <ListItemText primary={text} />
                    </ListItem>) :
                    (<ListItem button key={text}
                      component={Link} to={"/event/" + props.match.params.eventID + "/register/"}
                    >
                      <ListItemText primary={text} />
                    </ListItem>)
                ))}
              </List>

              {!loading && data.getEvent.sportType === "tennis" ?
                <>
                  <Divider />
                  <List>
                    {[<FormattedMessage id="eventPage.schedule" />, <FormattedMessage id="eventPage.process" />, <FormattedMessage id="eventPage.result" />, <FormattedMessage id="eventPage.tournament" />].map((text, index) => (
                      <ListItem button key={text} onClick={() => handleTabClick(index + 7)}>
                        <ListItemText primary={text} />
                      </ListItem>
                    ))}
                  </List>
                </> :
                <></>
              }
            </div>
          </Drawer>
        </> :
        <>
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
                {[<FormattedMessage id="eventPage.registerInfo" />, <FormattedMessage id="eventPage.regulations" />, <FormattedMessage id="eventPage.traffic" />, <FormattedMessage id="eventPage.prize" />].map((text, index) => (
                  <ListItem button key={text} onClick={() => handleTabClick(index)}>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
              <Divider />
              <List>
                {[<FormattedMessage id="eventPage.contect" />, <FormattedMessage id="eventPage.register" />, <FormattedMessage id="eventPage.checkin" />].map((text, index) => (
                  !(index === 1) ?
                    (<ListItem button key={text} onClick={() => handleTabClick(index + 4)}
                    >
                      <ListItemText primary={text} />
                    </ListItem>) :
                    (<ListItem button key={text}
                      component={Link} to={"/event/" + props.match.params.eventID + "/register/"}
                    >
                      <ListItemText primary={text} />
                    </ListItem>)
                ))}
              </List>

              {!loading && data.getEvent.sportType === 'tennis' ?
                <>
                  <Divider />
                  <List>
                    {[<FormattedMessage id="eventPage.schedule" />, <FormattedMessage id="eventPage.process" />, <FormattedMessage id="eventPage.result" />, <FormattedMessage id="eventPage.tournament" />].map((text, index) => (
                      ((!loading ? data.getEvent.sportType === "tennis" : true) ? <ListItem button key={text} onClick={() => handleTabClick(index + 7)}>
                        <ListItemText primary={text} />
                      </ListItem> :
                        (index === 1 ?
                          <ListItem button key={text} onClick={() => handleTabClick(index + 7)}>
                            <ListItemText primary={text} />
                          </ListItem> : <></>))
                    ))}
                  </List>
                </> :
                <></>
              }
            </div>
          </Drawer>
        </>
      }
      {!isTabletOrMobile ?
        <Container maxWidth="md" className={`display-ckeditor ${classes.container}`}>
          <Toolbar />
          {loading ?
            <Typography><FormattedMessage id="loading" /></Typography> :

            currentTab === 6 ? 
            <Suspense fallback={<LoadingGif />}>
              <CheckIn style={{marginLeft:-140}} eventID={props.match.params.eventID} />
            </Suspense> :
            (currentTab === 7 ?
              <Suspense fallback={<LoadingGif />}>
                <EventDescription info={data.getEvent} tab={currentTab} eventID={props.match.params.eventID} />  
              </Suspense> : 
              (currentTab === 8 ?
                <Suspense fallback={<LoadingGif />}>
                  <EventTrackingView eventID={props.match.params.eventID} />
                </Suspense>:
                (currentTab === 9 ?
                  <Suspense fallback={<LoadingGif />}>
                    <EventResultView eventID={props.match.params.eventID} />
                  </Suspense> :  
                  (currentTab === 10 ?
                    <Suspense fallback={<LoadingGif />}>
                      <EventBracket eventID={props.match.params.eventID} />
                    </Suspense> :  
                    <Suspense fallback={<LoadingGif />}>
                      <EventDescription info={data.getEvent} tab={currentTab} eventID={props.match.params.eventID} />
                    </Suspense>
                  
          ))))}
           
        </Container>
        :
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
            [classes.checkinContent]: currentTab === 6,
          })}
        >
          <Toolbar />
          {loading ?
            <Typography><FormattedMessage id="loading" /></Typography> :

            currentTab === 6 ? 
            <Suspense fallback={LoadingGif}>
              <CheckIn style={{marginLeft:-140}} eventID={props.match.params.eventID} />
            </Suspense> :
            (currentTab === 7 ?
              <Suspense fallback={LoadingGif}>
                <EventDescription info={data.getEvent} tab={currentTab} eventID={props.match.params.eventID} />  
              </Suspense> : 
              (currentTab === 8 ?
                <Suspense fallback={LoadingGif}>
                  <EventTrackingView eventID={props.match.params.eventID} />
                </Suspense>:
                (currentTab === 9 ?
                  <Suspense fallback={<LoadingGif />}>
                    <EventResultView eventID={props.match.params.eventID} />
                  </Suspense> :  
                  (currentTab === 10 ?
                    <Suspense fallback={<LoadingGif />}>
                      <EventBracket eventID={props.match.params.eventID} />
                    </Suspense> :  
                    <Suspense fallback={<LoadingGif />}>
                      <EventDescription info={data.getEvent} tab={currentTab} eventID={props.match.params.eventID} />
                    </Suspense>
                  
          ))))}

          {/* </Container> */}
        </main>
      }
    </div>
  );
}

export default EventInfo;