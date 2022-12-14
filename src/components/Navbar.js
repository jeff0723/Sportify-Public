import { Typography } from "@material-ui/core";
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import InfoIcon from '@material-ui/icons/Info';
import SportsTennisIcon from '@material-ui/icons/SportsTennis';
import React from "react";
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { Link } from "react-router-dom";
import { LOCALE_OPTIONS } from '../i18n/locale-settings';
import { logOut, setLocale } from '../redux/actions';

function Navbar() {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 992px)' });
    const dispatch = useDispatch();
    const userData = useSelector(state => state.auth.userData);

    return (
        <AppBar position="fixed" style={{ zIndex: 1201 }}>
            {!isTabletOrMobile ?
                <Toolbar>
                    <Button data-cy='Sportify' color="inherit" component={Link} to="/">
                        <FormattedMessage id="app.title" />
                    </Button>
                    {/* Show ManageEvents link if user is logged in, else show Services link */
                        userData ?
                            <Button color="inherit" component={Link} to={`/manage/${userData.profile._id}/all`}>
                                <FormattedMessage id="navbar.manageEvents" />
                            </Button> :
                            <Button color="inherit" component={Link} to="/about">
                                <FormattedMessage id="navbar.about" />
                            </Button>
                    }
                    <div style={{ flexGrow: 1 }}></div>
                    <Button color="inherit" onClick={() => dispatch(setLocale(LOCALE_OPTIONS.zh))}>??????</Button>
                    <Button color="inherit" onClick={() => dispatch(setLocale(LOCALE_OPTIONS.en))}>ENG</Button>
                    {/* Show log out button if user is currently logged in, and vice versa */
                        userData ?
                            <>
                                <Button color="inherit" component={Link} to={`/manage/${userData.profile._id}/organizerInfo`}>
                                    <FormattedMessage id="navbar.hostInfo" />
                                </Button>
                                <Typography>
                                    {userData.profile.name}
                                </Typography>
                                <Button color="inherit" component={Link} to="/" onClick={() => dispatch(logOut())}>
                                    <FormattedMessage id="logout" />
                                </Button>
                            </>
                            :
                            <Button color="inherit" component={Link} to="/auth">
                                {/* <Button color="inherit" component={Link} to="/manage/60719d96ccb9eb6520edba71/all" onClick={() => dispatch(logIn())}> */}
                                <FormattedMessage id="login" />
                            </Button>

                    }
                </Toolbar> :
                <Toolbar>

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
            }
        </AppBar>
    );
}

export default Navbar;