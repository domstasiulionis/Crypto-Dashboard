import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";

import "../Styles/Chart.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const Chart = ({ coin, update }) => {
  const [historicData, sethistoricData] = useState();
  const [days, setDays] = useState(1);

  const url = `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=gbp&days=${days}`;

  useEffect(() => {
    axios.get(url).then((res) => {
      sethistoricData(res?.data?.prices);
    });
  }, [days, update, url]);

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
        <Line
          data={{
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
          }}
        />
      )}
    </div>
  );
};

export default Chart;
