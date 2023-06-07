import React, { useEffect, useState, useRef } from "react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
} from "chart.js";
import { getChartData } from "../../apiCalls/adminApiCalls";

Chart.register(CategoryScale, LinearScale, BarController, BarElement);

const ChartComponent = () => {
  const chartRef = useRef(null);
  const [data, setData] = useState([]);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getChartData();
        setData(res.data);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length === 0) return;

    if (chartInstance) {
      chartInstance.destroy(); // Destroy the previous chart instance
    }

    const ctx = chartRef.current.getContext("2d");
    const newChartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels: data.map((item) => item.category),
        datasets: [
          {
            label: "Sales",
            data: data.map((item) => item.sales),
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: "category",
            offset: true,
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    setChartInstance(newChartInstance);
  }, [data]);

  return (
    <div>
      <h2>Category Data</h2>

      <canvas ref={chartRef} />
    </div>
  );
};

export default ChartComponent;
