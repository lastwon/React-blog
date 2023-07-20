import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

const CategoryStats = ({ userPosts }) => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  // Calculate category statistics
  const categoryStats = userPosts.reduce((stats, post) => {
    const { category } = post;
    stats[category] = (stats[category] || 0) + 1;
    return stats;
  }, {});

  // Prepare data for the pie chart
  const labels = Object.keys(categoryStats);
  const data = Object.values(categoryStats);

  // Calculate total count
  const totalCount = data.reduce((total, count) => total + count, 0);

  // Calculate percentages
  const percentages = data.map(
    (count) => ((count / totalCount) * 100).toFixed(2) + "%"
  );

  // Pie chart configuration
  const chartData = {
    labels: labels.map((label, index) => `${label} (${percentages[index]})`),
    datasets: [
      {
        data: data,
        backgroundColor: [
          "#adfa1d",
          "#000",
          "#f2cb0e",
          "#56cf8e",
          "#f1416c",
          "#fff8dd",
          "#e5e7eb",
          "#4b7bec",
          "#ff6b6b",
          "#8338ec",
          "#3b3b98",
          "#a55eea",
        ],
      },
    ],
  };

  return (
    <div className="dashboard-category-stats">
      <h3>Category Statistics</h3>
      <div className="category-chart">
        <Pie data={chartData} />
      </div>
    </div>
  );
};

export default CategoryStats;
