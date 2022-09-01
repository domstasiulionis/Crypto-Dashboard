import { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

import "./Styles/App.scss";

import Sidebar from "./Components/Sidebar";
import HamburgerMenu from "./Components/HamburgerMenu";

import { AuthContextProvider } from "./Context/AuthContext";
import { LoginStatusProvider } from "./Context/LoginFormContext";
import { FavCoinsProvider } from "./Context/FavCoinsContext";
import { SidebarIconProvider } from "./Context/SidebarIconContext";

const Home = lazy(() => import("./Pages/Home"));
const Favourites = lazy(() => import("./Pages/Favourites"));

function App() {
  const [coins, setCoins] = useState([]);
  const [update, setUpdate] = useState(0);
  const [hamburgerMenu, setHamburgerMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [coinsPerPage] = useState(25);
  const [showModal, setShowModal] = useState(false);

  const indexOfLastCoin = currentPage * coinsPerPage;
  const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
  const currentPosts = coins.slice(indexOfFirstCoin, indexOfLastCoin);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=gbp&order=market_cap_desc&per_page=25&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
      )
      .then((res) => {
        setCoins(res.data);
        setTimeout(
          () => (update === 1 ? setUpdate(update - 1) : setUpdate(update + 1)),
          60000
        );
      });
  }, [update]);

  return (
    <AuthContextProvider>
      <LoginStatusProvider>
        <SidebarIconProvider>
          <FavCoinsProvider>
            <div className="content">
              <Router>
                {hamburgerMenu ? (
                  <HamburgerMenu
                    hamburgerMenu={hamburgerMenu}
                    setHamburgerMenu={setHamburgerMenu}
                    showModal={showModal}
                    setShowModal={setShowModal}
                  />
                ) : (
                  ""
                )}
                <Sidebar showModal={showModal} setShowModal={setShowModal} />
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
                    <Route
                      exact
                      path="/Favourites"
                      element={
                        <Favourites
                          hamburgerMenu={hamburgerMenu}
                          setHamburgerMenu={setHamburgerMenu}
                        />
                      }
                    />
                  </Routes>
                </Suspense>
              </Router>
            </div>
          </FavCoinsProvider>
        </SidebarIconProvider>
      </LoginStatusProvider>
    </AuthContextProvider>
  );
}

export default App;
