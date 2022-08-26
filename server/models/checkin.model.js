const { model, Schema } = require('mongoose');

const checkInSchema = new Schema({
    event_id: { type: Schema.Types.ObjectId, ref: 'Event' },
    name: { type: String },
    email: { type: String },
    checkInTime: { type: Date },
},
    {
        timestamps: true,
    })

const CheckIn = model('CheckIn', checkInSchema);

module.exports = CheckIn;