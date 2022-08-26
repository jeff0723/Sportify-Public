const Payment = require('../../models/payment.model');
const ecpay = require('ecpay_aio_nodejs')
const options = require('../../payment/config')
const moment = require('moment');
const crypto = require("crypto");
const create = new ecpay(options)
// console.log('test')
module.exports = {
    Mutation: {
        async addPayment(_,{
            data: {MerchantTradeNo, MerchantTradeDate, TotalAmount, TradeDesc, ItemName , ReturnURL, ClientBackURL}
        })
        {
            const newPayment = new Payment({
                MerchantTradeNo: MerchantTradeNo,
                MerchantTradeDate: MerchantTradeDate,
                TotalAmount: TotalAmount,
                TradeDesc: TradeDesc,
                ItemName: ItemName,
                ReturnURL: ReturnURL,
                ClientBackURL: ClientBackURL,
            });
            try {
                await newPayment.save();
            } catch (err) {
                throw new Error(err);
            }
            // const  base_param = {
            //     MerchantTradeNo: crypto.randomBytes(20).toString('hex').substr(20), //請帶20碼uid, ex: f0a0d7e9fae1bb72bc93
            //     MerchantTradeDate: moment(Date.now()).format('YYYY/MM/DD HH:mm:ss'), //ex: 2017/02/13 15:45:30
            //     TotalAmount: '9999',
            //     TradeDesc: '測試商品描述',
            //     ItemName: '測試商品',
            //     ReturnURL: 'http://www.sportify.live/',
            //     ClientBackURL:'http://www.sportify.live/'
            //     // OrderResultURL:'http://localhost:5000/redirect',
            // }
            const base_param = {
                MerchantTradeNo: MerchantTradeNo,
                MerchantTradeDate: MerchantTradeDate,
                TotalAmount: TotalAmount,
                TradeDesc: TradeDesc,
                ItemName: ItemName,
                ReturnURL: ReturnURL,
                ClientBackURL: ClientBackURL,
                 }
            const inv_params = {

                    }
                  
            const htm = create.payment_client.aio_check_out_all(parameters = base_param, invoice = inv_params)
         
            return htm;
    },
}
}
// const base_param = {
            //     MerchantTradeNo: MerchantTradeNo,
            //     MerchantTradeDate: MerchantTradeDate,
            //     TotalAmount: TotalAmount,
            //     TradeDesc: TradeDesc,
            //     ReturnURL: ReturnURL,
            //     ClientBackURL: ClientBackURL,
            // }
            // const inv_params = {

            // }
            // const htm = create.payment_client.aio_check_out_all(parameters = base_param, invoice = inv_params)
            // console.log('here',htm)