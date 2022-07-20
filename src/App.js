import { useState } from "react";
import Sidebar from "./Components/Sidebar";

import "./Styles/App.scss";

function App() {
  const [activeIcon, setActiveIcon] = useState("home");

  return (
    <div className="Content">
      <Sidebar activeIcon={activeIcon} setActiveIcon={setActiveIcon} />
    </div>
  );
}

export default App;
