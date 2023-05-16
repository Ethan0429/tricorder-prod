import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import "./RealTimeGraph.css";

const RealTimeGraph = ({
  y,
  onDataUpdate,
}: {
  y: number;
  onDataUpdate: (y: number) => void;
}) => {
  const [data, setData] = useState<{ x: number; y: number }[]>([]);

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
  }, [y]);

  const chartOptions = {
    chart: {
      id: "realtime",
      type: "line" as const,
      toolbar: {
        show: true,
      },
      animations: {
        enabled: false,
        easing: "linear" as const,
      },
      zoom: {
        enabled: false,
      },
    },
    xaxis: {
      type: "datetime" as const,
    },
    yaxis: {
      min: 0,
      max: 100,
      tickAmount: 8,
      labels: {
        formatter: function (value: number) {
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
      <Chart options={chartOptions} series={series} />
    </div>
  );
};

export default RealTimeGraph;
