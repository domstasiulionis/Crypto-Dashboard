import { useState, useEffect, useContext, lazy, Suspense } from "react";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { UserAuth } from "../../../Context/AuthContext";
import { db } from "../../../firebase";
import { arrayUnion, doc, updateDoc, onSnapshot } from "firebase/firestore";

import "./CoinCard.scss";

import FavCoinsContext from "../../../Context/FavCoinsContext";

import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { BiChevronLeft } from "react-icons/bi";
import { BiChevronRight } from "react-icons/bi";

const ExpandedCoinCard = lazy(() => import("../Expanded/ExpandedCoinCard"));

const CoinCard = ({
  coinid,
  name,
  short,
  image,
  price,
  change7d,
  rank,
  priceChart7d,
  update,
  marketCap,
  btc,
}) => {
  const [selectedTime, setSelectedTime] = useState("7d");
  const [isFav, setIsFav] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const { user } = UserAuth();
  const { setFavCoins } = useContext(FavCoinsContext);

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
          change7d: change7d,
          rank: rank,
          priceChart7d: priceChart7d,
          marketCap: marketCap,
          btc: btc,
        }),
      });
    } else {
      alert("Please sign in to save a coin to your favourites");
    }
  };

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setFavCoins(doc.data()?.favs);
    });
  }, [user?.email]);

  const changeTo7d = () => {
    setSelectedTime("7d");
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
          <div className="coin__star">
            {isFav === true ? (
              <AiFillStar className="fav" />
            ) : (
              <AiOutlineStar className="fav--empty" onClick={saveCoin} />
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
                <div className="coin-overall__price">${price}</div>
                <p className="coin-overall__price-text">Price</p>
              </div>

              <div className="coin-market-cap">
                <div className="coin-market-cap__market-cap">${marketCap}</div>
                <p className="coin-market-cap__market-cap-text">Market Cap</p>
              </div>

              <div className="coin-btc">
                <div className="coin-btc__price">${btc}</div>
                <p className="coin-btc__text">BTC Price</p>
              </div>

              <div className="time" onClick={changeTo7d}>
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
                {selectedTime === "7d" ? (
                  <Sparklines data={priceChart7d}>
                    <SparklinesLine
                      color={change7d > 0 ? "#5bbe84" : "#c43d3d"}
                      className="mini-chart__chart"
                      strokeWidth={8}
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
                price={price}
                update={update}
                setExpanded={setExpanded}
                marketCap={marketCap}
                rank={rank}
                coinid={coinid}
                change7d={change7d}
                btc={btc}
              />
            </Suspense>
          )}
        </div>
      </div>
    </>
  );
};

export default CoinCard;
