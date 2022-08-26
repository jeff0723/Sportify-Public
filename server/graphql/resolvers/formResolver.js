const Form = require('../../models/form.model');
const ObjectId = require('mongodb').ObjectID;
const sgMail = require('@sendgrid/mail');
const QRCode = require('qrcode');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {
    Query: {
        async eventForms(parent, args, { FormDB }, info) {
            return await Form.find({ event_id: ObjectId(args.event_id) });
        },
    },
    Mutation: {
        async addForm(_, {
            data: { event_id, blocks, paid }
        }) {
            const newForm = new Form({
                event_id: ObjectId(event_id),
                blocks: blocks,
                paid: paid
            });

            try {
                await newForm.save();
            } catch (err) {
                throw new Error(err);
            }

            return true;
        },
        async setPaidStatus(parent, args) {
            await Form.findOne({ _id: ObjectId(args.data._id) }, function (err, form) {
                if (!err) {
                    if (form) {
                        form.paid = args.data.paid;
                        const name = form.blocks[0].answer;
                        const email = form.blocks[1].answer;
                        let img;
                        QRCode.toDataURL('I am a pony!',async function(err,url){
                            if(err) console.log(err)
                            img = await url;
                            console.log(img);
                        });
                        console.log(name)
                        console.log(email)
                        console.log(img)
                        const msg = {
                            to: email,
                            from: {
                                name: 'Jeffrey Lin',
                                email: 'jeffreylin0723@gmail.com',
                            },
                            subject: `報名成功通知`,
                            text: 'Hello plain world!',
                            html: `<h1>${name}</h1>
                            <img src=${img}></img>`,
                        };
                        sgMail.send(msg)
                            .then((response) => console.log('Email sent...'))
                            .catch((error) => console.log(error.message));


                        form.save();
                    }
                }
            });

            return true;
        }
    }
}