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
const Chart = ({ coinid, setExpanded, ids }) => {
  const [historicData, sethistoricData] = useState();
  const [days, setDays] = useState("24h");
  const [activeBtn, setActiveBtn] = useState("24h");
  const [custom, setCustom] = useState("");

  const options = {
    method: "GET",
    url: `https://coinranking1.p.rapidapi.com/coin/${ids}/history`,
    params: { referenceCurrencyUuid: "yhjMzLPhuIDl", timePeriod: days },
    headers: {
      "X-RapidAPI-Key": "87a84376eamshe0fe6404a684850p19482cjsn9cb0e1926c47",
      "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
    },
  };

  useEffect(() => {
    axios
      .request(options)
      .then(function (response) {
        sethistoricData(response?.data?.data?.history.reverse());
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [days]);

  const changeTo24h = () => {
    setActiveBtn("24h");
    setDays("24h");
    setCustom("");
  };

  const changeTo7d = () => {
    setActiveBtn("7d");
    setDays("7d");
    setCustom("");
  };

  const changeTo30d = () => {
    setActiveBtn("30d");
    setDays("30d");
    setCustom("");
  };

  const changeTo60d = () => {
    setActiveBtn("60d");
    setDays("60d");
    setCustom("");
  };

  const changeTo1y = () => {
    setActiveBtn("1y");
    setDays("1y");
    setCustom("");
  };

  const changeToMax = () => {
    setActiveBtn("Max");
    setDays("1y");
    setCustom("");
  };

  const customInput = (e) => {
    if (e.target.value === "") {
      setDays("24h");
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
          id="chart-30d"
          onClick={changeTo30d}
          className={`chart-btn-group__btn-change ${
            activeBtn === "30d" ? "chart-btn-group__btn-change--active" : ""
          }`}
        >
          30d
        </button>
        <button
          onClick={changeTo60d}
          id="chart-60d"
          className={`chart-btn-group__btn-change ${
            activeBtn === "60d" ? "chart-btn-group__btn-change--active" : ""
          }`}
        >
          60d
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
                  label: `Price (USD)`,
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
