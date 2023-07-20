import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

const MonthlyPostChart = ({ userNickname }) => {
  const [monthlyPostData, setMonthlyPostData] = useState([]);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  useEffect(() => {
    const fetchMonthlyPostData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/posts/user/${userNickname}/monthly`
        );
        setMonthlyPostData(response.data);
      } catch (error) {
        console.error("Error fetching monthly post data", error);
      }
    };

    fetchMonthlyPostData();
  }, [userNickname]);

  const chartData = {
    labels: monthlyPostData.map((monthData) => monthNames[monthData.month - 1]),
    datasets: [
      {
        label: "Accepted",
        data: monthlyPostData.map((monthData) => monthData.acceptedCount),
        backgroundColor: "#adfa1d",
        borderColor: "#adfa1d",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          color: "#989898",
        },
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#989898",
        },
      },
    },
  };

  return (
    <div className="dashboard-chart">
      <h3>Overview</h3>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default MonthlyPostChart;
