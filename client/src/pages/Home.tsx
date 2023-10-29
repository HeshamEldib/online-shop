import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import "./home.css";
import { Card } from "react-bootstrap";

export default function Home() {
  return (
    <section className="home">
      <ControlledCarousel />
      <Layout />
    </section>
  );
}

function ControlledCarousel() {
  return (
    <Carousel className="carousel-home">
      <Carousel.Item>
        <Link to="/">
          <img src="../public/home-2.jpg" alt="" />
        </Link>
      </Carousel.Item>
      <Carousel.Item>
        <Link to="/">
          <img src="../public/home-2.jpg" alt="" />
        </Link>
      </Carousel.Item>
      <Carousel.Item>
        <Link to="/">
          <img src="../public/home-2.jpg" alt="" />
        </Link>
      </Carousel.Item>
    </Carousel>
  );
}

function Layout() {
  return (
      <div className="layout">
        <div className="card-layout">
          <div className="row">
              <CardLayout />
              <CardLayout />
              <CardLayout />
              <CardLayout />
              <CardLayout />
          </div>
        </div>
      </div>
  );
}

function CardLayout() {
  return (
    <div className="col-4 col-lg-3 card-parent">
    <Card>
      <Card.Title>Gaming accessories</Card.Title>
      <Link to="/">
        <Card.Img variant="top" src="../public/card-1.jpg" />
        <span className="see-more">See more</span>
      </Link>
    </Card></div>
  );
}
