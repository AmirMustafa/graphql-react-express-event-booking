const Dataloader = require("dataloader");

const Event = require("../../models/event");
const User = require("../../models/user");
const { dateToString } = require("../../helpers/date");

const eventLoader = new Dataloader((eventIDs) => {
  return events(eventIDs);
});

const transformEvent = (event) => {
  return {
    ...event?._doc,
    date: dateToString(event?._doc?.date),
    creator: user.bind(this, event?._doc?.creator),
  };
};

const transformBooking = (booking) => {
  return {
    ...booking._doc,
    user: user.bind(this, booking._doc.user),
    event: singleEvent.bind(this, booking._doc.event),
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt),
  };
};

// Below functions are basically for drilling i.e. getting collection details based on their id
const events = async (eventIds) => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    const eventsMap = {};
    events.forEach((event) => {
      eventsMap[event._id.toString()] = transformEvent(event);
    });
    return eventIds.map((eventId) => eventsMap[eventId.toString()]);
  } catch (err) {
    throw err;
  }
};

// const events = async (eventIds) => {
//   try {
//     const events = await Event.find({ _id: { $in: eventIds } });
//     return events.map((event) => {
//       return transformEvent(event);
//     });
//   } catch (err) {
//     throw err;
//   }
// };

const singleEvent = async (eventId) => {
  try {
    const event = await eventLoader.load(eventId);
    return event;
    // return transformEvent(event);
  } catch (err) {
    throw err;
  }
};

const user = async (userId) => {
  try {
    const user = await User.findById(userId);
    return {
      ...user?._doc,
      createdEvents: eventLoader.loadMany.bind(this, user?._doc.createdEvents),
      //   createdEvents: events.bind(this, user?._doc.createdEvents),
    };
  } catch (err) {
    throw err;
  }
};

exports.events = events;
exports.singleEvent = singleEvent;
exports.user = user;
exports.transformEvent = transformEvent;
exports.transformBooking = transformBooking;
