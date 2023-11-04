import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MenuLinks from "./components/MenuLinks";
import Footer from "./components/Footer";
import Register from "./pages/Register";
import Signin from "./pages/Signin";
import ProfilePage from "./pages/ProfilePage";

import "./App.css";
import LoveMenu from "./components/LoveMenu";
import Cart from "./pages/CartPage";
import ProductPage from "./pages/productPage";

function App() {
  const pathName = useLocation().pathname;
  let showNavbar: boolean = true;
  if (pathName === "/register" || pathName === "/signin") {
    showNavbar = false;
  } else {
    showNavbar = true;
  }

  return (
    <>
      {showNavbar && (
        <>
          <Navbar />
          <MenuLinks />
          <LoveMenu />
        </>
      )}

      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/language" Component={Home} />
        <Route path="/signin" Component={Signin} />
        <Route path="/register" Component={Register} />
        <Route path="/cart" Component={Cart} />
        <Route path="/account" Component={ProfilePage} />
        <Route path="/product" Component={ProductPage} />
      </Routes>

      {showNavbar && (
        <>
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
