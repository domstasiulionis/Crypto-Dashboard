import React from "react";

import "../Styles/Chart.scss";

const Chart = () => {
  return (
    <div className="chart">
      <div className="chart-btn-group">
        <button className="chart-btn-group__btn-change">1h</button>
        <button className="chart-btn-group__btn-change">24h</button>
        <button className="chart-btn-group__btn-change">7d</button>
      </div>
    </div>
  );
};

export default Chart;
