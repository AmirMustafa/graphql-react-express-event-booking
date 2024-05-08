import React from "react";
import "./BookingsControls.css";

const bookingsControls = (props) => {
  return (
    <div className="bookings-control">
      <button
        className={props.activeOutputType === "list" ? "active" : ""}
        onClick={() => props.changeOutputHandler("list")}
      >
        List
      </button>
      <button
        className={props.activeOutputType === "chart" ? "active" : ""}
        onClick={() => props.changeOutputHandler("chart")}
      >
        Charts
      </button>
    </div>
  );
};

export default bookingsControls;
