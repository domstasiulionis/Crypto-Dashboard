import { useState } from "react";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional

import "../Styles/Sidebar.scss";

// Icons
import { IoHome, IoHomeOutline } from "react-icons/io5";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { BsGear, BsGearFill } from "react-icons/bs";

// Images
import logo from "../Assets/moon-logo.png";

const Sidebar = () => {
  const [activeIcon, setActiveIcon] = useState("home");

  const selectedHome = () => {
    setActiveIcon("home");
  };

  const selectedFav = () => {
    setActiveIcon("favourites");
  };

  const selectedSettings = () => {
    setActiveIcon("settings");
  };

  return (
    <nav className="sidenav">
      <div className="sidenav-top-container">
        {/* Logo */}
        <img src={logo} className="sidenav__logo" alt="logo" />
        <h3 className="logo__text logo__text--moon">MOON</h3>
        <h3 className="logo__text logo__text--cake">CAKE</h3>

        {/* Top icons */}
        <Tippy placement="right" delay={300} theme="custom" content="Home">
          <Link to="/Home">
            {activeIcon === "home" ? (
              <div className="icon-container--active">
                <IoHome
                  className={`icon ${
                    activeIcon === "home" ? "icon--active" : ""
                  }`}
                />
              </div>
            ) : (
              <div className="icon-container" onClick={() => selectedHome()}>
                <IoHomeOutline
                  className={`icon ${
                    activeIcon === "home" ? "icon--active" : ""
                  }`}
                />
              </div>
            )}
          </Link>
        </Tippy>

        <Tippy
          placement="right"
          delay={300}
          theme="custom"
          content="Favourites"
        >
          <Link to="/Favourites">
            {activeIcon === "favourites" ? (
              <div className="icon-container--active">
                <AiFillStar
                  className={`icon ${
                    activeIcon === "favourites" ? "icon--active" : ""
                  }`}
                />
              </div>
            ) : (
              <div className="icon-container" onClick={() => selectedFav()}>
                <AiOutlineStar
                  className={`icon ${
                    activeIcon === "favourites" ? "icon--active" : ""
                  }`}
                />
              </div>
            )}
          </Link>
        </Tippy>
      </div>

      {/* Bottom icons */}
      <Tippy placement="right" delay={300} theme="custom" content="Settings">
        <div className="sidenav-bottom-container">
          {activeIcon === "settings" ? (
            <BsGearFill
              onClick={() => selectedSettings()}
              className={`icon icon--spin ${
                activeIcon === "settings" ? "icon--active" : ""
              }`}
            />
          ) : (
            <BsGear
              onClick={() => selectedSettings()}
              className={`icon icon--spin ${
                activeIcon === "settings" ? "icon--active" : ""
              }`}
            />
          )}
        </div>
      </Tippy>
    </nav>
  );
};

export default Sidebar;
