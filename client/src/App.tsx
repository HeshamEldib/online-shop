import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
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
import ProductPage from "./pages/ProductsPage";
import ProductDetails from "./pages/ProductDetails";
import AlterationProfile from "./pages/AlterationProfile";
import SearchProduct from "./pages/SearchProduct";
import AddProduct from "./pages/AddProduct";
import MyProducts from "./pages/MyProducts";
import UpdateProduct from "./pages/UpdateProduct";
import NotFoundPage from "./pages/NotFoundPage";

import "./App.css";

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
        <Route path="/signin" element={<Signin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/account" element={<ProfilePage />} />
        <Route path="/products/*" element={<ProductPage />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/alteration-profile" element={<AlterationProfile />} />
        <Route
          path="/search-product/:searchQuery"
          element={<SearchProduct />}
        />
        <Route path="/my-products" element={<MyProducts />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/update-product/:productId" element={<UpdateProduct />} />

        <Route path="/*" element={<NotFoundPage />} />
      </Routes>

      {showNavbar &&
        pathName !== "/alteration-profile" &&
        pathName !== "/account" &&
        pathName !== "/add-product" &&
        pathName !== "/update-product/*" && (
          <>
            <Footer />
          </>
        )}
    </>
  );
}

export default App;
