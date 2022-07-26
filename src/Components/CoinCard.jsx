import React from "react";
import { useState } from "react";
import { Sparklines, SparklinesLine } from "react-sparklines";

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
  changePrice,
  change1h,
  change24h,
  change7d,
  rank,
  priceChart1h,
  priceChart24h,
  priceChart7d,
}) => {
  const [selectedTime, setSelectedTime] = useState("7d");
  const [isFav, setIsFav] = useState(false);
  const [expanded, setExpanded] = useState(false);

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

  const expandCard = () => {
    setExpanded((expanded) => !expanded);
  };

  return (
    <div
      className={`expand-default ${
        expanded === true ? "expand-true" : "expand-false"
      }`}
    >
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
          <div className="coin-info__chevron-container" onClick={expandCard}>
            <BiChevronLeft
              className={
                expanded === true
                  ? "coin-info__chevron-down"
                  : "coin-info__chevron"
              }
            />
          </div>
        </div>

        <div className="coin-overall">
          <div className="coin-overall__price">{"£" + price}</div>
          <div className="coin-overall-row">
            {changePrice > 0 ? (
              <BsArrowUp className="coin-overall__arrow" />
            ) : (
              <BsArrowDown className="coin-overall__arrow--red" />
            )}
            <div
              className={`${
                changePrice > 0
                  ? "coin-overall__percentage"
                  : "coin-overall__percentage--red"
              }`}
            >
              {changePrice}
            </div>
          </div>
        </div>

        <div
          className={`time ${selectedTime === "1h" ? "time--active" : ""}`}
          onClick={changeTo1h}
        >
          <div
            className={`${
              change1h > 0 ? "time__percentage" : "time__percentage--red"
            }`}
          >
            {change1h}%
          </div>
          <div className="time__period">1h</div>
        </div>
        <div
          className={`time ${selectedTime === "24h" ? "time--active" : ""}`}
          onClick={changeTo24h}
        >
          <div
            className={`${
              change24h > 0 ? "time__percentage" : "time__percentage--red"
            }`}
          >
            {change24h}%
          </div>
          <div className="time__period">24h</div>
        </div>
        <div
          className={`time ${selectedTime === "7d" ? "time--active" : ""}`}
          onClick={changeTo7d}
        >
          <div
            className={`${
              change7d > 0 ? "time__percentage" : "time__percentage--red"
            }`}
          >
            {change7d}%
          </div>
          <div className="time__period">7d</div>
        </div>

        <div className="mini-chart-container">
          {selectedTime === "1h" ? (
            <Sparklines data={priceChart1h}>
              <SparklinesLine
                color={change1h > 0 ? "#5bbe84" : "#c43d3d"}
                className="mini-chart__chart"
              />
            </Sparklines>
          ) : (
            ""
          )}
          {selectedTime === "24h" ? (
            <Sparklines data={priceChart24h}>
              <SparklinesLine
                color={change24h > 0 ? "#5bbe84" : "#c43d3d"}
                className="mini-chart__chart"
              />
            </Sparklines>
          ) : (
            ""
          )}
          {selectedTime === "7d" ? (
            <Sparklines data={priceChart7d}>
              <SparklinesLine
                color={change7d > 0 ? "#5bbe84" : "#c43d3d"}
                className="mini-chart__chart"
              />
            </Sparklines>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default CoinCard;
