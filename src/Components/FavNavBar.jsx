import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import { IoHome } from "react-icons/io5";
import { BsSearch } from "react-icons/bs";

import "../Styles/HomeNavBar.scss";

const HomeNavBar = ({ setHamburgerMenu, setSearchText }) => {
  return (
    <nav className="fav-nav-container">
      <nav className="fav-nav">
        <div className="fav-nav-middle">
          <div className="search-bar">
            <input
              onChange={(e) => setSearchText(e.target.value)}
              type="text"
              placeholder="Search..."
            />
            <BsSearch className="search-bar__icon" />
          </div>
        </div>
      </nav>
    </nav>
  );
};

export default HomeNavBar;
