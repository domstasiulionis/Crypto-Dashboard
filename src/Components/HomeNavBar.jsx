import React from "react";
import { IoHome } from "react-icons/io5";
import { BsSearch } from "react-icons/bs";

import "../Styles/HomeNavBar.scss";

const HomeNavBar = () => {
  return (
    <nav className="top-nav">
      <div className="top-nav-left">
        <IoHome className="top-nav-left__icon" />
        <h3 className="top-nav-left__title">Dashboard</h3>
      </div>
      <div className="top-nav-right">
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <BsSearch className="search-bar__icon" />
        </div>
      </div>
    </nav>
  );
};

export default HomeNavBar;
