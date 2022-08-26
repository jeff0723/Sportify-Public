import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useState, useEffect } from 'react';
import React from 'react';
import moment from "moment";
import parse from 'html-react-parser';
import { useMutation } from '@apollo/client';
const { CREATE_PAYMENT_MUTATION } = require('../graphql');
const crypto = require("crypto");

function TestPage() {
    const MerchantTradeNo = crypto.randomBytes(20).toString('hex').substr(20)
    const MerchantTradeDate = moment(Date.now()).format('YYYY/MM/DD HH:mm:ss');
    const [isClick, setClick] = useState(false)
    const [TotalAmount, setTotalAmount] = useState("");
    const [TradeDesc, setTradeDesc] = useState("");
    const [ItemName, setItemName] = useState("");
    const [ReturnURL, setReturnURL] = useState("");
    const [ClientBackURL, setClientBackURL] = useState("");
    const [htmlText, sethtmlText] = useState("");
    const [newPayment] = useMutation(CREATE_PAYMENT_MUTATION);
    // const text = parse(htm)
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
            console.log('testpage error', e);
            isSuccess = false;

        }
        if (isSuccess) {
            alert("我們收到您的回覆，感謝您的時間！");
        } else {
            alert("送出失敗！");
        }
        // // console.log(typeof htm)
        // console.log(htm.data.addPayment)
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
                    <TextField required variant="outlined"
                        value={TotalAmount} placeholder='Total Amount'
                        onInput={e => setTotalAmount(e.target.value)}
                    />
                    <TextField required variant="outlined"
                        value={TradeDesc} placeholder='Trade Description'
                        onInput={e => setTradeDesc(e.target.value)}
                    />
                    <TextField required variant="outlined"
                        value={ItemName} placeholder='Itme Name'
                        onInput={e => setItemName(e.target.value)}
                    />
                    <TextField required variant="outlined"
                        value={ReturnURL} placeholder='Return URL'
                        onInput={e => setReturnURL(e.target.value)}
                    />
                    <TextField required variant="outlined"
                        value={ClientBackURL} placeholder='Client Back URL'
                        onInput={e => setClientBackURL(e.target.value)}
                    />
                    <Button onClick={handleClick}>前往付款</Button> </> : <>{parse(htmlText)}</>}
        </>
    )
}
export default TestPage;