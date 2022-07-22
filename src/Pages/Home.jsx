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
            change={coin.price_change_24h}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
