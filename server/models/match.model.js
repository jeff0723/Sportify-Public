const { model, Schema } = require('mongoose');

const matchSchema = new Schema({
    event_id: { type: Schema.Types.ObjectId, ref: 'Event' },
    index: { type: Number },
    match_name: { type: String },
    player_p1: { type: String },
    player_p2: { type: String },
    serve_p1: { type: String },
    serve_p2: { type: String },
    point_p1: { type: Number },
    point_p2: { type: Number },
    set1_p1: { type: Number },
    set1_p2: { type: Number },
    set2_p1: { type: Number },
    set2_p2: { type: Number },
    set3_p1: { type: Number },
    set3_p2: { type: Number },
    live: { type: Boolean },
}
)


const Match = model('Match', matchSchema);

module.exports = Match;