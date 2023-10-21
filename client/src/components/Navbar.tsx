import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
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
  return (
    <div className="but-country d-flex">
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
      className="me-auto my-2 my-lg-0 nav-right"
      style={{ maxHeight: "100px" }}
      navbarScroll
    >
      <NavDropdown
        title="EN"
        id="navbarScrollingDropdown"
        className="right-link"
      >
        <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
      </NavDropdown>

      <NavDropdown
        title="Hello"
        id="navbarScrollingDropdown"
        className="right-link"
      >
        <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
      </NavDropdown>

      <Link to="/" className="nav-link right-link">
        Returns
      </Link>
      <Link to="/" className="nav-link right-link">
        Cart
      </Link>
    </Nav>
  );
}
