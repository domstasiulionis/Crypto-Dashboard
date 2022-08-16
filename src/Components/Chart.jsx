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
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ErrorFallback";
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
const Chart = ({ coin, setExpanded }) => {
  const [historicData, sethistoricData] = useState();
  const [days, setDays] = useState(1);
  const [activeBtn, setActiveBtn] = useState("24h");
  const [custom, setCustom] = useState();

  const url = `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=gbp&days=${days}`;

  useEffect(() => {
    axios.get(url).then((res) => {
      sethistoricData(res?.data?.prices);
    });
  }, [days, url]);

  const changeTo24h = () => {
    setActiveBtn("24h");
    setDays(1);
    setCustom("");
  };

  const changeTo7d = () => {
    setActiveBtn("7d");
    setDays(7);
    setCustom("");
  };

  const changeTo30d = () => {
    setActiveBtn("30d");
    setDays(30);
    setCustom("");
  };

  const changeTo60d = () => {
    setActiveBtn("60d");
    setDays(60);
    setCustom("");
  };

  const changeTo1y = () => {
    setActiveBtn("1y");
    setDays(365);
    setCustom("");
  };

  const changeToMax = () => {
    setActiveBtn("Max");
    setDays(10000);
    setCustom("");
  };

  const customInput = (e) => {
    if (e.target.value === "") {
      setDays(1);
      setActiveBtn("24h");
      setCustom();
    } else {
      setActiveBtn();
      setDays(e.target.value);
      setCustom(e.target.value);
    }
  };

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
        <button
          onClick={changeToMax}
          className={`chart-btn-group__btn-change-max ${
            activeBtn === "Max" ? "chart-btn-group__btn-change-max--active" : ""
          }`}
        >
          Max
        </button>
        <input
          onChange={customInput}
          type="number"
          placeholder="Custom (days)"
          value={custom}
          min="1"
          max="10000"
        />
      </div>

      <div className="line-chart">
        <canvas id="myChart"></canvas>
        {!historicData ? (
          <div>
            <DotsLoader />
          </div>
        ) : (
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={() => console.log("error!")}
          >
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
          </ErrorBoundary>
        )}
      </div>
    </div>
  );
};

export default Chart;
