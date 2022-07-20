import "../Styles/Sidebar.scss";

// Icons
import { IoHome, IoHomeOutline } from "react-icons/io5";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { BsGear, BsGearFill } from "react-icons/bs";

// Images
import logo from "../Assets/moon-logo.png";

const Sidebar = ({ activeIcon, setActiveIcon }) => {
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

        {activeIcon === "home" ? (
          <div className="icon-container--active">
            <IoHome
              className={`icon ${activeIcon === "home" ? "icon--active" : ""}`}
            />
          </div>
        ) : (
          <div className="icon-container">
            <IoHomeOutline
              onClick={() => selectedHome()}
              className={`icon ${activeIcon === "home" ? "icon--active" : ""}`}
            />
          </div>
        )}

        {activeIcon === "favourites" ? (
          <div className="icon-container--active">
            <AiFillStar
              className={`icon ${
                activeIcon === "favourites" ? "icon--active" : ""
              }`}
            />
          </div>
        ) : (
          <div className="icon-container">
            <AiOutlineStar
              onClick={() => selectedFav()}
              className={`icon ${
                activeIcon === "favourites" ? "icon--active" : ""
              }`}
            />
          </div>
        )}
      </div>

      {/* Bottom icons */}
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
    </nav>
  );
};

export default Sidebar;
