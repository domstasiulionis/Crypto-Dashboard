import React from "react";
import { useState } from "react";
import { Sparklines, SparklinesLine, SparklinesSpots } from "react-sparklines";

import "../Styles/CoinCard.scss";

import { BsArrowUp } from "react-icons/bs";
import { BsArrowDown } from "react-icons/bs";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { BiChevronLeft } from "react-icons/bi";

const CoinCard = ({
  name,
  short,
  image,
  price,
  change,
  change24per,
  rank,
  priceChart,
}) => {
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
          <AiOutlineStar onClick={toggleFav} className="fav--empty" />
        )}
      </div>

      <div className="rank">
        <div className="rank__number">{rank}</div>
      </div>

      <div className="coin-info">
        <div className="coin-info__img-container">
          <img className="coin-info__img" src={image} alt="coin" />
        </div>
        <div className="coin-info-column">
          <div className="coin-info__name">{name}</div>
          <div className="coin-info__id">{short}</div>
        </div>
        {/* <div>
          <BiChevronLeft className="coin-info__chevron" />
        </div> */}
      </div>

      <div className="coin-overall">
        <div className="coin-overall__price">{"£" + price}</div>
        <div className="coin-overall-row">
          {change > 0 ? (
            <BsArrowUp className="coin-overall__arrow" />
          ) : (
            <BsArrowDown className="coin-overall__arrow--red" />
          )}

          <div
            className={`${
              change > 0
                ? "coin-overall__percentage"
                : "coin-overall__percentage--red"
            }`}
          >
            {change}%
          </div>
        </div>
      </div>

      <div
        className={`time ${selectedTime === "1h" ? "time--active" : ""}`}
        onClick={changeTo1h}
      >
        <div className="time__percantage">1.4%</div>
        <div className="time__period">1h</div>
      </div>
      <div
        className={`time ${selectedTime === "24h" ? "time--active" : ""}`}
        onClick={changeTo24h}
      >
        <div className="time__percantage">{change24per + "%"}</div>
        <div className="time__period">24h</div>
      </div>
      <div
        className={`time ${selectedTime === "7d" ? "time--active" : ""}`}
        onClick={changeTo7d}
      >
        <div className="time__percantage">yeah</div>
        <div className="time__period">7d</div>
      </div>

      <div className="mini-chart-container">
        <Sparklines data={priceChart}>
          <SparklinesLine color="#b89629" className="mini-chart__chart" />
          <SparklinesSpots />
        </Sparklines>
      </div>
    </div>
  );
};

export default CoinCard;
