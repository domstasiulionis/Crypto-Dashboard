import "../Styles/Sidebar.scss";

// Icons
import { IoHome } from "react-icons/io5";
import { FiBarChart2 } from "react-icons/fi";
import { AiOutlineWallet } from "react-icons/ai";
import { GiBackwardTime } from "react-icons/gi";
import { AiOutlineCompass } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { AiOutlinePoweroff } from "react-icons/ai";

// Images
import logo from "../Assets/moon-logo.png";

const Sidebar = () => {
  return (
    <div className="sidenav">
      <img src={logo} className="sidenav__logo" alt="logo" />
      <h3 className="logo__text logo__text--moon">MOON</h3>
      <h3 className="logo__text logo__text--cake">CAKE</h3>

      {/* Top icons */}
      <div className="logo--active">
        <IoHome className="icon icon--active" />
      </div>
      <div>
        <FiBarChart2 className="icon" />
      </div>
      <div>
        <AiOutlineWallet className="icon" />
      </div>
      <div>
        <GiBackwardTime className="icon" />
      </div>
      <div>
        <AiOutlineCompass className="icon" />
      </div>

      {/* Bottom icons */}
      <div className="group-position--end">
        <div>
          <FiSettings className="icon--spin" />
        </div>
        <div>
          <AiOutlinePoweroff className="icon" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
