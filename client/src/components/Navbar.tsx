import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBarsStaggered,
  faCartShopping,
  faCircleUser,
  faHeart,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import {
  showAndHiddenLinks,
  showAndHiddenLove,
} from "../redux/slices/targetMenu";
import { RootState } from "../redux/store";
import { fetchGetAllFromCart } from "../redux/slices/cartSlice";
import { Authorization, MainURL, UserToken } from "../constant";

import "./navbar.css";
import { fetchUser } from "../redux/slices/userSlice";

export default function MainNavbar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary main-navbar">
      <Container fluid>
        <NavLeft />

        {/* links */}
        <NavLinks />

        {/* search */}
        <Search />

        {/* Person Links */}
        <PersonLinks />
      </Container>
    </Navbar>
  );
}

function NavLeft() {
  const dispatch = useDispatch();

  return (
    <div className="d-flex align-items-center nav-left">
      <button
        className="but-menu"
        onClick={() => dispatch(showAndHiddenLinks())}
      >
        <FontAwesomeIcon icon={faBarsStaggered} />
      </button>

      <Logo />
    </div>
  );
}

export function Logo() {
  return (
    <Link to="/" className="navbar-brand logo">
      <img src="../public/logo.png" alt="" />
    </Link>
  );
}

function Search() {
  const [searchProduct, setSearchProduct] = useState("");

  const handelSearch = (e: any) => {
    e.preventDefault();
    location.href = "/search-product/" + searchProduct;
  };

  return (
    <Form className="d-flex search" onSubmit={(e: any) => handelSearch(e)}>
      <Form.Control
        type="search"
        placeholder="Search"
        className="search-input"
        aria-label="Search"
        onChange={(e: any) => setSearchProduct(e.target.value)}
      />
      <Button type="submit" variant="outline-success" className="but-search">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </Button>
    </Form>
  );
}

export function NavLinks() {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser(UserToken));
  }, []);

  return (
    <div className="align-items-center links me-md-1 me-lg-2">
      <NavLink title="Home" pathName="" />
      <NavLink title="Products" pathName="Products" />
      {user?.role !== "USER" && (
        <>
          <NavLink title="Add Product" pathName="add-product" />
          <NavLink title="My Products" pathName="my-products" />
        </>
      )}
    </div>
  );
}
interface NavLinkProps {
  title: string;
  pathName: string;
}
export function NavLink({ title, pathName }: NavLinkProps) {
  const [active, setActive] = useState("");
  useEffect(() => {
    if (location.href.slice(22) === pathName) {
      setActive("active");
    } else {
      setActive("");
    }
  }, [location.href]);
  return (
    <Link
      to={"/" + pathName}
      className={`nav-link right-link main-link ${active}`}
    >
      {title}
    </Link>
  );
}

function PersonLinks() {
  return (
    <div className="d-flex align-items-center ms-md-1 ms-lg-2">
      <LoveLink />
      <CardLink />
      <ProfileIcon />
    </div>
  );
}

function CardLink() {
  const products = useSelector((state: RootState) =>
    state.cart.products[0] !== undefined ? state.cart.products[0] : undefined
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetAllFromCart());
  }, []);
  return (
    <Link to="/cart" className="nav-link main-link person-link">
      <div className="person-icon-container">
        <FontAwesomeIcon className="person-icon" icon={faCartShopping} />
        <span className="person-count">{products?.length}</span>
      </div>
    </Link>
  );
}

function LoveLink() {
  const products = useSelector(
    (state: RootState) => state.loveProductsSlice.products
  );
  const dispatch = useDispatch();
  return (
    <button
      className="nav-link main-link person-link"
      onClick={() => dispatch(showAndHiddenLove())}
    >
      <div className="person-icon-container">
        <FontAwesomeIcon className="person-icon" icon={faHeart} />
        <span className="person-count">{products?.length}</span>
      </div>
    </button>
  );
}

export function ProfileIcon() {
  const user: any = useSelector((state: RootState) => state.user.user);
  return (
    <Link to="/account" className="nav-link main-link person-link">
      <div className="person-icon-container">
        {user?.avatar ? (
          <img src={MainURL + user?.avatar} className="main-avatar" alt="" />
        ) : (
          <FontAwesomeIcon className="person-icon" icon={faCircleUser} />
        )}
      </div>
    </Link>
  );
}
