import React from "react";
import HomeNavBar from "../Components/HomeNavBar";

import "../Styles/Home.scss";
import CoinCard from "../Components/CoinCard";

const Home = ({ coins }) => {
  return (
    <div className="home-container">
      <HomeNavBar />
      <hr />
      <div className="coins-container">
        {coins.map((coin, i) => (
          <CoinCard
            key={i}
            name={coin.name}
            short={coin.symbol.toUpperCase()}
            image={coin.image}
            price={coin.current_price}
            change={Math.round(coin.price_change_24h * 100) / 100}
            change24per={
              Math.round(coin.price_change_percentage_24h * 100) / 100
            }
            rank={coin.market_cap_rank}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
