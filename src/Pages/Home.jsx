import { useState, lazy, Suspense } from "react";
import Loader from "../Components/Loader";

import "../Styles/Home.scss";

import HomeNavBar from "../Components/HomeNavBar";
import DotsLoader from "../Components/DotsLoader";
const CoinCard = lazy(() => import("../Components/CoinCard"));

const Home = ({ coins }) => {
  const [searchText, setSearchText] = useState("");

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

    // FOR TESTING OUTPUTS
    // console.log("name:  " + name);
    // console.log("last hour: " + lastHour);
    // console.log("lowerBound: " + lowerBound);
    // console.log("upperBound: " + upperBound);
    // console.log("current hour: " + currentHour);
    // console.log("calc: " + calc);
    // console.log("overall: " + overall);
    // console.log("--------------------");

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
    <div className="home-container">
      <HomeNavBar setSearchText={setSearchText} />
      <div className="coins-container">
        <Suspense fallback={<Loader />}>
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
                coinid={coin.id}
                name={coin.name}
                short={coin.symbol.toUpperCase()}
                image={coin.image}
                price={coin.current_price.toLocaleString()}
                changePrice={Math.round(coin.price_change_24h * 1000) / 1000}
                change1h={
                  Math.round(
                    coin.price_change_percentage_1h_in_currency * 1000
                  ) / 1000
                }
                change24h={
                  Math.round(coin.price_change_percentage_24h * 100) / 100
                }
                change7d={
                  Math.round(
                    coin.price_change_percentage_7d_in_currency * 100
                  ) / 100
                }
                rank={coin.market_cap_rank}
                priceChart1h={display1hChart(
                  coin.sparkline_in_7d.price,
                  coin.symbol
                )}
                priceChart24h={display24hChart(coin.sparkline_in_7d.price)}
                priceChart7d={coin.sparkline_in_7d.price}
              />
            ))}
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
