import React from "react";
import "./BookingList.css";

const bookingList = (props) => (
  <ul className="bookings__list">
    {props.bookings?.map((booking) => (
      <li key={booking._id} className="bookings__item">
        <div className="bookings__item-data">
          {booking?.event.title} -
          {new Date(booking?.createdAt).toLocaleDateString()}
        </div>
        <div className="booking__item-actions">
          <button
            className="btn"
            onClick={props.onDelete.bind(this, booking._id)}
          >
            Cancel Booking
          </button>
        </div>
      </li>
    ))}
  </ul>
);

export default bookingList;
