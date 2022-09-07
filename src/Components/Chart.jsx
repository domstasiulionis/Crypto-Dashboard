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
const Chart = ({ coinid, setExpanded }) => {
  const [historicData, sethistoricData] = useState();
  const [change, setChange] = useState();
  const [days, setDays] = useState("24h");
  const [activeBtn, setActiveBtn] = useState("24h");

  const options = {
    method: "GET",
    url: `https://coinranking1.p.rapidapi.com/coin/${coinid}/history`,
    params: { referenceCurrencyUuid: "yhjMzLPhuIDl", timePeriod: days },
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
    },
  };

  useEffect(() => {
    axios
      .request(options)
      .then(function (response) {
        sethistoricData(response?.data?.data?.history.reverse());
        setChange(response?.data?.data?.change);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [days]);

  const changeTo24h = () => {
    setActiveBtn("24h");
    setDays("24h");
  };

  const changeTo7d = () => {
    setActiveBtn("7d");
    setDays("7d");
  };

  const changeTo30d = () => {
    setActiveBtn("30d");
    setDays("30d");
  };

  const changeTo3m = () => {
    setActiveBtn("3m");
    setDays("3m");
  };

  const changeTo1y = () => {
    setActiveBtn("1y");
    setDays("1y");
  };

  const changeTo5y = () => {
    setActiveBtn("5y");
    setDays("5y");
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
          id="chart-30d"
          onClick={changeTo30d}
          className={`chart-btn-group__btn-change ${
            activeBtn === "30d" ? "chart-btn-group__btn-change--active" : ""
          }`}
        >
          30d
        </button>
        <button
          onClick={changeTo3m}
          id="chart-3m"
          className={`chart-btn-group__btn-change ${
            activeBtn === "3m" ? "chart-btn-group__btn-change--active" : ""
          }`}
        >
          3m
        </button>
        <button
          id="chart-1y"
          onClick={changeTo1y}
          className={`chart-btn-group__btn-change ${
            activeBtn === "1y" ? "chart-btn-group__btn-change--active" : ""
          }`}
        >
          1y
        </button>
        <button
          onClick={changeTo5y}
          className={`chart-btn-group__btn-change ${
            activeBtn === "5y" ? "chart-btn-group__btn-change--active" : ""
          }`}
        >
          5y
        </button>
        <div className="chart-btn-group-change">
          <p
            className={
              change > 0
                ? "chart-btn-group-change__value"
                : "chart-btn-group-change__value--red"
            }
          >
            {change ? (
              change > 0 ? (
                "+" + change + "%"
              ) : (
                change + "%"
              )
            ) : (
              <p>???????</p>
            )}
          </p>
        </div>
      </div>

      <div className="line-chart">
        <canvas id="myChart"></canvas>
        {!historicData ? (
          <div>
            <DotsLoader setExpanded={setExpanded} />
          </div>
        ) : (
          <Line
            data={{
              labels: historicData.map((coin) => {
                let date = new Date(coin?.timestamp * 1000);
                return date.toLocaleDateString();
              }),

              datasets: [
                {
                  data: historicData.map((coin) => coin?.price),
                  label: `Price ($)`,
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
