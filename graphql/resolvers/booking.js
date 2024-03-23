const Event = require('../../models/event');
const Booking = require('../../models/booking');
const { dateToString } = require('../../helpers/date');

const { user, singleEvent } = require("./helper");

const transformEvent = event => {
    return {
        ...event._doc,
        date: dateToString(event._doc.date),
        creator: user.bind(this, event._doc.creator)
    };
}

const transformBooking = booking => {
    return {
        ...booking._doc,
        user: user.bind(this, booking._doc.user),
        event: singleEvent.bind(this, booking._doc.event),
        createdAt: dateToString(booking._doc.createdAt),
        updatedAt: dateToString(booking._doc.updatedAt)
    }
}

module.exports = {
    bookings: async () => {
        try {
            const bookings = await Booking.find();

            return bookings.map(booking => {
                return transformBooking(booking);
            });
        } catch (err) {
            throw err;
        }
    },
    bookEvent: async (args) => {
        try {
            const fetchedEvent = await Event.findOne({ _id: args.eventId });
            const booking = new Booking({
                user: '65fe26b8a230d1a9d2e32c41',
                event: fetchedEvent
            });
            const result = await booking.save();

            return transformBooking(result);
        } catch (err) {
            throw err;
        }
    },
    cancelBooking: async (args) => {
        try {
            const booking = await Booking.findById(args.bookingId).populate('event');
            const event = transformEvent(booking.event);
            await Booking.deleteOne({ _id: args.bookingId });
            return event;
        } catch (err) {
            throw err;
        }
    }
};