import { useEffect, useState, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import DOMPurify from "dompurify";
import axios from "axios";

import "../Styles/ExpandedCoinCard.scss";

import { BsArrowUp, BsArrowDown } from "react-icons/bs";
import { TbWorld } from "react-icons/tb";

const Chart = lazy(() => import("./Chart"));

const ExpandedCoinCard = ({ price, setExpanded, marketCap, rank, coinid }) => {
  const [coin, setCoin] = useState({});

  const options = {
    method: "GET",
    url: `https://coinranking1.p.rapidapi.com/coin/${coinid}`,
    params: { referenceCurrencyUuid: "yhjMzLPhuIDl", timePeriod: "24h" },
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
    },
  };

  useEffect(() => {
    axios
      .request(options)
      .then(function (response) {
        setCoin(response?.data?.data?.coin);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

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
      </div>

      {/* Price - small screens */}
      <div className="expanded-card-res-price-stats">
        <div className="expanded-card-res-price">
          <p className="expanded-card-res-price-stats-price__price">${price}</p>
          <Tippy
            placement="right"
            delay={300}
            theme="custom"
            content="24h "
            Change
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
                {coin?.change ? converter(coin?.change) + "%" : "????"}
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
          {/* All Time High*/}
          <div className="expanded-card-res-price-stats-mid-24h-volume">
            <div className="expanded-card-res-price-stats-mid-24h-volume__total">
              {coin?.allTimeHigh?.price
                ? "$" + converter(coin?.allTimeHigh?.price)
                : "????"}
            </div>
            <p className="expanded-card-res-price-stats-mid-24h-volume__text">
              All Time High
            </p>
          </div>
          {/* Diluted MC */}
          <div className="expanded-card-res-price-stats-mid-24h-high">
            <div className="expanded-card-res-price-stats-mid-24h-high__total">
              {coin?.fullyDilutedMarketCap
                ? "$" + converter(coin?.fullyDilutedMarketCap)
                : "????"}
            </div>
            <p className="expanded-card-res-price-stats-mid-24h-high__text">
              Fully Diluted MC
            </p>
          </div>
          {/* 24h Volume */}
          <div className="expanded-card-res-price-stats-mid-24h-low">
            <div className="expanded-card-res-price-stats-mid-24h-low__total">
              {coin["24hVolume"] ? "$" + converter(coin["24hVolume"]) : "????"}
            </div>
            <p className="expanded-card-res-price-stats-mid-24h-low__text">
              24h Volume
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
                {coin?.change && converter(coin?.change)}%
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
          {/* All Time High */}
          <div className="expanded-card-price-stats-side-24h-volume">
            <div className="expanded-card-price-stats-side-24h-volume__total">
              {coin?.allTimeHigh?.price
                ? "$" + converter(coin?.allTimeHigh?.price)
                : "????"}
            </div>
            <p className="expanded-card-price-stats-side-24h-volume__text">
              All Time High
            </p>
          </div>
          {/* 24h High */}
          <div className="expanded-card-price-stats-side-24h-high">
            <div className="expanded-card-price-stats-side-24h-high__total">
              {coin?.fullyDilutedMarketCap
                ? "$" + converter(coin?.fullyDilutedMarketCap)
                : "????"}
            </div>
            <p className="expanded-card-price-stats-side-24h-high__text">
              Fully Diluted MC
            </p>
          </div>
          {/* 24h Volume */}
          <div className="expanded-card-price-stats-side-24h-low">
            <div className="expanded-card-price-stats-side-24h-low__total">
              {coin["24hVolume"] ? "$" + converter(coin["24hVolume"]) : "????"}
            </div>
            <p className="expanded-card-price-stats-side-24h-low__text">
              24h Volume
            </p>
          </div>
          {/* Tier */}
          <div className="expanded-card-price-stats-side-24h-low">
            <div className="expanded-card-price-stats-side-24h-low__total">
              {coin.tier ? coin.tier : "????"}
            </div>
            <p className="expanded-card-price-stats-side-24h-low__text">Tier</p>
          </div>
          {/* Desc */}
          <div className="expanded-card-price-stats-side-24h-low">
            <div className="expanded-card-price-stats-side-24h-low__total">
              <div>
                <Tippy
                  placement="right"
                  delay={100}
                  theme="custom"
                  interactive={true}
                  content={
                    <div>
                      <h3>About {coin.name}</h3>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(
                            coin.description ? coin.description : ""
                          ),
                        }}
                      ></p>
                    </div>
                  }
                >
                  <div className="about-info">i</div>
                </Tippy>
              </div>
            </div>
            <p className="expanded-card-price-stats-side-24h-low__text">
              About Coin
            </p>
          </div>
        </div>
        <div className="expanded-card-price-stats-icons">
          {coin?.links ? (
            <div className="expanded-card-price-stats-icons-con">
              <a href={coin?.links[0]?.url} target="_blank">
                <TbWorld className="expanded-card-price-stats-icons__icon" />
              </a>
              <a
                href={coin?.links[0]?.url}
                target="_blank"
                className="expanded-card-price-stats-icons__website"
              >
                Website
              </a>
            </div>
          ) : (
            <p className="expanded-card-price-stats-icons-qmark">????</p>
          )}
        </div>
      </div>
      <div className="expanded-card-chart">
        <Suspense fallback={<div></div>}>
          <Chart setExpanded={setExpanded} coinid={coinid} />
        </Suspense>
      </div>
    </div>
  );
};

export default ExpandedCoinCard;
