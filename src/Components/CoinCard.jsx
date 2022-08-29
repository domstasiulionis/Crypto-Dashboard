import { useState, useEffect, useContext, lazy, Suspense } from "react";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { UserAuth } from "../Context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc, onSnapshot } from "firebase/firestore";
import axios from "axios";

import "../Styles/CoinCard.scss";

import FavCoinsContext from "../Context/FavCoinsContext";

import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { BiChevronLeft } from "react-icons/bi";
import { BiChevronRight } from "react-icons/bi";

const ExpandedCoinCard = lazy(() => import("./ExpandedCoinCard"));

const CoinCard = ({
  coinid,
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
  update,
  marketCap,
  low24h,
  high24h,
}) => {
  const [selectedTime, setSelectedTime] = useState("7d");
  const [isFav, setIsFav] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [coin, setCoin] = useState({});

  const { user } = UserAuth();
  const { favCoins, setFavCoins } = useContext(FavCoinsContext);

  const coinPath = doc(db, "users", `${user?.email}`);
  const saveCoin = async () => {
    if (user?.email) {
      setIsFav(true);
      await updateDoc(coinPath, {
        favs: arrayUnion({
          key: coinid,
          coinid: coinid,
          name: name,
          short: short,
          image: image,
          price: price,
          changePrice: changePrice,
          change1h: change1h,
          change24h: change24h,
          change7d: change7d,
          rank: rank,
          priceChart1h: priceChart1h,
          priceChart24h: priceChart24h,
          priceChart7d: priceChart7d,
          marketCap: marketCap,
          low24: low24h,
          high24h: high24h,
        }),
      });
    } else {
      alert("Please sign in to save a coin to your favourites");
    }
  };

  const url = `https://api.coingecko.com/api/v3/coins/${coinid}?localization=false&sparkline=true
`;

  useEffect(() => {
    axios.get(url).then((res) => {
      setCoin(res?.data);
    });
  }, [update, url]);

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setFavCoins(doc.data()?.favs);
    });
  }, [user?.email]);

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
    <>
      <div
        className={`expand-default ${
          expanded === true ? "expand-true" : "expand-false"
        }`}
      >
        <div className="coin-card">
          <div className="coin__star" onClick={saveCoin}>
            {isFav === true ? (
              <AiFillStar onClick={toggleFav} className="fav" />
            ) : (
              <AiOutlineStar onClick={toggleFav} className="fav--empty" />
            )}
          </div>

          <div className={`rank ${expanded === true ? "" : ""}`}>
            <div className="rank__number">{rank}</div>
          </div>

          <div
            className={`coin-info ${
              expanded === true ? "coin-info--expand-adjustment" : ""
            }`}
          >
            <div className="coin-info__img-container" onClick={expandCard}>
              <div className="coin-info-res" onClick={expandCard}>
                <BiChevronRight
                  onClick={expandCard}
                  className={
                    expanded === true
                      ? "coin-info-res__chevron-down"
                      : "coin-info-res__chevron"
                  }
                />
              </div>
              <img className="coin-info__img" src={image} alt="coin" />
            </div>
            <div className="coin-info-column" onClick={expandCard}>
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

          {expanded === false ? (
            <div className="coin-overall-container">
              <div className="coin-overall">
                <div className="coin-overall__price">£{price}</div>
                <p className="coin-overall__price-text">Price</p>
              </div>

              <div className="coin-market-cap">
                <div className="coin-market-cap__market-cap">£{marketCap}</div>
                <p className="coin-market-cap__market-cap-text">Market Cap</p>
              </div>

              <div className="coin-high">
                <div className="coin-high__24h">£{high24h}</div>
                <p className="coin-high__24h-text">24h High</p>
              </div>

              <div className="coin-low">
                <div className="coin-low__24h">£{low24h}</div>
                <p className="coin-low__24h-text">24h Low</p>
              </div>

              <div
                className={`time ${
                  selectedTime === "1h" ? "time--active" : ""
                }`}
                id="time-1h"
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
                className={`time ${
                  selectedTime === "24h" ? "time--active" : ""
                }`}
                id="time-24h"
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
                className={`time ${
                  selectedTime === "7d" ? "time--active" : ""
                }`}
                id="time-7d"
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
          ) : (
            <Suspense fallback={<div></div>}>
              <ExpandedCoinCard
                coin={coin}
                changePrice={changePrice}
                price={price}
                change1h={change1h}
                change24h={change24h}
                change7d={change7d}
                update={update}
                setExpanded={setExpanded}
                marketCap={marketCap}
                rank={rank}
              />
            </Suspense>
          )}
        </div>
      </div>
    </>
  );
};

export default CoinCard;
