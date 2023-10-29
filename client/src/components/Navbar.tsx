import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
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

import "./navbar.css";
import { showAndHidden } from "../redux/slices/targetMenu";

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
      <button className="but-menu" onClick={() => dispatch(showAndHidden())}>
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
      <PersonLink link="/love" count={0} icon={faHeart} />
      <PersonLink link="/cart" count={0} icon={faCartShopping} />
      <Account />
    </div>
  );
}

interface PersonLinkProps {
  link: string;
  count: number;
  icon: any;
}
function PersonLink({ link, count, icon }: PersonLinkProps) {
  return (
    <Link to={link} className="nav-link main-link person-link">
      <div className="person-icon-container">
        <FontAwesomeIcon className="person-icon" icon={icon} />
        <span className="person-count">{count}</span>
      </div>
    </Link>
  );
}

export function Account() {
  return (
    <Link to="/account" className="nav-link main-link person-link">
      <div className="person-icon-container">
        <FontAwesomeIcon className="person-icon" icon={faCircleUser} />
      </div>
    </Link>
  );
}
