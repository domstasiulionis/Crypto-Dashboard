import React from "react";
import { useState } from "react";
import { BiChevronLeft } from "react-icons/bi";

import "../Styles/CoinCard.scss";

import { BsArrowUp } from "react-icons/bs";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

// import coin from "../Assets/bitcoin.png";

const CoinCard = ({ name, short, image, price, change }) => {
  const [selectedTime, setSelectedTime] = useState("24h");
  const [isFav, setIsFav] = useState(false);

  const changeTo1h = () => {
    setSelectedTime("1h");
  };
  const changeTo24h = () => {
    setSelectedTime("24h");
  };
  const changeTo7d = () => {
    setSelectedTime("7d");
  };

  const toggleFav = () => {
    setIsFav((isFav) => !isFav);
  };

  return (
    <div className="coin-card">
      <div className="coin__star">
        {isFav === true ? (
          <AiFillStar onClick={toggleFav} className="fav" />
        ) : (
          <AiOutlineStar onClick={toggleFav} className="fav" />
        )}
      </div>

      <div className="coin-info">
        <img className="coin-info__img" src={image} alt="coin" />
        <div className="coin-info-column">
          <div className="coin-info__name">{name}</div>
          <div className="coin-info__id">{short}</div>
        </div>
        <BiChevronLeft className="coin-info__chevron" />
      </div>

      <div className="coin-overall">
        <div className="coin-overall__price">{"£" + price}</div>
        <div className="coin-overall-row">
          <BsArrowUp className="coin-overall__arrow" />
          <div className="coin-overall__percentage">{change}</div>
        </div>
      </div>

      <div
        className={`time ${selectedTime === "1h" ? "time--active" : ""}`}
        onClick={changeTo1h}
      >
        <divv className="time__percantage">1.4%</divv>
        <div className="time__period">1h</div>
      </div>
      <div
        className={`time ${selectedTime === "24h" ? "time--active" : ""}`}
        onClick={changeTo24h}
      >
        <divv className="time__percantage">1.4%</divv>
        <div className="time__period">24h</div>
      </div>
      <div
        className={`time ${selectedTime === "7d" ? "time--active" : ""}`}
        onClick={changeTo7d}
      >
        <div className="time__percantage">1.4%</div>
        <div className="time__period">7d</div>
      </div>

      <div className="mini-chart">
        <h1>chart</h1>
      </div>
    </div>
  );
};

export default CoinCard;
