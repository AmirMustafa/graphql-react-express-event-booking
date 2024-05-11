import React, { useEffect, useRef } from "react";
import Chart from "chart.js";
import "./BookingsChart.css";

const BOOKINGS_BUCKETS = {
  Cheap: {
    min: 0,
    max: 100,
  },
  Normal: {
    min: 100,
    max: 200,
  },
  Expensive: {
    min: 200,
    max: 10000000,
  },
};

const BookingsChart = (props) => {
  const chartRef = useRef(null); // Create a ref for the chart canvas element

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    const chartData = {
      labels: [],
      datasets: [],
    };

    let values = [];

    for (const bucket in BOOKINGS_BUCKETS) {
      const filteredBookingsCount = props.bookings.reduce((prev, current) => {
        if (
          current.event.price > BOOKINGS_BUCKETS[bucket]?.min &&
          current.event.price < BOOKINGS_BUCKETS[bucket]?.max
        ) {
          return prev + 1;
        } else {
          return prev;
        }
      }, 0);

      values.push(filteredBookingsCount);

      chartData.labels.push(bucket);
      chartData.datasets.push({
        // label: bucket,
        fillColor: "rgba(220,220,220,0.5)",
        strokeColor: "rgba(220,220,220,0.8)",
        highlightFill: "rgba(220,220,220,0.75)",
        highlightStroke: "rgba(220,220,220,1)",
        data: values,
      });

      values = [...values];
      values[values.length - 1] = 0;
    }

    new Chart(ctx).Bar(chartData); // Create a new Bar chart using Chart.js version 1.x
  }, [props.bookings]);

  return (
    <div className="chart_div">
      <canvas ref={chartRef} />
    </div>
  );
};

export default BookingsChart;
