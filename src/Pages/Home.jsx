import { useState, useEffect, useContext, lazy, Suspense } from "react";

import "../Styles/Home.scss";

import HomeNavBar from "../Components/HomeNavBar";
import SidebarIconContext from "../Context/SidebarIconContext";
import Loader from "../Components/Loader";

const CoinCard = lazy(() => import("../Components/CoinCard"));
const Pagination = lazy(() => import("../Components/Pagination"));

const Home = ({
  hamburgerMenu,
  setHamburgerMenu,
  coins,
  coinsPerPage,
  totalCoins,
  paginate,
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
                  change7d={Math.round(coin.change * 100) / 100}
                  rank={coin.rank}
                  priceChart7d={coin.sparkline}
                  marketCap={converter(coin.marketCap)}
                />
              ))}
          <Pagination
            coinsPerPage={coinsPerPage}
            totalCoins={totalCoins}
            paginate={paginate}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
