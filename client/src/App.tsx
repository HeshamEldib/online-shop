import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MenuLinks from "./components/MenuLinks";
import Footer from "./components/Footer";
import Register from "./pages/Register";
import Signin from "./pages/Signin";
import ProfilePage from "./pages/ProfilePage";
import LoveMenu from "./components/LoveMenu";
import Cart from "./pages/CartPage";
import ProductPage from "./pages/ProductPage";

import "./App.css";
import ProductDetails from "./pages/ProductDetails";

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
        <Route path="/" element={<Home />} />
        <Route path="/language" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/account" element={<ProfilePage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
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
