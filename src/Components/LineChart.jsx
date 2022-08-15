import { useState, useEffect } from "react";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
} from "chart.js";

import "../Styles/Chart.scss";

ChartJS.register(LineElement, PointElement, LinearScale, Title);

const Chart = ({ coin, update }) => {
  const [historicData, sethistoricData] = useState();
  const [days, setDays] = useState(1);
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  const url = `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=gbp&days=${days}`;

  useEffect(() => {
    const fetchSamplings = async () => {
      const res = await fetch(url);
      const data = await res.json();

      setChartData({
        labels: historicData?.map((coin) => {
          let date = new Date(coin[0]);
          let time =
            date.getHours() > 12
              ? `${date.getHours() - 12}:${date.getMinutes()} PM`
              : `${date.getHours()}:${date.getMinutes()} AM`;

          return days === 1 ? time : date.toLocaleString();
        }),
        dataset: [
          {
            data: historicData?.map((coin) => coin[1]),
          },
        ],
      });
    };
    fetchSamplings();
  }, [days, url, historicData]);

  {
    console.log("data: " + historicData);
  }

  return (
    <div className="chart">
      <div className="chart-btn-group">
        <button className="chart-btn-group__btn-change">1h</button>
        <button className="chart-btn-group__btn-change">24h</button>
        <button className="chart-btn-group__btn-change">7d</button>
      </div>
      {!historicData ? (
        <div>nothin here m8</div>
      ) : (
        <Line data={{ chartData }} />
      )}
    </div>
  );
};

export default Chart;
