import { useEffect, useState, lazy, Suspense } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import "../Styles/ExpandedCoinCard.scss";

import { BsArrowUp, BsArrowDown } from "react-icons/bs";
import { FaFacebook, FaTwitter, FaReddit, FaGithub } from "react-icons/fa";
const Chart = lazy(() => import("./Chart"));

const ExpandedCoinCard = ({
  price,
  setExpanded,
  marketCap,
  rank,
  coinid,
  coin,
}) => {
  const dummy = 1;

  const converter = (str) => {
    const converted = str * 1;
    return converted.toLocaleString();
  };

  return (
    <div className="expanded-card">
      <div className="expanded-card-top">
        <div className="expanded-card-top-rank">
          <div className="expanded-card-top-rank__rank">Rank #{rank}</div>
        </div>
        {/* 1h Change % */}
        <div className="expanded-card-top-1h-change">
          <p
            className={
              dummy > 0
                ? "expanded-card-top-1h-change__total"
                : "expanded-card-top-1h-change__total--red"
            }
          >
            {dummy + "%"}
          </p>
          <p className="expanded-card-top-1h-change__text">1h</p>
        </div>
        <div className="expanded-card-top__divider" />
        {/* 24h Change % */}
        <div className="expanded-card-top-24h-change">
          <p
            className={
              dummy > 0
                ? "expanded-card-top-24h-change__total"
                : "expanded-card-top-24h-change__total--red"
            }
          >
            {dummy + "%"}
          </p>
          <p className="expanded-card-top-24h-change__text">24h</p>
        </div>
        <div className="expanded-card-top__divider" />
        {/* 7d Change % */}
        <div className="expanded-card-top-7d-change">
          <p
            className={
              dummy > 0
                ? "expanded-card-top-7d-change__total"
                : "expanded-card-top-7d-change__total--red"
            }
          >
            {dummy + "%"}
          </p>
          <p className="expanded-card-top-7d-change__text">7d</p>
        </div>
        <div className="expanded-card-top__divider" />
        {/* 14d Change % */}
        <div className="expanded-card-top-14d-change">
          <p
            className={
              dummy > 0
                ? "expanded-card-top-14d-change__total"
                : "expanded-card-top-14d-change__total--red"
            }
          >
            {dummy}
          </p>
          <p className="expanded-card-top-14d-change__text">14d</p>
        </div>
        <div
          id="fourteen-day__divider"
          className="expanded-card-top__divider"
        />
        {/* 30d Change % */}
        <div className="expanded-card-top-30d-change">
          <p
            className={
              dummy > 0
                ? "expanded-card-top-30d-change__total"
                : "expanded-card-top-30d-change__total--red"
            }
          >
            {dummy}
          </p>
          <p className="expanded-card-top-30d-change__text">30d</p>
        </div>
        <div className="expanded-card-top__divider" />
        {/* 60d Change % */}
        <div className="expanded-card-top-60d-change">
          <p
            className={
              dummy > 0
                ? "expanded-card-top-60d-change__total"
                : "expanded-card-top-60d-change__total--red"
            }
          >
            {dummy}
          </p>
          <p className="expanded-card-top-60d-change__text">60d</p>
        </div>
        <div id="sixty-day__divider" className="expanded-card-top__divider" />
        {/* 1y Change % */}
        <div className="expanded-card-top-1y-change">
          <p
            className={
              dummy > 0
                ? "expanded-card-top-1y-change__total"
                : "expanded-card-top-1y-change__total--red"
            }
          >
            {dummy}
          </p>
          <p className="expanded-card-top-60d-change__text">1y</p>
        </div>
      </div>

      {/* Price - small screens */}
      <div className="expanded-card-res-price-stats">
        <div className="expanded-card-res-price">
          <p className="expanded-card-res-price-stats-price__price">${price}</p>
          <Tippy
            placement="right"
            delay={300}
            theme="custom"
            content="24h Change"
          >
            <div
              className={`expanded-card-res-price-stats-price-change ${
                coin?.change && converter(coin?.change) > 0
                  ? ""
                  : "expanded-card-res-price-stats-price-change--red"
              }`}
            >
              {coin?.change && converter(coin?.change) > 0 ? (
                <BsArrowUp className="expanded-card-res-price-stats-price-change__arrow" />
              ) : (
                <BsArrowDown className="expanded-card-res-price-stats-price-change__arrow--red" />
              )}
              <div className="expanded-card-res-price-stats-price-change__amount">
                ${coin?.change && converter(coin?.change)}
              </div>
            </div>
          </Tippy>
        </div>
        <div className="expanded-card-res-price-stats__divider" />
        <div className="expanded-card-res-price-stats-mid">
          {/* Rank - visible at 400px width and below */}
          <div className="expanded-card-res-price-stats-mid__rank">
            Rank #{rank}
          </div>
          {/* Market Cap */}
          <div className="expanded-card-res-price-stats-mid-market-cap">
            <div className="expanded-card-res-price-stats-mid-market-cap__total">
              ${marketCap}
            </div>
            <p className="expanded-card-res-price-stats-mid-market-cap__text">
              Market Cap
            </p>
          </div>
          {/* 24h Volume */}
          <div className="expanded-card-res-price-stats-mid-24h-volume">
            <div className="expanded-card-res-price-stats-mid-24h-volume__total">
              ${converter(coin?.allTimeHigh?.price)}
            </div>
            <p className="expanded-card-res-price-stats-mid-24h-volume__text">
              All Time High
            </p>
          </div>
          {/* 24h High */}
          <div className="expanded-card-res-price-stats-mid-24h-high">
            <div className="expanded-card-res-price-stats-mid-24h-high__total">
              $
              {coin?.fullyDilutedMarketCap &&
                converter(coin?.fullyDilutedMarketCap)}
            </div>
            <p className="expanded-card-res-price-stats-mid-24h-high__text">
              24h High
            </p>
          </div>
          {/* 24h low */}
          <div className="expanded-card-res-price-stats-mid-24h-low">
            <div className="expanded-card-res-price-stats-mid-24h-low__total">
              ${dummy}
            </div>
            <p className="expanded-card-res-price-stats-mid-24h-low__text">
              24h Low
            </p>
          </div>
        </div>
      </div>

      {/* Price */}
      <div className="expanded-card-price-stats">
        <div className="expanded-card-price-stats-price">
          <p className="expanded-card-price-stats-price__price">${price}</p>
          <Tippy
            placement="right"
            delay={300}
            theme="custom"
            content="24h Change"
          >
            <div
              className={`expanded-card-price-stats-price-change ${
                coin?.change && converter(coin?.change) > 0
                  ? ""
                  : "expanded-card-price-stats-price-change--red"
              }`}
            >
              {coin?.change && converter(coin?.change) > 0 ? (
                <BsArrowUp className="expanded-card-price-stats-price-change__arrow" />
              ) : (
                <BsArrowDown className="expanded-card-price-stats-price-change__arrow--red" />
              )}
              <div className="expanded-card-price-stats-price-change__amount">
                ${coin?.change && converter(coin?.change)}
              </div>
            </div>
          </Tippy>
        </div>
        <div className="expanded-card-price-stats-side">
          {/* Market Cap */}
          <div className="expanded-card-price-stats-side-market-cap">
            <div className="expanded-card-price-stats-side-market-cap__total">
              ${marketCap}
            </div>
            <p className="expanded-card-price-stats-side-market-cap__text">
              Market Cap
            </p>
          </div>
          {/* 24h Volume */}
          <div className="expanded-card-price-stats-side-24h-volume">
            <div className="expanded-card-price-stats-side-24h-volume__total">
              ${converter(coin?.allTimeHigh?.price)}
            </div>
            <p className="expanded-card-price-stats-side-24h-volume__text">
              All Time High
            </p>
          </div>
          {/* 24h High */}
          <div className="expanded-card-price-stats-side-24h-high">
            <div className="expanded-card-price-stats-side-24h-high__total">
              $
              {coin?.fullyDilutedMarketCap &&
                converter(coin?.fullyDilutedMarketCap)}
            </div>
            <p className="expanded-card-price-stats-side-24h-high__text">
              Fully Diluted MC
            </p>
          </div>
          {/* 24h Low */}
          <div className="expanded-card-price-stats-side-24h-low">
            <div className="expanded-card-price-stats-side-24h-low__total">
              ${dummy}
            </div>
            <p className="expanded-card-price-stats-side-24h-low__text">
              24h Low
            </p>
          </div>
          {/* Hashing Algorithm */}
          <div className="expanded-card-price-stats-side-hashing">
            <div className="expanded-card-price-stats-side-hashing__total">
              {dummy}
            </div>
            <p className="expanded-card-price-stats-side-hashing__text">
              Hashing Algorithm
            </p>
          </div>
          {/* Trust Score*/}
          <div className="expanded-card-price-stats-side-trust">
            <div className="expanded-card-price-stats-side-trust__total">
              {dummy}
            </div>
            <p className="expanded-card-price-stats-side-trust__text">
              Trust Score
            </p>
          </div>
        </div>
        <div className="expanded-card-price-stats-icons">
          <FaFacebook className="expanded-card-price-stats-icons__icon" />
          <FaTwitter className="expanded-card-price-stats-icons__icon" />
          <FaReddit className="expanded-card-price-stats-icons__icon" />
          <FaGithub className="expanded-card-price-stats-icons__icon" />
        </div>
      </div>
      <div className="expanded-card-chart">
        <Suspense fallback={<div></div>}>
          <Chart coin={coin} setExpanded={setExpanded} coinid={coinid} />
        </Suspense>
      </div>
    </div>
  );
};

export default ExpandedCoinCard;
