import React from "react";

const DashboardStatsCard = ({ info }) => {
  const { id, title, icon, value } = info;

  const borderColor = (id) => {
    if (id === 1) {
      return { borderLeft: "10px solid #50cd89" };
    } else if (id === 2) {
      return { borderLeft: "10px solid #f2cb0e" };
    } else if (id === 3) {
      return { borderLeft: "10px solid #f1416c" };
    } else {
      return { borderLeft: "10px solid #000" };
    }
  };

  return (
    <div className="dashboard-stat-card" style={borderColor(id)}>
      <div className="card-content-top">
        <h3>{title}</h3>
        {icon}
      </div>
      <div className="card-content-bot">
        <div className="card-content-value">{value}</div>
      </div>
    </div>
  );
};

export default DashboardStatsCard;
