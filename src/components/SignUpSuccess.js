import { useMutation } from '@apollo/client';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import parse from 'html-react-parser';
import moment from "moment";
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
const { CREATE_PAYMENT_MUTATION } = require('../graphql');

const crypto = require("crypto");

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    form: {
        marginTop: "20px",
    },
    fromItemTitle: {
        marginTop: "10px",
        marginBottom: "10px",
        fontSize: "1.5em",
    },
    textFieldLabel: {
        display: "inline",
        marginLeft: "5px",
        marginRight: "5px",
    },
    backBut: {
        float: "right",
    },
    payBut: {
        float: 'right',
        // marginTop:theme.spacing(2),
        background: "#000000",
        color: "#ffffff",
        borderRadius: 10
    },
    appBarSpacer: theme.mixins.toolbar,
}));

function SignUpSuccess(props) {
    const locale = useSelector(state => state.locale.locale)
    const classes = useStyles();
    const MerchantTradeNo = crypto.randomBytes(20).toString('hex').substr(20)
    const MerchantTradeDate = moment(Date.now()).format('YYYY/MM/DD HH:mm:ss');
    const TotalAmount = "9999";
    const TradeDesc = "測試商品描述";
    const ItemName = "測試商品"
    const ReturnURL = "http://www.sportify.live/"
    const ClientBackURL = "http://www.sportify.live/"
    const [isClick, setClick] = useState(false)
    const [htmlText, sethtmlText] = useState("");
    const [newPayment] = useMutation(CREATE_PAYMENT_MUTATION);
    const handleClick = async (e) => {
        e.preventDefault();
        var isSuccess = true;
        let htm = null;
        try {
            htm = await newPayment({
                variables: {
                    MerchantTradeNo: MerchantTradeNo,
                    MerchantTradeDate: MerchantTradeDate,
                    TotalAmount: TotalAmount,
                    TradeDesc: TradeDesc,
                    ItemName: ItemName,
                    ReturnURL: ReturnURL,
                    ClientBackURL: ClientBackURL,
                }
            })

        } catch (e) {
            // console.log(e.networkError.result.errors); // here you can see your network
            console.log(e);
            isSuccess = false;

        }
        if (isSuccess) {
            alert("前往付款！");
        } else {
            alert("送出失敗！");
        }
        // // console.log(typeof htm)
        // console.log(htm.data.addPayment)
        // console.log(htm)
        setClick(true)
        sethtmlText(htm.data.addPayment)
        // console.log('htm',htm)

    }
    useEffect(() => {
        if (document.getElementById("_form_aiochk")) {
            document.getElementById("_form_aiochk").submit()
        }
    })
    return (
        <>
            {!isClick ?
                <>
                    <Paper>
                        <Container maxWidth="md" className={classes.container}>
                            <Button className={classes.backBut} variant="contained" color="default"
                                component={NavLink} to={"/event/" + props.eventId}
                            >
                                <FormattedMessage id='back-event-page' />
                            </Button>
                            <Grid>
                                <Typography variant="h5"><FormattedMessage id='sign-up-success' /></Typography>

                            </Grid>
                            <Grid>
                                <Typography variant="h5">{(locale === "en" ? "Bank Code: " : "匯款銀行代碼: ") + props.bankInfo.bank_code}</Typography>
                            </Grid>
                            <Grid>
                                <Button className={classes.payBut} variant="contained" color="default" onClick={handleClick} ><FormattedMessage id='pay-now' /></Button>
                                <Typography variant="h5">{(locale === "en" ? "Bank Account: " : "匯款銀行帳號: ") + props.bankInfo.bank_account}</Typography>

                            </Grid>
                        </Container>
                    </Paper></> : <>{parse(htmlText)}</>}
        </>

    )
}

export default SignUpSuccess;