import { useState } from "react";
import { Link } from "react-router-dom";

import { MdOutlineClose } from "react-icons/md";
import { IoHome } from "react-icons/io5";
import { AiFillStar } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";

import logo from "../../../Assets/moon-logo.png";

import "./HamburgerMenu.scss";

const HamburgerMenu = ({ hamburgerMenu, setHamburgerMenu, setShowModal }) => {
  const [open, setOpen] = useState(hamburgerMenu);

  const toggleSlide = () => {
    setOpen(false);
    setTimeout(() => {
      setHamburgerMenu(false);
    }, 165);
  };

  const mobilePopUp = () => {
    toggleSlide();
    setShowModal(true);
  };

  return (
    <div className="hmb">
      <div className="hmb-overlay" onClick={toggleSlide} />
      <div className={open ? "open" : "closed"}>
        <div
          className={hamburgerMenu ? "hmb-container" : "hmb-container-close"}
        >
          <div className="hmb-inner">
            <div className="hmb-inner-header">
              <MdOutlineClose
                className="hmb-inner-header__close-icon"
                size={36}
                onClick={toggleSlide}
              />
              <div className="hmb-inner-header-title">
                <img
                  src={logo}
                  className="hmb-inner-header-title__logo"
                  alt="logo"
                />
                <h3 className="hmb-inner-header-title--moon">MOON</h3>
                <h3 className="hmb-inner-header-title--chef">CHEF</h3>
              </div>
            </div>
            <div className="hmb-inner-list">
              <Link
                to="/"
                style={{ textDecoration: "none" }}
                onClick={toggleSlide}
              >
                <div className="hmb-inner-list__home">
                  <IoHome size={28} className="hmb-inner-list__home-icon" />
                  <h2>HOME</h2>
                </div>
              </Link>
              <Link
                to="/Favourites"
                style={{ textDecoration: "none" }}
                onClick={toggleSlide}
              >
                <div className="hmb-inner-list__fav">
                  <AiFillStar size={28} className="hmb-inner-list__fav-icon" />
                  <h2>FAVOURITES</h2>
                </div>
              </Link>
              <div className="hmb-inner-list__account" onClick={mobilePopUp}>
                <BsFillPersonFill
                  size={28}
                  className="hmb-inner-list__account-icon"
                />
                <h2>ACCOUNT</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HamburgerMenu;
