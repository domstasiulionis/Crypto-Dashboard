import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

import FavNavBar from "../../Components/Menus/FavPage/FavNavBar";
import FavCoinCard from "../../Components/Cards/Not-Expanded/FavCoinCard";

import FavCoinsContext from "../../Context/FavCoinsContext";
import SidebarIconContext from "../../Context/SidebarIconContext";

import "./Favourites.scss";

const Favourites = ({ hamburgerMenu, setHamburgerMenu }) => {
  const [searchText, setSearchText] = useState("");
  const { favCoins } = useContext(FavCoinsContext);

  const { activeIcon, setActiveIcon } = useContext(SidebarIconContext);

  useEffect(() => {
    setActiveIcon("favourites");
  }, [activeIcon, setActiveIcon]);

  return (
    <>
      {!favCoins || favCoins.length === 0 ? (
        <div className="fav-container">
          <FavNavBar
            setSearchText={setSearchText}
            hamburgerMenu={hamburgerMenu}
            setHamburgerMenu={setHamburgerMenu}
          />
          <div className="coins-container">
            <div className="no-coins">
              <h1>No coins added!</h1>
              <p>
                You can add coins to your favourites list by clicking on the
                star icon next to the coin on the dashboard page.{" "}
              </p>
              <Link to="/">
                <button>Go to Dashboard</button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="fav-container">
          <FavNavBar
            setSearchText={setSearchText}
            hamburgerMenu={hamburgerMenu}
            setHamburgerMenu={setHamburgerMenu}
          />
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
                <FavCoinCard
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
      )}
    </>
  );
};

export default Favourites;
