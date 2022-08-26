const { model, Schema } = require('mongoose');

const paymentSchema = new Schema({
    MerchantTradeNo: { type: String },
    MerchantTradeDate: { type: String },
    TotalAmount: {type: String},
    TradeDesc: {type: String},
    ItemName: {type: String},
    ReturnURL:{type: String},
    ClientBackURL: {type: String},

})
const Payment = model('Payment', paymentSchema);

module.exports = Payment;