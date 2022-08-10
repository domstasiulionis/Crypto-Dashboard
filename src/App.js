import { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

import "./Styles/App.scss";

import Sidebar from "./Components/Sidebar";

const Home = lazy(() => import("./Pages/Home"));
const Favourites = lazy(() => import("./Pages/Favourites"));

function App() {
  const [activeIcon, setActiveIcon] = useState(
    () => sessionStorage.getItem("icon") || "home"
  );
  const [coins, setCoins] = useState([]);
  const [update, setUpdate] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=gbp&order=market_cap_desc&per_page=20&page=${page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d
  `;

  useEffect(() => {
    sessionStorage.setItem("icon", activeIcon);
  }, [activeIcon]);

  useEffect(() => {
    axios.get(url).then((res) => {
      setCoins(res.data);
      setTimeout(
        () => (update === 1 ? setUpdate(update - 1) : setUpdate(update + 1)),
        30000
      );
    });
  }, [url, update]);

  return (
    <div className="Content">
      <Router>
        <Sidebar activeIcon={activeIcon} setActiveIcon={setActiveIcon} />
        <Suspense fallback={<div></div>}>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Home
                  coins={coins}
                  setCoins={setCoins}
                  page={page}
                  setPage={setPage}
                  hasMore={hasMore}
                  setHasMore={setHasMore}
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
