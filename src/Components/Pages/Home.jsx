import React from "react";
import HomeNavBar from "../HomeNavBar";

import "../../Styles/Home.scss";
import CoinCard from "../CoinCard";

const Home = () => {
  return (
    <div className="home-container">
      <HomeNavBar />
      <hr />
      <div className="coins-container">
        <CoinCard />
      </div>
    </div>
  );
};

export default Home;
