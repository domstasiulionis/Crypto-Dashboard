import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react";

import SidebarIconContext from "../../../Context/SidebarIconContext";

import "tippy.js/dist/tippy.css";
import "./Sidebar.scss";

import { IoHome, IoHomeOutline } from "react-icons/io5";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { BsFillPersonFill, BsPerson } from "react-icons/bs";

import logo from "../../../Assets/moon-logo.png";

import FormMain from "../../Forms/FormMain";

const Sidebar = ({ showModal, setShowModal }) => {
  const [popUp, setPopUp] = useState(false);

  const { activeIcon, setActiveIcon } = useContext(SidebarIconContext);

  const show = () => {
    if (showModal) {
      setShowModal(false);
      setPopUp(false);
    } else {
      setShowModal(true);
      setPopUp(true);
    }
  };

  return (
    <div>
      <nav className="sidenav">
        <div className="sidenav-top-container">
          {/* Logo */}
          <img src={logo} className="sidenav__logo" alt="logo" />
          <h3 className="logo__text logo__text--moon">MOON</h3>
          <h3 className="logo__text logo__text--chef">CHEF</h3>

          {/* Top icons */}
          <Tippy placement="right" delay={300} theme="custom" content="Home">
            <Link to="/">
              {activeIcon === "home" ? (
                <div className="icon-container--active">
                  <IoHome
                    className={`icon ${
                      activeIcon === "home" ? "icon--active" : ""
                    }`}
                  />
                </div>
              ) : (
                <div
                  className="icon-container"
                  onClick={() => setActiveIcon("home")}
                >
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
                <div
                  className="icon-container"
                  onClick={() => setActiveIcon("favourites")}
                >
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
        <Tippy placement="right" delay={300} theme="custom" content="Account">
          <div className="sidenav-bottom-container">
            {popUp === true ? (
              <BsFillPersonFill
                onClick={() => show()}
                className={`icon  ${popUp === true ? "icon--active" : ""}`}
              />
            ) : (
              <BsPerson
                onClick={() => show()}
                className={`icon ${popUp === true ? "icon--active" : ""}`}
              />
            )}
          </div>
        </Tippy>
      </nav>
      {showModal ? <FormMain show={show} /> : ""}
    </div>
  );
};

export default Sidebar;
