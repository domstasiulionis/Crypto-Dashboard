import React from "react";
import coin from "../Assets/bitcoin.png";
import { BiChevronLeft } from "react-icons/bi";
import { BsArrowUp } from "react-icons/bs";

import "../Styles/CoinCard.scss";

const CoinCard = () => {
  return (
    <div className="coin-card">
      <div className="coin-info">
        <img className="coin-info__img" src={coin} alt="coin" />
        <div className="coin-info-column">
          <div className="coin-info__name">Bitcoin</div>
          <div className="coin-info__id">BTC</div>
        </div>
        <BiChevronLeft className="coin-info__chevron" />
      </div>

      <div className="coin-overall">
        <div className="coin-overall__price">£19,243</div>
        <div className="coin-overall-row">
          <BsArrowUp className="coin-overall__arrow" />
          <div className="coin-overall__percentage">£210</div>
        </div>
      </div>
    </div>
  );
};

export default CoinCard;
