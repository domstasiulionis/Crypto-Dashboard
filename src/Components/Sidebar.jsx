import "../Styles/Sidebar.scss";

// Icons
import { IoHome } from "react-icons/io5";
import { AiOutlineStar } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { AiOutlinePoweroff } from "react-icons/ai";

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
        <IoHome
          onClick={() => selectedHome()}
          className={`icon ${activeIcon === "home" ? "icon--active" : ""}`}
        />
        <AiOutlineStar
          onClick={() => selectedFav()}
          className={`icon ${
            activeIcon === "favourites" ? "icon--active" : ""
          }`}
        />
      </div>

      {/* Bottom icons */}
      <div className="bottom-container">
        <FiSettings
          onClick={() => selectedSettings()}
          className={`icon icon--spin ${
            activeIcon === "settings" ? "icon--active" : ""
          }`}
        />
        <AiOutlinePoweroff className="icon--power" />
      </div>
    </nav>
  );
};

export default Sidebar;
