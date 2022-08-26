const CheckIn = require('../../models/checkin.model');
const ObjectId = require('mongodb').ObjectID;

module.exports = {
    Query: {
        async getCheckIn(_, { event_id }) {
            try {
                console.log('query being called')

                const checkinArray = await CheckIn.find({ event_id: ObjectId(event_id) });
                if (checkinArray) {
                    return checkinArray;
                }
                else {
                    throw new Error("No Checkin");
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        async addCheckIn(_, {
            data: { event_id, name, email }
        }) {
            console.log('being called')
            const newCheckIn = new CheckIn(
                {
                    event_id: ObjectId(event_id),
                    name: name,
                    email: email,
                    checkInTime: new Date(),
                }
            );
            try {
                await newCheckIn.save();
            } catch (err) {

                throw new Error(err);
            }
            return true;
        },
        async deleteCheckIn(_, args) {
            console.log(args);
            const _ids = args.data.map((_id) => ObjectId(_id));
            await CheckIn.deleteMany({ _id: { $in: _ids } }, (err, checkin) => {
                if (err) throw new Error(err);
            });
            return true;
        }
    }
}