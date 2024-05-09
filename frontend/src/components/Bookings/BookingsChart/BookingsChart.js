import React from "react";
import "./BookingsChart.css";

const BOOKINGS_BUCKETS = {
  Cheap: 100,
  Normal: 200,
  Expensive: 10000000000,
};

const bookingsChart = (props) => {
  const output = {};
  for (const bucket in BOOKINGS_BUCKETS) {
    const filteredBookingsCount = props.bookings.reduce((prev, current) => {
      if (current.event.price < BOOKINGS_BUCKETS[bucket]) {
        return prev + 1;
      } else {
        return prev;
      }
    }, 0);

    output[bucket] = filteredBookingsCount;
    console.log("output ===> ", output);
  }
  return <p>The Chart</p>;
};

export default bookingsChart;
