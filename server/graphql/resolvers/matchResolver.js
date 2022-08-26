const Match = require('../../models/match.model');
const ObjectId = require('mongodb').ObjectID;
const { PubSub } = require('graphql-subscriptions')
const { withFilter } = require('apollo-server-express');
const pubsub = new PubSub()

module.exports = {
    Query: {
        async getMatch(_, { event_id }) {
            try {
                const matches = await Match.find({ event_id: ObjectId(event_id) });
                if (matches) {
                    return matches;
                }
                else {
                    throw new Error("Match not found");
                }
            } catch (err) {
                throw new Error(err);
            }
        },

    },
    Mutation: {
        async addMatch(_, {
            data: { event_id, match_name, player_p1, player_p2 }
        }) {
            const newMatch = new Match({
                event_id: event_id,
                match_name: match_name,
                player_p1: player_p1,
                player_p2: player_p2,
                serve_p1: "",
                serve_p2: "",
                point_p1: 0,
                point_p2: 0,
                set1_p1: 0,
                set1_p2: 0,
                set2_p1: 0,
                set2_p2: 0,
                set3_p1: 0,
                set3_p2: 0,
                live: true
            });
            // console.log(newMatch)
            try {
                await newMatch.save();
            } catch (err) {
                throw new Error(err);
            }

            return true;
        },
        async editMatch(_, args) {
            await Match.findOne({ _id: ObjectId(args.data._id) }, function (err, match) {
                if (!err) {
                    if (match) {
                        match.serve_p1 = args.data.serve_p1,
                            match.serve_p2 = args.data.serve_p2,
                            match.point_p1 = args.data.point_p1,
                            match.point_p2 = args.data.point_p2,
                            match.set1_p1 = args.data.set1_p1,
                            match.set1_p2 = args.data.set1_p2,
                            match.set2_p1 = args.data.set2_p1,
                            match.set2_p2 = args.data.set2_p2,
                            match.set3_p1 = args.data.set3_p1,
                            match.set3_p2 = args.data.set3_p2,
                            match.save()
                    }
                }
            });

            return true;
        },
        async updateMatch(_, {
            data: { _id, event_id, match_name, player_p1, player_p2, serve_p1, serve_p2, point_p1, point_p2, set1_p1, set1_p2, set2_p1, set2_p2, set3_p1, set3_p2, live }
        }) {
            // console.log('resolver success')
            // ;
            const updatedMatch = {
                _id: _id,
                event_id: event_id,
                match_name: match_name,
                player_p1: player_p1,
                player_p2: player_p2,
                serve_p1: serve_p1,
                serve_p2: serve_p2,
                point_p1: point_p1,
                point_p2: point_p2,
                set1_p1: set1_p1,
                set1_p2: set1_p2,
                set2_p1: set2_p1,
                set2_p2: set2_p2,
                set3_p1: set3_p1,
                set3_p2: set3_p2,
                live: live
            }
            // console.log(updatedMatch)
            await Match.findOne({ _id: ObjectId(_id) }, function (err, match) {
                // console.log(match)
                if (!err) {
                    if (match) {
                        match.serve_p1 = serve_p1
                        match.serve_p2 = serve_p2
                        match.point_p1 = point_p1
                        match.point_p2 = point_p2
                        match.set1_p1 = set1_p1
                        match.set1_p2 = set1_p2
                        match.set2_p1 = set2_p1
                        match.set2_p2 = set2_p2
                        match.set3_p1 = set3_p1
                        match.set3_p2 = set3_p2
                        match.live = live
                        match.save()
                    }
                }

            });

            return true;
        },
        async deleteMatch(_, args) {
            await Match.deleteOne({ _id: ObjectId(args.data._id) }, function (err, match) {
                if (err)
                    console.log(err);
            });

            return true;
        },
    },
}