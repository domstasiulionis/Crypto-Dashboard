import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

import Sidebar from "./Components/Sidebar";
import Home from "./Pages/Home";
import Favourites from "./Pages/Favourites";

import "./Styles/App.scss";

function App() {
  const [coins, setCoins] = useState([]);
  const [update, setUpdate] = useState(0);

  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=gbp&order=market_cap_desc&per_page=20&page=1&sparkline=true
  `;

  useEffect(() => {
    axios.get(url).then((res) => {
      setCoins(res.data);
      setTimeout(() => updater(), 30000);
    });
  }, [url, update]);

  const updater = () => {
    if (update === 1) {
      setUpdate(update - 1);
    } else if (update === 0) {
      setUpdate(update + 1);
    }
  };

  return (
    <div className="Content">
      <Router>
        <Sidebar />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Home coins={coins} update={update} setUpdate={setUpdate} />
            }
          />
          <Route exact path="/Favourites" element={<Favourites />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
