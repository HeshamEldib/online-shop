import { useEffect } from "react";
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

import "./navbar.css";

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
  return (
    <Form className="d-flex search">
      <Form.Control
        type="search"
        placeholder="Search"
        className="search-input"
        aria-label="Search"
      />
      <Button variant="outline-success" className="but-search">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </Button>
    </Form>
  );
}

export function NavLinks() {
  return (
    <div className="align-items-center links me-md-1 me-lg-2">
      <Link to="/" className="nav-link right-link main-link">
        Home
      </Link>
      <Link to="/Products" className="nav-link right-link main-link">
        Products
      </Link>
      <Link to="/f&q" className="nav-link right-link main-link">
        F&Q
      </Link>
      {/* Language */}
      <Language />
    </div>
  );
}

export function Language() {
  return (
    <div className="dropdown">
      <Link to="/language" className="main-link nav-link dropdown-toggle">
        EN
      </Link>
      <LanguageMenu />
    </div>
  );
}
function LanguageMenu() {
  return (
    <ul className="dropdown-menu">
      <li>
        <Link to="/">
          <input type="radio" id="html" name="fav_language" value="HTML" />
          <label htmlFor="html">HTML</label>
        </Link>
      </li>
      <li>
        <Link to="/">
          <input type="radio" id="css" name="fav_language" value="css" />
          <label htmlFor="css">css</label>
        </Link>
      </li>
      <li>
        <a className="dropdown-item" href="#">
          Action
        </a>
      </li>
      <li>
        <a className="dropdown-item" href="#">
          Another action
        </a>
      </li>
    </ul>
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
    (state: RootState) => state.loveProductsSlice.products[0]
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
  return (
    <Link to="/account" className="nav-link main-link person-link">
      <div className="person-icon-container">
        <FontAwesomeIcon className="person-icon" icon={faCircleUser} />
      </div>
    </Link>
  );
}
