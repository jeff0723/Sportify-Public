const { model, Schema } = require('mongoose');

const hostSchema = new Schema({
    name: { type: String, required: true, trim: true, minlength: 3 },
    email: { type: String, required: true, trim: true, minlength: 5 },
    password: { type: String },
    googleId: { type: String },
    phone: { type: String, trim: true },
    page: { type: String, trim: true },
    bank_code: { type: String, trim: true },
    bank_account: { type: String, trim: true },
    account_name: { type: String, trim: true }
}, {
    timestamps: true,
});

const Host = model('Host', hostSchema);

module.exports = Host;