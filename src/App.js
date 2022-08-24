import { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

import "./Styles/App.scss";

import Sidebar from "./Components/Sidebar";
import HamburgerMenu from "./Components/HamburgerMenu";
const Home = lazy(() => import("./Pages/Home"));
const Favourites = lazy(() => import("./Pages/Favourites"));

function App() {
  const [activeIcon, setActiveIcon] = useState(
    () => sessionStorage.getItem("icon") || "home"
  );

  const [coins, setCoins] = useState([]);
  const [update, setUpdate] = useState(0);
  const [hamburgerMenu, setHamburgerMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [coinsPerPage] = useState(20);
  const [showModal, setShowModal] = useState(false);

  const indexOfLastCoin = currentPage * coinsPerPage;
  const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
  const currentPosts = coins.slice(indexOfFirstCoin, indexOfLastCoin);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    sessionStorage.setItem("icon", activeIcon);
  }, [activeIcon]);

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=gbp&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
      )
      .then((res) => {
        setCoins(res.data);
        setTimeout(
          () => (update === 1 ? setUpdate(update - 1) : setUpdate(update + 1)),
          30000
        );
      });
  }, [update]);

  return (
    <div className="content">
      <Router>
        {hamburgerMenu ? (
          <HamburgerMenu
            hamburgerMenu={hamburgerMenu}
            setHamburgerMenu={setHamburgerMenu}
          />
        ) : (
          ""
        )}
        <Sidebar
          activeIcon={activeIcon}
          setActiveIcon={setActiveIcon}
          showModal={showModal}
        />
        <Suspense fallback={<div></div>}>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Home
                  coins={currentPosts}
                  hamburgerMenu={hamburgerMenu}
                  setHamburgerMenu={setHamburgerMenu}
                  coinsPerPage={coinsPerPage}
                  totalCoins={coins.length}
                  paginate={paginate}
                />
              }
            />
            <Route exact path="/Favourites" element={<Favourites />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
