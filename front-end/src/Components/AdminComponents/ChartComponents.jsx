import React, { useEffect, useState, useRef } from "react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
} from "chart.js";
// import styles from "./ChartComponent.css";
// import { format } from "date-fns";
import styles from "./ChartComponent.css";
import { graphDataApi } from "../../apiCalls/adminApiCalls";

Chart.register(CategoryScale, LinearScale, BarController, BarElement);

const ChartComponent = () => {
  const [data, setData] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    const graphData = async () => {
      const res = await graphDataApi();
      setData(res);
      console.log(res);
      console.log(data);
    };
    graphData();
  }, []);

  useEffect(() => {
    const canvas = chartRef.current;
    const ctx = canvas.getContext("2d");

    // Extracting unique categories
    const categories = [
      ...new Set(data.map((item) => item.categoryId.category)),
    ];

    const datasets = categories.map((category) => {
      // Filtering data for each category
      const categoryData = data.filter(
        (item) => item.categoryId.category === category
      );

      return {
        label: category,
        data: categoryData.map((item) => item.sales),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(54, 162, 235, 0.4)",
        hoverBorderColor: "rgba(54, 162, 235, 1)",
        fill: false,
      };
    });
    let chartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels: categories,
        datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            title: {
              display: true,
              text: "Product Sales",
              font: {
                weight: "bold",
                size: 15,
                color: "#5E4955",
              },
            },
            ticks: {
              beginAtZero: true,
              font: {
                weight: "bold",
                size: 13,
              },
            },
          },
          x: {
            title: {
              display: true,
              text: "Product Category",
              font: {
                weight: "bold",
                size: 15,
              },
            },
            ticks: {
              beginAtZero: true,
              font: {
                weight: "bold",
                size: 13,
                color: "#5E4955",
              },
            },
          },
        },
        barThickness: 30,
      },
    });

    return () => {
      chartInstance.destroy();
    };
  }, [data]);

  return (
    <div
      className={styles.chartContainer}
      style={{
        maxWidth: "600px",
        maxHeight: "500px",
        height: "400px",
        minWidth: "350px",
        marginTop:"10rem",
        marginLeft:"-30rem"
      }}
    >
      <canvas ref={chartRef} className={styles.chartCanvas} />
    </div>
  );
};


export default ChartComponent;
