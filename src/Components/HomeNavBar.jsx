import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import { IoHome } from "react-icons/io5";
import { BsSearch } from "react-icons/bs";

import "../Styles/HomeNavBar.scss";

const HomeNavBar = ({ setHamburgerMenu, setSearchText }) => {
  return (
    <nav className="top-nav-container">
      <nav className="top-nav">
        <div className="top-nav-left">
          <div
            className="top-nav-hamburger"
            onClick={() => setHamburgerMenu(true)}
          >
            <span className="top-nav-hamburger__line"></span>
            <span className="top-nav-hamburger__line"></span>
            <span className="top-nav-hamburger__line"></span>
          </div>
          <IoHome className="top-nav-left__icon" />
          <h3 className="top-nav-left__title">Dashboard</h3>
          <p className="top-nav-left__live">LIVE</p>
          <Tippy
            placement="right"
            delay={300}
            theme="custom"
            content="Updated every minute!"
          >
            <div className="top-nav-left__pulsating-circle"></div>
          </Tippy>
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
    </nav>
  );
};

export default HomeNavBar;
