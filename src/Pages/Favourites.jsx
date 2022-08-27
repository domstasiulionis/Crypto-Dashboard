import { useEffect, useCallback } from "react";
import FavNavBar from "../Components/FavNavBar";

import "../Styles/Favourites.scss";

const Favourites = (activeIcon, setActiveIcon) => {
  return (
    <div className="fav-container">
      <FavNavBar />
      <div className="coins-container"></div>
    </div>
  );
};

export default Favourites;
