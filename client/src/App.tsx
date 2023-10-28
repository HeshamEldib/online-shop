import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

import "./App.css";
import MenuLinks from "./components/MenuLinks";

function App() {
  return (
    <>
      <Navbar />
      <MenuLinks />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/language" Component={Home} />
        <Route path="/signin" Component={Home} />
        <Route path="/register" Component={Home} />
        <Route path="/cart" Component={Home} />
      </Routes>
    </>
  );
}

export default App;
