import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import "./RealTimeGraph.css";

const RealTimeGraph = ({ onDataUpdate, y }) => {
  const [data, setData] = useState([]);

  const maxDataPoints = 100; // Define the maximum number of data points to display, relative to time interval
  const updateInterval = 200; // Define how often the chart should update in milliseconds

  const updateData = () => {
    const x = new Date().getTime();
    setData((prevData) => {
      // Remove the oldest data point when maxDataPoints is reached
      const newData =
        prevData.length >= maxDataPoints ? prevData.slice(1) : prevData;
      return [...newData, { x, y }];
    });
    onDataUpdate(y);
  };

  useEffect(() => {
    const interval = setInterval(updateData, updateInterval);
    return () => clearInterval(interval);
  }, []);

  const chartOptions = {
    chart: {
      id: "realtime",
      type: "line",
      toolbar: {
        show: true,
      },
      animations: {
        enabled: false,
        easing: "linear",
      },
      zoom: {
        enabled: false,
      },
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      min: -1,
      max: 1,
      tickAmount: 8,
      labels: {
        formatter: function (value) {
          return value.toFixed(2);
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      padding: {
        left: 10, // Add this line
        right: 10, // Add this line
      },
    },
    responsive: [
      {
        breakpoint: 1921,
        options: {
          chart: {
            width: "190%", // Add this line
          },
        },
      },
      {
        breakpoint: 1200,
        options: {
          chart: {
            width: 700,
          },
        },
      },
      {
        breakpoint: 992,
        options: {
          chart: {
            width: 550,
          },
        },
      },
      {
        breakpoint: 768,
        options: {
          chart: {
            width: 450,
          },
        },
      },
      {
        breakpoint: 576,
        options: {
          chart: {
            width: 300,
          },
        },
      },
    ],
  };

  const series = [
    {
      name: "Real-time sine wave",
      data: data,
    },
  ];

  return (
    <div className="chart-wrapper">
      <Chart options={chartOptions} series={series} type="line" />
    </div>
  );
};

export default RealTimeGraph;
