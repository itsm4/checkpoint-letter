import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ScreenHome from "./pages/ScreenHome";

function App() {
  const location = useLocation();
  // Afficher la NavBar partout sauf sur la page d'accueil (ScreenHome)
  const showNavBar =
    location.pathname !== "/" &&
    location.pathname !== "/letter/future" &&
    location.pathname !== "/letter/custom";

  return (
    <>
      <Routes>
        <Route path="/" element={<ScreenHome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      {showNavBar && <NavBar />}
    </>
  );
}

export default App;
