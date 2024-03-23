const Event = require('../../models/event');
const User = require('../../models/user');
const { dateToString } = require('../../helpers/date');

const { user } = require("./helper");

const transformEvent = event => {
    return {
        ...event._doc,
        date: dateToString(event._doc.date),
        creator: user.bind(this, event._doc.creator)
    };
}

module.exports = {
    events: async () => {
        try {
            const events = await Event.find();
            return events.map(event => {
                return transformEvent(event);
            });
        } catch (err) {
            throw err;
        }
    },
    createEvent: async (args) => {
        const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: new Date(args.eventInput.date),
            creator: '65fe26b8a230d1a9d2e32c41'
        });
        let createEvent;
        try {
            const result = await event.save();
            createEvent = transformEvent(result);
            const creator = await User.findById('65fe26b8a230d1a9d2e32c41');
            if (!creator) {
                throw new Error("User not found!");
            }

            creator.createdEvents.push(event);
            await creator.save();
            return createEvent;
        } catch (err) {
            console.log(err);
        }
    }
};