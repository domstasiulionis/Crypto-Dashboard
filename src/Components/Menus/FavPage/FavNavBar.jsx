import "tippy.js/dist/tippy.css";
import "./FavNavBar.scss";

import { BsSearch } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";

const HomeNavBar = ({ setHamburgerMenu, setSearchText }) => {
  return (
    <nav className="fav-nav-container">
      <nav className="fav-nav">
        <div className="fav-nav-left">
          <div
            className="fav-nav-hamburger"
            onClick={() => setHamburgerMenu(true)}
          >
            <span className="fav-nav-hamburger__line"></span>
            <span className="fav-nav-hamburger__line"></span>
            <span className="fav-nav-hamburger__line"></span>
          </div>
          <AiFillStar className="fav-nav-left__icon" />
          <h3 className="fav-nav-left__title">Favourites</h3>
        </div>

        <div className="fav-nav-middle">
          <div className="search-bar">
            <input
              onChange={(e) => setSearchText(e.target.value)}
              type="text"
              placeholder="Search for a coin..."
            />
            <BsSearch className="search-bar__icon" />
          </div>
        </div>
      </nav>
    </nav>
  );
};

export default HomeNavBar;
