import { useMutation, useQuery } from '@apollo/client';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import Navbar from '../components/Navbar';
const { Host_QUERY, Edit_Host_MUTATION } = require('../graphql');

const useStyles = makeStyles((theme) => ({
    submitBut: {
        float: "right",
        marginTop: "10px",
        marginBottom: "10px",
        marginRight: "10px",
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    form:{
        // paddingLeft:theme.spacing(4),
        // paddingRight:theme.spacing(4),
    },
    inputField: {
        paddingRight:theme.spacing(4),
    },
}));

function OrganizerInfo(props) {
    const classes = useStyles();
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [page, setPage] = useState("");
    const [bankCode, setBankCode] = useState("");
    const [bankAccount, setBankAccount] = useState("");
    const [accountName, setAccountName] = useState("");

    const { loading, error, data, refetch } = useQuery(Host_QUERY, { variables: { host_id: props.match.params.hostID } });
    if (error) console.log(error);

    useEffect(() => {
        if (!loading) {
            setName(data.host.name);
            setEmail(data.host.email);
            if (data.host.phone !== null)
                setPhone(data.host.phone);
            if (data.host.page !== null)
                setPage(data.host.page);
            if (data.host.bank_code !== null)
                setBankCode(data.host.bank_code);
            if (data.host.bank_account !== null)
                setBankAccount(data.host.bank_account);
            if (data.host.account_name !== null)
                setAccountName(data.host.account_name);
        }
    },
        [data,loading],
    );

    const [editHost] = useMutation(Edit_Host_MUTATION);

    const handleSubmit = async (event) => {
        event.preventDefault();

        var isSuccess = true;
        try {
            await editHost({
                variables: {
                    _id: props.match.params.hostID,
                    name: name,
                    phone: phone,
                    email: email,
                    page: page,
                    bank_code: bankCode,
                    bank_account: bankAccount,
                    account_name: accountName
                }
            })
        } catch (e) {
            console.log(e.networkError.result.errors); // here you can see your network
            isSuccess = false;
        }

        if (isSuccess) {
            alert("編輯成功！");
            refetch();
        } else {
            alert("編輯失敗！請再試一次");
        }
    }

    return (
        <>
            <Navbar />
            <Container maxWidth="sm" className={classes.container} alignItems="center" justify="center">
                <Toolbar />
                <form className={classes.form}>
                    <Button className={classes.submitBut} variant="contained" color="default"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        <FormattedMessage id="organizerInfo.save" />
                    </Button>
                    <TableContainer component={Paper} elevation={3}>
                        <Table aria-label="simple table">
                            <TableBody>
                                <TableRow key="info1">
                                    <TableCell  component="th" scope="row" align="center"><FormattedMessage id="organizerInfo.name" /></TableCell>
                                    <TableCell>
                                        <TextField className={classes.inputField} fullWidth label="Name"
                                            value={name}
                                            onInput={e => setName(e.target.value)}
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow key="info2">
                                    <TableCell component="th" scope="row" align="center"><FormattedMessage id="organizerInfo.phone" /></TableCell>
                                    <TableCell>
                                        <TextField fullWidth label="Phone"
                                            className={classes.inputField} value={phone}
                                            onInput={e => setPhone(e.target.value)}
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow key="info3">
                                    <TableCell  component="th" scope="row" align="center"><FormattedMessage id="organizerInfo.email" /></TableCell>
                                    <TableCell>
                                        <TextField fullWidth className={classes.inputField} label="Email"
                                            value={email}
                                            onInput={e => setEmail(e.target.value)}
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow key="info4">
                                    <TableCell  component="th" scope="row" align="center"><FormattedMessage id="organizerInfo.website" /></TableCell>
                                    <TableCell>
                                        <TextField fullWidth className={classes.inputField}  label="Page"
                                            value={page}
                                            onInput={e => setPage(e.target.value)}
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow key="info5">
                                    <TableCell component="th" scope="row" align="center"><FormattedMessage id="organizerInfo.bank" /></TableCell>
                                    <TableCell>
                                        <TextField fullWidth className={classes.inputField} label="Bank Code"
                                            value={bankCode}
                                            onInput={e => setBankCode(e.target.value)}
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow key="info6">
                                    <TableCell  component="th" scope="row" align="center"><FormattedMessage id="organizerInfo.bankAccount" /></TableCell>
                                    <TableCell>
                                        <TextField fullWidth className={classes.inputField} label="Bank Account"
                                            value={bankAccount}
                                            onInput={e => setBankAccount(e.target.value)}
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow key="info7">
                                    <TableCell component="th" scope="row" align="center">戶名</TableCell>
                                    <TableCell>
                                        <TextField fullWidth label="Account Name"
                                            value={accountName}
                                            onInput={e => setAccountName(e.target.value)}
                                        />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </form>
            </Container>
        </>
    );
}

export default OrganizerInfo;