const { Router } = require('express');
const Event = require('../../models/event.model');

const router = Router();

// 取出要提供的properties
let extractEvent = function ({ title, date, dateEnd, location, region, sportType, description, imgURL }) {
    return { title, date, dateEnd, location, region, sportType, description, imgURL };
};

router.get('/events', async function (req, res) {
    try {
        let sportTypeQuery = req.query.sportType;
        let events = null;
        if (sportTypeQuery) {
            // Get events from database by sportType
            events = await Event.find({ sportType: sportTypeQuery });
        } else {
            // Get events from database
            events = await Event.find();
        }
        // Extract properties
        const eventsExtracted = events.map(event => { return extractEvent(event); });
        // Return json
        res.json(eventsExtracted);
    } catch (err) {
        console.log(err);
        res.json({ "error": "Failed to retrieve data." })
    }
});

module.exports = router;