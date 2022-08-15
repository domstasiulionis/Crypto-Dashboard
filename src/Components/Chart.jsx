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

import DotsLoader from "./DotsLoader";

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
const Chart = ({ coin }) => {
  const [historicData, sethistoricData] = useState();
  const [days, setDays] = useState(1);
  const [activeBtn, setActiveBtn] = useState("24h");

  const url = `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=gbp&days=${days}`;

  const changeTo24h = () => {
    setActiveBtn("24h");
    setDays(1);
  };

  const changeTo7d = () => {
    setActiveBtn("7d");
    setDays(7);
  };

  const changeTo30d = () => {
    setActiveBtn("30d");
    setDays(30);
  };

  const changeTo60d = () => {
    setActiveBtn("60d");
    setDays(60);
  };

  const changeTo1y = () => {
    setActiveBtn("1y");
    setDays(365);
  };

  useEffect(() => {
    axios.get(url).then((res) => {
      sethistoricData(res?.data?.prices);
    });
  }, [days, url]);

  return (
    <div className="chart">
      <div className="chart-btn-group">
        <button
          onClick={changeTo24h}
          className={`chart-btn-group__btn-change ${
            activeBtn === "24h" ? "chart-btn-group__btn-change--active" : ""
          }`}
        >
          24h
        </button>
        <button
          onClick={changeTo7d}
          className={`chart-btn-group__btn-change ${
            activeBtn === "7d" ? "chart-btn-group__btn-change--active" : ""
          }`}
        >
          7d
        </button>
        <button
          onClick={changeTo30d}
          className={`chart-btn-group__btn-change ${
            activeBtn === "30d" ? "chart-btn-group__btn-change--active" : ""
          }`}
        >
          30d
        </button>
        <button
          onClick={changeTo60d}
          className={`chart-btn-group__btn-change ${
            activeBtn === "60d" ? "chart-btn-group__btn-change--active" : ""
          }`}
        >
          60d
        </button>
        <button
          onClick={changeTo1y}
          className={`chart-btn-group__btn-change ${
            activeBtn === "1y" ? "chart-btn-group__btn-change--active" : ""
          }`}
        >
          1y
        </button>
      </div>

      <div className="line-chart">
        <canvas id="myChart"></canvas>

        {!historicData ? (
          <div>
            <DotsLoader />
          </div>
        ) : (
          <Line
            data={{
              labels: historicData.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),

              datasets: [
                {
                  data: historicData.map((coin) => coin[1]),
                  label: `Price (GBP)`,
                  borderColor: "#c593ee",
                },
              ],
            }}
            options={{
              plugins: {
                legend: {
                  display: false,
                },
              },
              responsive: true,
              maintainAspectRatio: false,
              elements: {
                point: {
                  radius: 2,
                },
              },
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Chart;
