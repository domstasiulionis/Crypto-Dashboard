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

  const options = {
    method: "GET",
    url: "https://coinranking1.p.rapidapi.com/coins",
    params: {
      referenceCurrencyUuid: "yhjMzLPhuIDl",
      timePeriod: "7d",
      "tiers[0]": "1",
      orderBy: "marketCap",
      orderDirection: "desc",
      limit: "100",
      offset: "0",
    },
    headers: {
      "X-RapidAPI-Key": "87a84376eamshe0fe6404a684850p19482cjsn9cb0e1926c47",
      "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
    },
  };

  useEffect(() => {
    axios
      .request(options)
      .then(function (response) {
        setCoins(response?.data?.data?.coins);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

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
