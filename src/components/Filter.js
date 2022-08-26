import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
// import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useMediaQuery } from 'react-responsive';
import DateRange from './DateRange';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  range: {
    width: 120,
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4)
  },
  container_mobile: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4)
  },
  mobile_item: {
    marginTop: theme.spacing(1)
  },

  paper: {
    padding: theme.spacing(2),
  },
  icon: {
    paddingTop: theme.spacing(2),
  },

}));
function Filter(props) {
  const classes = useStyles();
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 992px)' });
  return (
    <div>
      {!isTabletOrMobile ?
        <Container maxWidth='lg'>
          <Grid className={classes.container} container>
            <Grid item xs={1}>
            </Grid>
            <Grid item xs={3} justify="center">
              <InputLabel ><FormattedMessage id="type" /></InputLabel>
              <Select
                onChange={props.TypeChange}
                style={{ width: 120 }}>
                <MenuItem value={""}><FormattedMessage id="none" /></MenuItem>
                <MenuItem value="tennis"><FormattedMessage id="tennis" /></MenuItem>
                <MenuItem value="basketball"><FormattedMessage id="basketball" /></MenuItem>
                <MenuItem value="baseball"><FormattedMessage id="baseball" /></MenuItem>
                <MenuItem value="table tennis"><FormattedMessage id="table-tennis" /></MenuItem>
                <MenuItem value="badminton"><FormattedMessage id="badminton" /></MenuItem>
                <MenuItem value="soccer"><FormattedMessage id="soccer" /></MenuItem>
                <MenuItem value="handball"><FormattedMessage id="handball" /></MenuItem>

              </Select >

            </Grid>
            <Grid item xs={5} justify="center">
              <InputLabel justify="center" ><FormattedMessage id="date" /></InputLabel>
              <DateRange value={props.value} DateChange={props.DateChange} justify="center" />
            </Grid>
            <Grid item xs={2} justify="center">
              <InputLabel ><FormattedMessage id="location" /></InputLabel>
              <Select
                onChange={props.RegionChange}
                style={{ width: 120 }}>
                <MenuItem value={""}><FormattedMessage id="none" /></MenuItem>
                <MenuItem value={"北部"}><FormattedMessage id="north" /></MenuItem>
                <MenuItem value={"中部"}><FormattedMessage id="central" /></MenuItem>
                <MenuItem value={"南部"}><FormattedMessage id="south" /></MenuItem>
              </Select >
            </Grid>
          </Grid>
        </Container>
        :

        <Grid className={classes.container_mobile} container direction='column'>
          <Grid item>
            {/* <TuneIcon/> */}
          </Grid>
          {/* <Grid item xs={1}>
      
      </Grid> */}
          <Grid item className={classes.mobile_item}>
            <InputLabel ><FormattedMessage id="type" /></InputLabel>
            <Select
              onChange={props.TypeChange}
              style={{ width: 120 }}>
              <MenuItem value={""}><FormattedMessage id="none" /></MenuItem>
              <MenuItem value="tennis"><FormattedMessage id="tennis" /></MenuItem>
              <MenuItem value="basketball"><FormattedMessage id="basketball" /></MenuItem>
              <MenuItem value="baseball"><FormattedMessage id="baseball" /></MenuItem>
              <MenuItem value="table tennis"><FormattedMessage id="table-tennis" /></MenuItem>
              <MenuItem value="badminton"><FormattedMessage id="badminton" /></MenuItem>
              <MenuItem value="soccer"><FormattedMessage id="soccer" /></MenuItem>
              <MenuItem value="handball"><FormattedMessage id="handball" /></MenuItem>

            </Select >
          </Grid>

          <Grid item className={classes.mobile_item}>
            <InputLabel justify="center" ><FormattedMessage id="date" /></InputLabel>
            <DateRange value={props.value} DateChange={props.DateChange} justify="center" />
          </Grid>
          <Grid item className={classes.mobile_item}>
            <InputLabel ><FormattedMessage id="location" /></InputLabel>
            <Select
              onChange={props.RegionChange}
              style={{ width: 120 }}>
              <MenuItem value={""}><FormattedMessage id="none" /></MenuItem>
              <MenuItem value={"北部"}><FormattedMessage id="north" /></MenuItem>
              <MenuItem value={"中部"}><FormattedMessage id="central" /></MenuItem>
              <MenuItem value={"南部"}><FormattedMessage id="south" /></MenuItem>
            </Select >
          </Grid>
        </Grid>

      }
    </div>


  );
}
export default Filter;