import { useState, useEffect } from "react";
import axios from "axios";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

import "../Styles/TrendingCoins.scss";

const TrendingCoins = () => {
  const [trendingCoin, setTrendingCoin] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/search/trending")
      .then((res) => {
        console.log(res.data);
        setTrendingCoin(res?.data?.coins);
      });
  }, []);

  const handleDragStart = (e) => e.preventDefault();

  const items = trendingCoin.map((coin) => {
    return (
      <div className="trending__coin" onDragStart={handleDragStart}>
        <div className="trending__coin-rank">
          #{coin?.item?.market_cap_rank}
        </div>
        <div className="trending__coin-name">{coin?.item?.name}</div>
        <div className="trending__coin-price">
          {coin?.item?.price_btc.toFixed(8)} BTC
        </div>
        <div className="trending__coin-overlay" />
        <img className="trending__coin-image" src={coin?.item?.large} alt="/" />
      </div>
    );
  });

  const reponsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
    1300: {
      items: 6,
    },
    1500: {
      items: 7,
    },
  };

  return (
    <div className="trending-container">
      {/* <div className="trending-title">
        <h3>Trending</h3>
      </div> */}
      <div className="trending">
        <AliceCarousel
          mouseTracking
          items={items}
          infinite
          autoPlayInterval={1000}
          animationDuration={1500}
          disableButtonsControls
          responsive={reponsive}
          autoPlay
        />
      </div>
    </div>
  );
};

export default TrendingCoins;
