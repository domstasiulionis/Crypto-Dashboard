import React from "react";

import { BsArrowUp, BsArrowDown } from "react-icons/bs";
import { FaFacebook, FaTwitter, FaReddit, FaGithub } from "react-icons/fa";

import "../Styles/ExpandedCoinCard.scss";

const ExpandedCoinCard = ({ coin, changePrice, price }) => {
  return (
    <div className="expanded-card">
      {/* Price */}
      <div className="expanded-card-price">
        <p className="expanded-card-price__price">{"£" + price}</p>
        <div
          className={`expanded-card-price-change ${
            changePrice > 0 ? "" : "expanded-card-price-change--red"
          }`}
        >
          {changePrice > 0 ? (
            <BsArrowUp className="expanded-card-price-change__arrow" />
          ) : (
            <BsArrowDown className="expanded-card-price-change__arrow--red" />
          )}
          <div className="expanded-card-price-change__amount">
            £{changePrice}
          </div>
        </div>
      </div>
      <div className="expanded-card-side">
        {/* Market Cap */}
        <div className="expanded-card-side-market-cap">
          <div className="expanded-card-side-market-cap__total">
            £
            {coin.market_data?.market_cap
              ? coin.market_data?.market_cap.gbp.toLocaleString()
              : null}
          </div>
          <p className="expanded-card-side-market-cap__text">Market Cap</p>
        </div>
        {/* 24h Volume */}
        <div className="expanded-card-side-24h-volume">
          <div className="expanded-card-side-24h-volume__total">
            £
            {coin.market_data?.market_cap
              ? coin.market_data?.total_volume.gbp.toLocaleString()
              : null}
          </div>
          <p className="expanded-card-side-24h-volume__text">Volume (24h)</p>
        </div>
        {/* 24h High */}
        <div className="expanded-card-side-24h-high">
          <div className="expanded-card-side-24h-high__total">
            £
            {coin.market_data?.high_24h
              ? coin.market_data?.high_24h.gbp.toLocaleString()
              : null}
          </div>
          <p className="expanded-card-side-24h-high__text">24h High</p>
        </div>
        {/* 24h High */}
        <div className="expanded-card-side-24h-low">
          <div className="expanded-card-side-24h-low__total">
            £
            {coin.market_data?.low_24h
              ? coin.market_data?.low_24h.gbp.toLocaleString()
              : null}
          </div>
          <p className="expanded-card-side-24h-low__text">24h Low</p>
        </div>
        {/* Hashing Algorithm */}
        <div className="expanded-card-side-hashing">
          <div className="expanded-card-side-hashing__total">
            {coin.hashing_algorithm ? coin.hashing_algorithm : null}
          </div>
          <p className="expanded-card-side-hashing__text">Hashing Algorithm</p>
        </div>
        {/* Trust Score*/}
        <div className="expanded-card-side-trust">
          <div className="expanded-card-side-trust__total">
            {coin.tickers ? coin.liquidity_score.toFixed() : null}
          </div>
          <p className="expanded-card-side-trust__text">Trust Score</p>
        </div>
      </div>
      <div className="expanded-card-icons">
        <FaFacebook className="expanded-card-icons__icon" />
        <FaTwitter className="expanded-card-icons__icon" />
        <FaReddit className="expanded-card-icons__icon" />
        <FaGithub className="expanded-card-icons__icon" />
      </div>
    </div>
  );
};

export default ExpandedCoinCard;
