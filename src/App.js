import { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

import "./Styles/App.scss";

import Sidebar from "./Components/Menus/Side/Sidebar";
import HamburgerMenu from "./Components/Menus/Hamburger/HamburgerMenu";

import { AuthContextProvider } from "./Context/AuthContext";
import { LoginStatusProvider } from "./Context/LoginFormContext";
import { FavCoinsProvider } from "./Context/FavCoinsContext";
import { SidebarIconProvider } from "./Context/SidebarIconContext";

const Home = lazy(() => import("./Pages/Home/Home"));
const Favourites = lazy(() => import("./Pages/Favourites/Favourites"));

function App() {
  const [coins, setCoins] = useState([]);
  const [hamburgerMenu, setHamburgerMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
      "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
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
                          coins={coins}
                          hamburgerMenu={hamburgerMenu}
                          setHamburgerMenu={setHamburgerMenu}
                        />
                      }
                    />
                    <Route
                      exact
                      path="/favourites"
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
