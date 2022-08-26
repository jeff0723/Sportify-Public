import { useMutation, useQuery } from '@apollo/client';
import { Button, Checkbox, Container, Dialog, DialogActions, DialogTitle, Divider, FormControlLabel, Paper, Snackbar, Switch, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import CheckInHeader from './CheckInHeader';
import CheckInTableToolbar from './CheckInTableToolBar';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const { GET_CHECK_IN, DELETE_CHECKINS } = require('../graphql');

const tableHead = [<FormattedMessage id="name" />, <FormattedMessage id="email" />, <FormattedMessage id="checkInTime" />,
]

function CheckInStatus(props) {
    const { loading, data, refetch } = useQuery
        (GET_CHECK_IN, { variables: { event_id: props.eventID } });
    const [deleteCheck] = useMutation(DELETE_CHECKINS);

    const [checkInList, setCheckInList] = useState([]);
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [dense, setDense] = useState(false);
    const [open, setOpen] = useState(false)//open delete dialog
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = checkInList.map((n) => n._id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, _id) => {
        const selectedIndex = selected.indexOf(_id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, _id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };
    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async (event) => {
        console.log(selected);
        console.log(typeof selected[0])
        var isSuccess = true;
        try {
            console.log('here')
            await deleteCheck({
                variables: {
                    data: selected
                }
            })
            console.log('here2')

        } catch (e) {
            isSuccess = false;
            console.log(e.networkError.result.errors);
        }

        if (isSuccess) {
            setDeleteSuccess(true);
            refetch();
            handleClose();
        } else {
            alert("刪除失敗！請再試一次");
        }
        ;
        setSelected([]);
    }
    const handleSnackClose = () => {
        setDeleteSuccess(false);
    }
    const isSelected = (_id) => selected.indexOf(_id) !== -1;

    useEffect(() => {
        refetch()
        if (!loading) setCheckInList(data.getCheckIn);

    },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [data])
    if (loading) return <p>loading</p>
    // console.log(checkInList);
    // console.log(isSelected(checkInList[0]._id));
    // if (data) console.log(checkInList[0]._id);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, checkInList.length - page * rowsPerPage);

    return (
        <Container maxWidth="md">
            <Paper>
                <TableContainer>
                    <CheckInTableToolbar numSelected={selected.length} onDelete={handleClickOpen} />
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
                        <DialogTitle id="form-dialog-title"><FormattedMessage id="checkin.deleteCheckIn" /></DialogTitle>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                <FormattedMessage id="deleteCancel" />
                            </Button>
                            <Button onClick={handleDelete} color="primary">
                                <FormattedMessage id="deleteSubmit" />
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Divider />
                    <Table size={dense ? 'small' : 'medium'} >
                        <CheckInHeader
                            headCells={tableHead}
                            numSelected={selected.length}
                            onSelectAllClick={handleSelectAllClick}
                            rowCount={checkInList.length} />
                        <TableBody>

                            {checkInList
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row._id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (<TableRow
                                        hover
                                        onClick={(event) => handleClick(event, row._id)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={index}
                                        selected={isItemSelected}>
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={isItemSelected}
                                                inputProps={{ 'aria-labelledby': labelId }} />
                                        </TableCell>
                                        <TableCell align="right">{row.name}</TableCell>
                                        <TableCell align="right">{row.email}</TableCell>
                                        <TableCell align="right">{new Date(parseInt(row.checkInTime)).toLocaleString()}</TableCell>
                                    </TableRow>);
                                })
                            }
                            {emptyRows > 0 && (
                                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                    <TableCell colSpan={4} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={checkInList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />


            </Paper>
            <FormControlLabel
                style={{ marginTop: 10 }}
                control={<Switch color='primary' checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            />
            <Snackbar anchorOrigin={{vertical:'top',horizontal: 'center' }} open={deleteSuccess} autoHideDuration={6000} onClose={handleSnackClose}>
                <Alert onClose={handleSnackClose} severity="success">
                    This is a success message!
                </Alert>
            </Snackbar>
        </Container>


    )
}



export default CheckInStatus;