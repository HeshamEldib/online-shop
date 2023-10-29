import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MenuLinks from "./components/MenuLinks";
import Footer from "./components/Footer";
import Register from "./pages/Register";

import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <MenuLinks />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/language" Component={Home} />
        <Route path="/signin" Component={Home} />
        <Route path="/register" Component={Register} />
        <Route path="/cart" Component={Home} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
