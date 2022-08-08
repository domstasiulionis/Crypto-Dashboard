import React from "react";

import { IoHome } from "react-icons/io5";
import { BsSearch } from "react-icons/bs";

import "../Styles/HomeNavBar.scss";

const HomeNavBar = ({ setSearchText }) => {
  return (
    <nav className="top-nav">
      <div className="top-nav-left">
        <IoHome className="top-nav-left__icon" />
        <h3 className="top-nav-left__title">Dashboard</h3>
        <p className="top-nav-left__live">LIVE</p>
        <div class="top-nav-left__pulsating-circle"></div>
      </div>

      <div className="top-nav-middle">
        <div className="search-bar">
          <input
            onChange={(e) => setSearchText(e.target.value)}
            type="text"
            placeholder="Search..."
          />
          <BsSearch className="search-bar__icon" />
        </div>
      </div>

      {/* <div className="top-nav-right"></div> */}
    </nav>
  );
};

export default HomeNavBar;
