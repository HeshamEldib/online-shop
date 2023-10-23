import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showAndHidden } from "../redux/slices/PopoverSlice";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faLocationDot,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

import "./navbar.css";

export default function MainNavbar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary main-navbar">
      <Container fluid>
        <NavLeft />

        {/* search */}
        <Search />

        {/* menu */}
        {/* <Navbar.Toggle aria-controls="navbarScroll" /> */}
        {/* <Navbar.Collapse id="navbarScroll">
        </Navbar.Collapse> */}

        {/* links */}
        <NavRight />
      </Container>
    </Navbar>
  );
}

function NavLeft() {
  return (
    <div className="d-flex align-items-center nav-left">
      <Link to="/" className="navbar-brand logo">
        Hesham Eldib
      </Link>

      {/* location */}
      <Location />
    </div>
  );
}

function Location() {
  const dispatch = useDispatch();

  return (
    <div
      className="but-country main-link d-flex"
      onClick={() => dispatch(showAndHidden())}
    >
      <FontAwesomeIcon icon={faLocationDot} />
      <span className="d-inline-block">
        <span className="w-100 d-inline-block">Deliver to</span>
        <span className="country">Egypt</span>
      </span>
    </div>
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

function NavRight() {
  return (
    <Nav
      className="me-auto my-2 my-lg-0 nav-right align-items-end"
      style={{ maxHeight: "100px" }}
      navbarScroll
    >
      <DropdownLanguage />

      <DropdownHello />

      <Link to="/signin" className="nav-link right-link main-link">
        <span className="d-block">Returns</span>
        <span>& Orders</span>
      </Link>

      <Link to="/cart" className="nav-link right-link cart-link">
        <div className="cart-icon-container">
          <FontAwesomeIcon className="cart-icon" icon={faCartShopping} />
          <span className="cart-count">{0}</span>
        </div>
        <div className="cart-text">Cart</div>
      </Link>
    </Nav>
  );
}

function DropdownLanguage() {
  return (
    <div className="dropdown">
      <Link to="/language" className="right-link nav-link dropdown-toggle">
        EN
      </Link>
      <ul className="dropdown-menu">
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
        <li>
          <a className="dropdown-item" href="#">
            Something else here
          </a>
        </li>
      </ul>
    </div>
  );
}

function DropdownHello() {
  return (
    <div className="dropdown dropdown-hello">
      <Link
        to="/register"
        className="right-link nav-link dropdown-toggle main-link"
      >
        <span className="d-block">Hello, sign in</span>
        <span>Account & Lists</span>
      </Link>

      <DropdownMenuHello />
    </div>
  );
}

function DropdownMenuHello() {
  const arr1: any[] = ["Create a List", "Find a List or Registry"];
  return (
    <div className="dropdown-menu content">
      <div className="al-signin">
        <Link to="/signin" className="main-button">
          Sign in
        </Link>
        <span>
          New customer?
          <Link to="/register">Start hare</Link>
        </span>
      </div>
      <LinksMenu title="Your Lists" list={arr1} />
      <LinksMenu title="Your Account" list={arr1} />
      <div className="flyout-buffer-top"></div>
    </div>
  );
}
interface LinksMenuProps {
  title: string;
  list: any[];
}
function LinksMenu({ title, list }: LinksMenuProps) {
  return (
    <div className="al-menu">
      <h4 className="menu-title">{title}</h4>
      <ul className="menu-ul">
        {list?.map((link: any) => {
          return (
            <li>
              <Link to="/">{link}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
