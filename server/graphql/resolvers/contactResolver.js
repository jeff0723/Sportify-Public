const Contact = require('../../models/contact.model');
const sgMail = require('@sendgrid/mail');
require('dotenv').config({ path: `${__dirname}/../../../.env` });

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {
    Mutation: {
        async addContact(_, {
            data: { name, email, message }
        }) {
            const newContact = new Contact({
                name: name,
                email: email,
                message: message,
            });

            try {
                await newContact.save();
            } catch (err) {
                throw new Error(err);
            }
            const msg = {
                to: 'qwertzxc1478963@gmail.com',
                from: {
                    name: 'Jeffrey Lin',
                    email: 'jeffreylin0723@gmail.com',
                },
                subject: `<Sportify>Contact us <${name}> <${email}>`,
                text: 'Hello plain world!',
                html: `<h1>${message}</h1>`,
            };
            sgMail.send(msg)
                .then((response) => console.log('Email sent...'))
                .catch((error) => console.log(error.message));


            return true;
        },
    }
}