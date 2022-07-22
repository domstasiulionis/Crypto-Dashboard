import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Home from "./Pages/Home";
import Favourites from "./Pages/Favourites";
import axios from "axios";
import "./Styles/App.scss";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [coins, setCoins] = useState([]);

  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=gbp&order=market_cap_desc&per_page=20&page=1&sparkline=true
  `;

  useEffect(() => {
    axios.get(url).then((res) => {
      setCoins(res.data);
    });
  }, [url]);

  return (
    <div className="Content">
      <Router>
        <Sidebar />
        <Routes>
          <Route exact path="/" element={<Home coins={coins} />} />
          <Route exact path="/Favourites" element={<Favourites />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
