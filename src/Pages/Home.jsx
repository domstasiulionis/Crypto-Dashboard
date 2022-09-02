import { useState, useEffect, useContext, lazy, Suspense } from "react";

import "../Styles/Home.scss";

import HomeNavBar from "../Components/HomeNavBar";
import SidebarIconContext from "../Context/SidebarIconContext";
import Loader from "../Components/Loader";
const CoinCard = lazy(() => import("../Components/CoinCard"));
// const Pagination = lazy(() => import("../Components/Pagination"));

const Home = ({
  hamburgerMenu,
  setHamburgerMenu,
  coins,
  coinsPerPage,
  totalCoins,
  paginate,
  showModal,
}) => {
  const [searchText, setSearchText] = useState("");
  const { activeIcon, setActiveIcon } = useContext(SidebarIconContext);

  useEffect(() => {
    setActiveIcon("home");
  }, [activeIcon, setActiveIcon]);

  const converter = (str) => {
    const converted = str * 1;
    return converted.toLocaleString();
  };

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
      <HomeNavBar
        setSearchText={setSearchText}
        hamburgerMenu={hamburgerMenu}
        setHamburgerMenu={setHamburgerMenu}
      />
      <div className="coins-container">
        <Suspense fallback={<Loader />}>
          {coins &&
            coins
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
                  key={coin.uuid}
                  coinid={coin.uuid}
                  name={coin.name}
                  short={coin.symbol}
                  image={coin.iconUrl}
                  price={converter(coin.price)}
                  changePrice={Math.round(coin.price_change_24h * 1000) / 1000}
                  change1h={
                    Math.round(
                      coin.price_change_percentage_1h_in_currency * 1000
                    ) / 1000
                  }
                  change24h={
                    Math.round(coin.price_change_percentage_24h * 100) / 100
                  }
                  change7d={Math.round(coin.change * 100) / 100}
                  rank={coin.rank}
                  priceChart1h={display1hChart(coin.sparkline)}
                  priceChart24h={display24hChart(coin.sparkline)}
                  priceChart7d={coin.sparkline}
                  marketCap={converter(coin.marketCap)}
                  low24h={coin.low_24h}
                  high24h={coin.high_24h}
                />
              ))}
          {/* <Pagination
            coinsPerPage={coinsPerPage}
            totalCoins={totalCoins}
            paginate={paginate}
          /> */}
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
