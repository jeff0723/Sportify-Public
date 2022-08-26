import { useMutation, useQuery } from '@apollo/client';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { useEffect, useState } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { FormattedMessage } from 'react-intl';
const { Host_RegistrationStatus_QUERY, Host_SetPaidStatus_MUTATION } = require('../graphql');

const useStyles = makeStyles((theme) => ({
    chip: {
        marginTop: "20px",
        marginBottom: "10px"
    },
    table: {
        minWidth: 700,
    },
    download_but: {
        float: "right",
        marginTop: "2em",
    }
}));

function RegistrationStatus(props) {
    const classes = useStyles();
    const [success, setSuccess] = useState(false);

    const handleClose = () => {
        setSuccess(false);
    }

    const { loading, error, data, refetch } = useQuery(Host_RegistrationStatus_QUERY, { variables: { event_id: props.eventID } });
    if (error) console.log(error.networkError.result.errors);

    const [setPaid] = useMutation(Host_SetPaidStatus_MUTATION);

    useEffect(() => {
        refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const handlePaid = async (index) => {
        var isPaid = false;

        if (!data.eventForms[index].paid)
            isPaid = true;

        var isSuccess = true;
        try {
            await setPaid({
                variables: {
                    _id: data.eventForms[index]._id,
                    paid: isPaid
                }
            })
        } catch (e) {
            console.log(e.networkError.result.errors); // here you can see your network
            isSuccess = false;
        }

        if (isSuccess) {
            setSuccess(true);
            refetch();
        }
    }

    return (
        <>
            {loading ?
                <>
                    <Typography variant="h4"><FormattedMessage id="registrationStatus.title" /></Typography>
                    <Typography><FormattedMessage id="loading" /></Typography>
                </>
                :
                <><Typography variant="h4">{data.getEvent.title} <FormattedMessage id="registrationStatus.title" /></Typography>
                    <Chip label={data.eventForms.length} variant="outlined" className={classes.chip} />

                    <ReactHTMLTableToExcel
                        id="table-xls-button"
                        className={classes.download_but}
                        table="registration-status"
                        // eslint-disable-next-line no-useless-concat
                        filename={data.getEvent.title + " " + "報名資料"}
                        sheet="sheet1"
                        buttonText="Download as XLS" />
                    <TableContainer component={Paper}>
                        <Table id="registration-status" className={classes.table} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    {data.getEvent.form.blocks.map(e => (
                                        <TableCell align="right">{e.question}</TableCell>
                                    ))}
                                    <TableCell align="right"><FormattedMessage id="registrationStatus.fee" /></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.eventForms.map((row, index) => (
                                    <TableRow key={index}>
                                        {row.blocks.map(e => (
                                            <TableCell align="right">{e.answer}</TableCell>
                                        ))}
                                        <TableCell align="right">
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={row.paid}
                                                        onChange={() => handlePaid(index)}
                                                        color="primary"
                                                    />
                                                }
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer></>}
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={success}
                autoHideDuration={6000}
                onClose={handleClose}
                message="繳費狀態設定成功"
                action={
                    <>
                        <Button color="secondary" size="small" onClick={handleClose}>
                            Close
                        </Button>
                    </>
                }
            />
        </>
    );
}

export default RegistrationStatus;