import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Home from "./Components/Pages/Home";
import Favourites from "./Components/Pages/Favourites";
import "./Styles/App.scss";

function App() {
  return (
    <div className="Content">
      <Router>
        <Sidebar />
        <Routes>
          <Route exact path="/Home" element={<Home />} />
          <Route exact path="/Favourites" element={<Favourites />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
