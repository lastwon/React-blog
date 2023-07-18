import React from "react";

const DashboardStatsCard = ({ info }) => {
  const { id, title, icon, value } = info;
  return (
    <div className="dashboard-stat-card">
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
