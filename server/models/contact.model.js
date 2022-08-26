const { model, Schema } = require('mongoose');

const contactSchema = new Schema({
    name: { type: String },
    email: { type: String },
    message: { type: String },
},
    {
        timestamps: true,
    })

const Contact = model('Contact', contactSchema);

module.exports = Contact;