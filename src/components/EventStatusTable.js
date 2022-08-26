import { useMutation, useQuery } from '@apollo/client';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import DecideEventStatus from './DecideEventStatus';
const { New_Event_MUTATION, Host_Events_QUERY } = require('../graphql');

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'title', numeric: false, disablePadding: true, label: <FormattedMessage id="manage.eventTitle" /> },
  { id: 'date', numeric: false, disablePadding: false, label: <FormattedMessage id="manage.eventDate" /> },
  { id: 'access', numeric: false, disablePadding: false, label: <FormattedMessage id="manage.eventPlace" /> },
  { id: 'publish', numeric: false, disablePadding: false, label: <FormattedMessage id="manage.eventType" /> },
  { id: 'status', numeric: false, disablePadding: false, label: <FormattedMessage id="manage.eventStatus" /> },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  // numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  // onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  title: {
    flex: '1 1 100%',
  },
  createBut: {
    width: "10em",
  },
}));

var host_id = "";
var doRefetch;

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [newEvent] = useMutation(New_Event_MUTATION);

  const handleSubmit = async (event) => {
    event.preventDefault();
    var isSuccess = true;
    try {
      await newEvent({
        variables: {
          host_id: host_id,
          title: title,
          public: true,
          release: false,
        }
      })
    } catch (e) {
      console.log(e.networkError.result.errors); // here you can see your network
      isSuccess = false;
    }

    if (isSuccess) {
      alert("新增比賽成功！");
      doRefetch();
      setOpen(false)
    } else {
      alert("新增比賽失敗！請再試一次");
    }
  }

  return (
    <Toolbar className={classes.root}>
      <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
        <FormattedMessage id="manage.listTitle" />
      </Typography>

      <Button className={classes.createBut} variant="contained" onClick={handleClickOpen} style={{ maxWidth: "90px" }}>
        <FormattedMessage id="manage.createEvent" />
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title"><FormattedMessage id="manage.createEvent" /></DialogTitle>
        <DialogContent>
          <DialogContentText>
            <FormattedMessage id="manage.createEventContent" />
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Event Name"
            fullWidth
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            <FormattedMessage id="manage.createEventCancel" />
          </Button>
          <Button onClick={handleSubmit} color="primary">
            <FormattedMessage id="manage.createEventSubmit" />
          </Button>
        </DialogActions>
      </Dialog>


      <Tooltip title="Filter list">
        <IconButton aria-label="filter list">
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  clickableRow: {
    cursor: 'pointer'
  }
}));

export default function EnhancedTable(props) {
  const classes = useStyles();
  const history = useHistory();
  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('date');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const dense = false;
  const locale = useSelector(state => state.locale.locale);
  host_id = props.hostID;

  const { loading, error, data, refetch } = useQuery(Host_Events_QUERY, { variables: { host_id: props.hostID } });
  // if (error) console.log(error);
  if (error) console.log(error.networkError.result.errors);
  doRefetch = refetch;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event, eventTitle) => {
    history.push(`/manage/${props.hostID}/${eventTitle}`);
  };

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const handleChangeDense = (event) => {
  //   setDense(event.target.checked);
  // };

  // const isSelected = (name) => selected.indexOf(name) !== -1;
  var emptyRows = 0
  if (!loading)
    emptyRows = rowsPerPage - Math.min(rowsPerPage, data.hostEvents.length - page * rowsPerPage);

  var today = new Date();
  var month = "";
  var date = "";
  if ((today.getMonth() + 1).toString().length === 1)
    month = "0" + (today.getMonth() + 1).toString();
  else
    month = (today.getMonth() + 1).toString();
  if (today.getDate().toString().length === 1)
    date = "0" + today.getDate().toString()
  else
    date = today.getDate().toString()
  var today_date = today.getFullYear() + '-' + month + '-' + date;

  return (
    <div className={classes.root}>
      {loading ? <Paper className={classes.paper}><Typography><FormattedMessage id="loading" /></Typography></Paper>
        :
        <Paper className={classes.paper}>
          <EnhancedTableToolbar />
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                classes={classes}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={data.hostEvents.length}
              />
              <TableBody>
                {stableSort(data.hostEvents, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;
                    // console.log('row sporttype: ',typeof row.sportType)

                    return (
                      <TableRow
                        className={classes.clickableRow}
                        hover
                        onClick={(event) => handleClick(event, row._id)}
                        // role="checkbox"
                        tabIndex={-1}
                        key={row._id}
                      >
                        <TableCell padding="checkbox">
                          {/* <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        /> */}
                        </TableCell>
                        <TableCell component="th" id={labelId} scope="row" align="left" padding="none">
                          {row.title}
                        </TableCell>
                        <TableCell align="left">
                          {row.date === null ? (locale === "en" ? "Not set" : "未設定") : (row.dateEnd == null ? row.date.slice(0, 10) : row.date.slice(0, 10) + "~" + row.dateEnd.slice(0, 10))}
                        </TableCell>
                        <TableCell align="left">{(row.location === null || row.location === "") ? (locale === "en" ? "Not set" : "未設定") : row.location}</TableCell>
                        <TableCell align="left">{(row.sportType === null || row.sportType === "") ? (locale === "en" ? "Not set" : "未設定") : <FormattedMessage id={row.sportType} />}</TableCell>
                        <TableCell align="left">{DecideEventStatus(row.date, row.dateEnd, today_date)}</TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.hostEvents.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      }
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
    </div>
  );
}
