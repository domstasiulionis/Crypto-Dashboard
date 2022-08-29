import { useEffect, useState, useContext } from "react";
import FavNavBar from "../Components/FavNavBar";
import CoinCard from "../Components/CoinCard";

import FavCoinsContext from "../Context/FavCoinsContext";

import "../Styles/Favourites.scss";
import FavCoinCard from "../Components/FavCoinCard";

const Favourites = () => {
  const [searchText, setSearchText] = useState("");
  const { favCoins, setFavCoins } = useContext(FavCoinsContext);

  const display1hChart = (sevenDays) => {
    let overall = [];

    const lastHour = sevenDays[165];
    const currentHour = sevenDays[166];
    let calc = lastHour - currentHour;

    if (lastHour < currentHour) {
      calc = -calc;
    }

    const lowerBound = calc * 0.25 + lastHour;
    const upperBound = calc * 0.75 + lastHour;

    overall.push(lastHour, lowerBound, upperBound, currentHour);

    return overall;
  };

  const display24hChart = (sevenDays) => {
    let overall = [];

    const total = sevenDays.length;
    const twentyFourHours = total - 24;
    overall = sevenDays.slice(twentyFourHours, total);

    return overall;
  };

  return (
    <div className="fav-container">
      <FavNavBar />
      <div className="coins-container">
        {favCoins
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
              key={coin.coinid}
              coinid={coin.coinid}
              name={coin.name}
              short={coin.short}
              image={coin.image}
              price={coin.price}
              changePrice={coin.changePrice}
              change1h={coin.change1h}
              change24h={coin.change24h}
              change7d={coin.change7d}
              rank={coin.rank}
              priceChart1h={coin.priceChart1h}
              priceChart24h={coin.priceChart24h}
              priceChart7d={coin.priceChart7d}
              marketCap={coin.marketCap}
              low24h={coin.low24h}
              high24h={coin.high24h}
            />
          ))}
      </div>
    </div>
  );
};

export default Favourites;
