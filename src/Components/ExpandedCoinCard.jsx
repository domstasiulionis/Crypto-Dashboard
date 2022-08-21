import { lazy, Suspense } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import "../Styles/ExpandedCoinCard.scss";

import { BsArrowUp, BsArrowDown } from "react-icons/bs";
import { FaFacebook, FaTwitter, FaReddit, FaGithub } from "react-icons/fa";
const Chart = lazy(() => import("./Chart"));

const ExpandedCoinCard = ({
  coin,
  changePrice,
  price,
  change1h,
  change24h,
  change7d,
  setExpanded,
  marketCap,
  rank,
}) => {
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
              change1h > 0
                ? "expanded-card-top-1h-change__total"
                : "expanded-card-top-1h-change__total--red"
            }
          >
            {change1h + "%"}
          </p>
          <p className="expanded-card-top-1h-change__text">1h</p>
        </div>
        <div className="expanded-card-top__divider" />
        {/* 24h Change % */}
        <div className="expanded-card-top-24h-change">
          <p
            className={
              change24h > 0
                ? "expanded-card-top-24h-change__total"
                : "expanded-card-top-24h-change__total--red"
            }
          >
            {change24h + "%"}
          </p>
          <p className="expanded-card-top-24h-change__text">24h</p>
        </div>
        <div className="expanded-card-top__divider" />
        {/* 7d Change % */}
        <div className="expanded-card-top-7d-change">
          <p
            className={
              change7d > 0
                ? "expanded-card-top-7d-change__total"
                : "expanded-card-top-7d-change__total--red"
            }
          >
            {change7d + "%"}
          </p>
          <p className="expanded-card-top-7d-change__text">7d</p>
        </div>
        <div className="expanded-card-top__divider" />
        {/* 14d Change % */}
        <div className="expanded-card-top-14d-change">
          <p
            className={
              coin.market_data.price_change_percentage_14d > 0
                ? "expanded-card-top-14d-change__total"
                : "expanded-card-top-14d-change__total--red"
            }
          >
            {coin.market_data
              ? coin.market_data?.price_change_percentage_14d.toLocaleString() +
                "%"
              : null}
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
              coin.market_data?.price_change_percentage_30d > 0
                ? "expanded-card-top-30d-change__total"
                : "expanded-card-top-30d-change__total--red"
            }
          >
            {coin.market_data
              ? coin.market_data?.price_change_percentage_30d.toLocaleString() +
                "%"
              : null}
          </p>
          <p className="expanded-card-top-30d-change__text">30d</p>
        </div>
        <div id="thirty-day__divider" className="expanded-card-top__divider" />
        {/* 60d Change % */}
        <div className="expanded-card-top-60d-change">
          <p
            className={
              coin.market_data?.price_change_percentage_60d > 0
                ? "expanded-card-top-60d-change__total"
                : "expanded-card-top-60d-change__total--red"
            }
          >
            {coin.market_data
              ? coin.market_data?.price_change_percentage_60d.toLocaleString() +
                "%"
              : null}
          </p>
          <p className="expanded-card-top-60d-change__text">60d</p>
        </div>
        <div id="sixty-day__divider" className="expanded-card-top__divider" />
        {/* 1y Change % */}
        <div className="expanded-card-top-1y-change">
          <p
            className={
              coin.market_data?.price_change_percentage_1y > 0
                ? "expanded-card-top-1y-change__total"
                : "expanded-card-top-1y-change__total--red"
            }
          >
            {coin.market_data
              ? coin.market_data?.price_change_percentage_1y.toLocaleString() +
                "%"
              : null}
          </p>
          <p className="expanded-card-top-60d-change__text">1y</p>
        </div>
      </div>

      {/* Price - small screens */}
      <div className="expanded-card-res-price-stats">
        <div className="expanded-card-res-price">
          <p className="expanded-card-res-price-stats-price__price">£{price}</p>
          <Tippy
            placement="right"
            delay={300}
            theme="custom"
            content="24h Change"
          >
            <div
              className={`expanded-card-res-price-stats-price-change ${
                changePrice > 0
                  ? ""
                  : "expanded-card-res-price-stats-price-change--red"
              }`}
            >
              {changePrice > 0 ? (
                <BsArrowUp className="expanded-card-res-price-stats-price-change__arrow" />
              ) : (
                <BsArrowDown className="expanded-card-res-price-stats-price-change__arrow--red" />
              )}
              <div className="expanded-card-res-price-stats-price-change__amount">
                £{changePrice}
              </div>
            </div>
          </Tippy>
        </div>
        <div className="expanded-card-res-price-stats__divider" />
        <div className="expanded-card-res-price-stats-mid">
          {/* Market Cap */}
          <div className="expanded-card-res-price-stats-mid-market-cap">
            <div className="expanded-card-res-price-stats-mid-market-cap__total">
              £{marketCap}
            </div>
            <p className="expanded-card-res-price-stats-mid-market-cap__text">
              Market Cap
            </p>
          </div>
          {/* 24h Volume */}
          <div className="expanded-card-res-price-stats-mid-24h-volume">
            <div className="expanded-card-res-price-stats-mid-24h-volume__total">
              £
              {coin.market_data?.market_cap
                ? coin.market_data?.total_volume.gbp.toLocaleString()
                : null}
            </div>
            <p className="expanded-card-res-price-stats-mid-24h-volume__text">
              Volume (24h)
            </p>
          </div>
          {/* 24h High */}
          <div className="expanded-card-res-price-stats-mid-24h-high">
            <div className="expanded-card-res-price-stats-mid-24h-high__total">
              £
              {coin.market_data?.high_24h
                ? coin.market_data?.high_24h.gbp.toLocaleString()
                : null}
            </div>
            <p className="expanded-card-res-price-stats-mid-24h-high__text">
              24h High
            </p>
          </div>
          {/* 24h low */}
          <div className="expanded-card-res-price-stats-mid-24h-low">
            <div className="expanded-card-res-price-stats-mid-24h-low__total">
              £
              {coin.market_data?.low_24h
                ? coin.market_data?.low_24h.gbp.toLocaleString()
                : null}
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
          <p className="expanded-card-price-stats-price__price">£{price}</p>
          <Tippy
            placement="right"
            delay={300}
            theme="custom"
            content="24h Change"
          >
            <div
              className={`expanded-card-price-stats-price-change ${
                changePrice > 0
                  ? ""
                  : "expanded-card-price-stats-price-change--red"
              }`}
            >
              {changePrice > 0 ? (
                <BsArrowUp className="expanded-card-price-stats-price-change__arrow" />
              ) : (
                <BsArrowDown className="expanded-card-price-stats-price-change__arrow--red" />
              )}
              <div className="expanded-card-price-stats-price-change__amount">
                £{changePrice}
              </div>
            </div>
          </Tippy>
        </div>
        <div className="expanded-card-price-stats-side">
          {/* Market Cap */}
          <div className="expanded-card-price-stats-side-market-cap">
            <div className="expanded-card-price-stats-side-market-cap__total">
              £{marketCap}
            </div>
            <p className="expanded-card-price-stats-side-market-cap__text">
              Market Cap
            </p>
          </div>
          {/* 24h Volume */}
          <div className="expanded-card-price-stats-side-24h-volume">
            <div className="expanded-card-price-stats-side-24h-volume__total">
              £
              {coin.market_data?.market_cap
                ? coin.market_data?.total_volume.gbp.toLocaleString()
                : null}
            </div>
            <p className="expanded-card-price-stats-side-24h-volume__text">
              Volume (24h)
            </p>
          </div>
          {/* 24h High */}
          <div className="expanded-card-price-stats-side-24h-high">
            <div className="expanded-card-price-stats-side-24h-high__total">
              £
              {coin.market_data?.high_24h
                ? coin.market_data?.high_24h.gbp.toLocaleString()
                : null}
            </div>
            <p className="expanded-card-price-stats-side-24h-high__text">
              24h High
            </p>
          </div>
          {/* 24h Low */}
          <div className="expanded-card-price-stats-side-24h-low">
            <div className="expanded-card-price-stats-side-24h-low__total">
              £
              {coin.market_data?.low_24h
                ? coin.market_data?.low_24h.gbp.toLocaleString()
                : null}
            </div>
            <p className="expanded-card-price-stats-side-24h-low__text">
              24h Low
            </p>
          </div>
          {/* Hashing Algorithm */}
          <div className="expanded-card-price-stats-side-hashing">
            <div className="expanded-card-price-stats-side-hashing__total">
              {coin.hashing_algorithm ? coin.hashing_algorithm : "-"}
            </div>
            <p className="expanded-card-price-stats-side-hashing__text">
              Hashing Algorithm
            </p>
          </div>
          {/* Trust Score*/}
          <div className="expanded-card-price-stats-side-trust">
            <div className="expanded-card-price-stats-side-trust__total">
              {coin.tickers ? coin.liquidity_score.toFixed() : "-"}
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
          <Chart coin={coin} change24h={change24h} setExpanded={setExpanded} />
        </Suspense>
      </div>
    </div>
  );
};

export default ExpandedCoinCard;
