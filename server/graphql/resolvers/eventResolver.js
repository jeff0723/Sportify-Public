const Event = require('../../models/event.model');
const Host = require('../../models/host.model');
const ObjectId = require('mongodb').ObjectID;
const path = require('path');
const { v4: uuid } = require('uuid');
const s3 = require('../../s3');

module.exports = {
    Query: {
        async getEvents() {
            try {
                return await Event.find({ release: true }).exec();
            } catch (err) {
                throw new Error(err);
            }
        },
        async getEventsBySport(_,{sportType}){
            try {
                const event = await Event.find({ release: true ,sportType: sportType }).exec();
                if (event) {
                    return event;
                } else {
                    throw new Error("Event not found");
                }
            } catch (err) {
                throw new Error(err);
            }
        },
        async getEvent(_, { eventId }) {
            try {
                const event = await Event.findOne({ _id: ObjectId(eventId) });
                if (event) {
                    return event;
                } else {
                    throw new Error("Event not found");
                }
            } catch (err) {
                throw new Error(err);
            }
        },
        async hostEvents(parent, args) {
            return await Event.find({ host_id: ObjectId(args.host_id) });
        },
        async getEventHost(_, { event_id }) {
            try {
                const event = await Event.findOne({ _id: ObjectId(event_id) });
                const host = await Host.findOne({ _id: event.host_id });
                if (host) {
                    return host;
                } else {
                    throw new Error("Host not found");
                }
            } catch (err) {
                throw new Error(err);
            }
        },
    },
    Mutation: {
        async newEvent(parent, args, { EventDB }, info) {
            const newEvent = new Event({
                host_id: ObjectId(args.data.host_id),
                title: args.data.title,
                public: args.data.public,
                release: args.data.release,
                // matches:0,
            });
            await
                newEvent.save();

            return true;
        },
        async editEvent(parent, args, { EventDB }, info) {
            await Event.findOne({ _id: ObjectId(args.data._id) }, function (err, event) {
                if (!err) {
                    if (event) {
                        event.title = args.data.title;
                        event.date = args.data.date;
                        event.dateEnd = args.data.dateEnd;
                        event.location = args.data.location;
                        event.highlight = args.data.highlight;
                        event.fee = args.data.fee;
                        event.sportType = args.data.sportType;
                        event.region = args.data.region;
                        event.country = args.data.country;
                        event.city = args.data.city;
                        event.save();
                    }
                }
            });

            return true;
        },
        async releaseEvent(parent, args, { EventDB }, info) {
            await Event.findOne({ _id: ObjectId(args.data._id) }, function (err, event) {
                if (!err) {
                    if (event) {
                        event.release = args.data.release;
                        event.save();
                    }
                }
            });

            return true;
        },
        async saveRichEditor(parent, args, { EventDB }, info) {
            await Event.findOne({ _id: ObjectId(args.data._id) }, function (err, event) {
                if (!err) {
                    if (event) {
                        if (args.data.description !== undefined)
                            event.description = args.data.description;
                        if (args.data.registrationInfo !== undefined)
                            event.registrationInfo = args.data.registrationInfo;
                        if (args.data.trafficInfo !== undefined)
                            event.trafficInfo = args.data.trafficInfo;
                        if (args.data.prize !== undefined)
                            event.prize = args.data.prize;
                        event.save();
                    }
                }
            });

            return true;
        },
        async editEventForm(_, args) {
            await Event.findOne({ _id: ObjectId(args.data._id) }, function (err, event) {
                if (!err && event) {
                    event.form.description = args.data.description;
                    event.form.blocks = args.data.blocks ? args.data.blocks : undefined;
                    event.save();
                } else {
                    return false;
                }
            });

            return true;
        },
        singleUploadImg: async (parent, args) => {
            const file = await args.data.file
            if (file === null)
                return args.data.originalFile;

            const { filename, mimetype, createReadStream } = file;

            if (args.data.originalFile !== "") {
                const index = args.data.originalFile.lastIndexOf("/") + 1;
                const originalFileName = args.data.originalFile.substring(index);

                var params = {
                    Bucket: process.env.AWS_BUCKET,
                    Key: originalFileName
                };

                s3.deleteObject(params, function (err, data) {
                    if (err) console.log(err, err.stack);  // error
                    else return;                 // deleted
                });
            }

            const { Location } = await s3.upload({
                Bucket: process.env.AWS_BUCKET,
                Body: createReadStream(),
                Key: `${uuid()}${path.extname(filename)}`,
                ContentType: mimetype
            }).promise();

            await Event.findOne({ _id: ObjectId(args.data.eventId) }, function (err, event) {
                if (!err) {
                    if (event) {
                        event.imgURL = Location;
                        event.save();
                    }
                }
            });

            return Location;
        },
        singleUploadFile: async (parent, args) => {
            var drawURL = "";
            var scheduleURL = "";

            if (args.data[0]) {
                const drawFile = await args.data[0].file
                const { filename, mimetype, createReadStream } = drawFile;

                if (args.data[0].originalFile !== "") {
                    const index = args.data[0].originalFile.lastIndexOf("/") + 1;
                    const originalFileName = args.data[0].originalFile.substring(index);

                    var params = {
                        Bucket: process.env.AWS_BUCKET,
                        Key: originalFileName
                    };

                    s3.deleteObject(params, function (err, data) {
                        if (err) console.log(err, err.stack);  // error
                        else return;                 // deleted
                    });
                }

                const { Location } = await s3.upload({
                    Bucket: process.env.AWS_BUCKET,
                    Body: createReadStream(),
                    Key: `${uuid()}${path.extname(filename)}`,
                    ContentType: mimetype
                }).promise();


                await Event.findOne({ _id: ObjectId(args.data[0].eventId) }, function (err, event) {
                    if (!err) {
                        if (event) {
                            event.drawURL = Location;
                            event.save();
                        }
                    }
                });
            }

            if (args.data[1]) {
                const scheduleFile = await args.data[1].file
                const { filename, mimetype, createReadStream } = scheduleFile;

                if (args.data[1].originalFile !== "") {
                    const index = args.data[1].originalFile.lastIndexOf("/") + 1;
                    const originalFileName = args.data[1].originalFile.substring(index);

                    var params = {
                        Bucket: process.env.AWS_BUCKET,
                        Key: originalFileName
                    };

                    s3.deleteObject(params, function (err, data) {
                        if (err) console.log(err, err.stack);  // error
                        else return;                 // deleted
                    });
                }

                const { Location } = await s3.upload({
                    Bucket: process.env.AWS_BUCKET,
                    Body: createReadStream(),
                    Key: `${uuid()}${path.extname(filename)}`,
                    ContentType: mimetype
                }).promise();

                await Event.findOne({ _id: ObjectId(args.data[1].eventId) }, function (err, event) {
                    if (!err) {
                        if (event) {
                            event.scheduleURL = Location;
                            event.save();
                        }
                    }
                });
            }

            return [drawURL, scheduleURL];
        }
    }
}