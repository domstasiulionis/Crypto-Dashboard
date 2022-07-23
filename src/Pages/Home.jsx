import { useState } from "react";

import "../Styles/Home.scss";

import CoinCard from "../Components/CoinCard";
import HomeNavBar from "../Components/HomeNavBar";

const Home = ({ coins }) => {
  const [searchText, setSearchText] = useState("");

  const display24hChart = (sevenDays) => {
    let overall = [];

    const total = sevenDays.length;
    const hour = total - 24;
    overall = sevenDays.slice(hour, total);
    console.log(overall);
    return overall;
  };

  return (
    <div className="home-container">
      <HomeNavBar setSearchText={setSearchText} />
      <hr />
      <div className="coins-container">
        {coins
          .filter((value) => {
            if (searchText === "") {
              return value;
            } else if (
              value.name.toLowerCase().includes(searchText.toLowerCase())
            ) {
              return value;
            }
            return null;
          })
          .map((coin) => (
            <CoinCard
              key={coin.id}
              name={coin.name}
              short={coin.symbol.toUpperCase()}
              image={coin.image}
              price={coin.current_price}
              changePrice={Math.round(coin.price_change_24h * 1000) / 1000}
              change1h={
                Math.round(coin.price_change_percentage_1h_in_currency * 1000) /
                1000
              }
              change24h={
                Math.round(coin.price_change_percentage_24h * 100) / 100
              }
              change7d={
                Math.round(coin.price_change_percentage_7d_in_currency * 100) /
                100
              }
              rank={coin.market_cap_rank}
              priceChart7d={coin.sparkline_in_7d.price}
              priceChart24h={display24hChart(coin.sparkline_in_7d.price)}
            />
          ))}
      </div>
    </div>
  );
};

export default Home;
