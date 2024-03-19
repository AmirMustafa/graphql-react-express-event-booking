const bcrypt = require('bcryptjs');
const Event = require('../../models/event');
const User = require('../../models/user');

const events = async eventIds => {
    try {
        const events = await Event.find({ _id: { $in: eventIds } });
        return events.map(event => {
            return {
                ...event._doc,
                creator: user.bind(this, event._doc.creator)
            };
        });
    } catch (err) {
        throw err;
    }
}

const user = async userId => {
    try {
        const user = await User.findById(userId);
        return {
            ...user._doc,
            createdEvents: events.bind(this, user._doc.createdEvents)
        };
    } catch (err) {
        throw err;
    }
}

module.exports = {
    events: async () => {
        try {
            const events = await Event.find();
            return events.map(event => {
                return {
                    ...event._doc,
                    date: new Date(event._doc.date).toISOString(),
                    creator: user.bind(this, event._doc.creator)
                };
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
            creator: '65f9c73e7a2cba2618dafae8'
        });
        let createEvent;
        try {
            const result_1 = await event.save();
            createEvent = {
                ...result_1._doc,
                date: new Date(event._doc.date).toISOString(),
                creator: user.bind(this, result_1._doc.creator)
            };
            const creator = await User.findById('65f9c73e7a2cba2618dafae8');
            if (!creator) {
                throw new Error("User not found!");
            }

            creator.createdEvents.push(event);
            await creator.save();
            return createEvent;
        } catch (err) {
            console.log(err);
        }
    },
    createUser: async (args) => {
        try {
            const existingUser = await User.findOne({ email: args.userInput.email });
            if (existingUser) {
                throw new Error(`User exists already!`);
            }
            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
            const user = new User({
                email: args.userInput.email,
                password: hashedPassword
            });
            const result = await user.save();
            return { ...result._doc, id: result.id, password: null };
        } catch (err) {
            throw err;
        }


    }
};