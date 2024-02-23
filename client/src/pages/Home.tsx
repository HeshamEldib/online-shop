import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import "./home.css";
import { Card } from "react-bootstrap";
import { categoryList } from "../constant";

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
        <Link to={"/products/" + "electronics"}>
          <img src="../public/home-1.jpg" alt="" />
        </Link>
      </Carousel.Item>
      <Carousel.Item>
        <Link to={"/products/" + "men's clothing"}>
          <img src="../public/home-2.jpeg" alt="" />
        </Link>
      </Carousel.Item>
      <Carousel.Item>
        <Link to={"/products/" + "women's clothing"}>
          <img src="../public/home-3.jpg" alt="" />
        </Link>
      </Carousel.Item>
      <Carousel.Item>
        <Link to={"/products/" + "jewelery"}>
          <img src="../public/home-4.jpg" alt="" />
        </Link>
      </Carousel.Item>
    </Carousel>
  );
}

function Layout() {
  return (
    <div className="layout">
      <div className="card-layout">
        <div className="row justify-content-center">
          <CardLayout
            title="Gaming accessories"
            image="card-1.jpg"
            category="electronics"
          />
          <CardLayout
            title="Gaming accessories"
            image="card-2.jpg"
            category="men's clothing"
          />
          <CardLayout
            title="Gaming accessories"
            image="card-3.jpeg"
            category="jewelery"
          />
          <CardLayout
            title="Gaming accessories"
            image="card-4.jpg"
            category="women's clothing"
          />
          <CardLayout
            title="Gaming accessories"
            image="card-5.jpg"
            category="electronics"
          />
          <CardLayout
            title="Gaming accessories"
            image="card-6.jpg"
            category="men's clothing"
          />
          <CardLayout
            title="Gaming accessories"
            image="card-7.jpg"
            category="women's clothing"
          />
          <CardLayout
            title="Gaming accessories"
            image="card-8.jpeg"
            category="jewelery"
          />
        </div>
      </div>
    </div>
  );
}

interface CardLayoutProps {
  title: string;
  image: string;
  category: string;
}
function CardLayout({ title, image, category }: CardLayoutProps) {
  return (
    <div className="col-sm-6 col-md-4 col-lg-3 card-parent">
      <Card>
        <Card.Title>{title}</Card.Title>
        <Link to={"/products/" + category}>
          <Card.Img variant="top" src={"../public/" + image} />
          <span className="see-more">See more</span>
        </Link>
      </Card>
    </div>
  );
}
