import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faCircleUser,
  faHeart,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

import "./navbar.css";

export default function MainNavbar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary main-navbar">
      <Container fluid>
        <NavLeft />

        {/* links */}
        <NavRight />

        {/* search */}
        <Search />

        {/* Person Links */}
        <PersonLinks />
      </Container>
    </Navbar>
  );
}

function NavLeft() {
  return (
    <div className="d-flex align-items-center nav-left">
      <Link to="/" className="navbar-brand logo">
        Hesham Eldib
        {/* <img src="../public/logo.svg" alt="" /> */}
      </Link>
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
    <div className="align-items-center links">
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
      <DropdownLanguage />
    </div>
  );
}

function DropdownLanguage() {
  return (
    <div className="dropdown p-2">
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
  );
}

function PersonLinks() {
  return (
    <div className="d-flex align-items-center">
      <PersonLink link="/love" count={0} icon={faHeart} />
      <PersonLink link="/cart" count={0} icon={faCartShopping} />
      <PersonLink link="/account" icon={faCircleUser} />
    </div>
  );
}

interface PersonLinkProps {
  link: string;
  count?: number;
  icon: any;
}
function PersonLink({ link, count, icon }: PersonLinkProps) {
  return (
    <Link to={link} className="nav-link main-link person-link">
      <div className="person-icon-container">
        <FontAwesomeIcon className="person-icon" icon={icon} />
        {count == undefined || <span className="person-count">{count}</span>}
      </div>
    </Link>
  );
}
