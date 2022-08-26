const { model, Schema } = require('mongoose');

const formSchema = new Schema({
    event_id: { type: Schema.Types.ObjectId, ref: 'Event' },
    blocks: [{
        blockId: { type: String },
        blockType: { type: String },
        answer: { type: String },
    }],
    paid: { type: Boolean }
}, {
    timestamps: true
});

const Form = model('Form', formSchema);

module.exports = Form;