import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import image_home_1 from "../../public/home-1.jpg";
import image_home_2 from "../../public/home-2.jpg";
import image_home_3 from "../../public/home-3.jpg";
import image_home_4 from "../../public/home-4.jpg";
import image_card_1 from "../../public/card-1.jpg";
import image_card_2 from "../../public/card-2.jpg";
import image_card_3 from "../../public/card-3.jpeg";
import image_card_4 from "../../public/card-4.jpg";
import image_card_5 from "../../public/card-5.jpg";
import image_card_6 from "../../public/card-6.jpg";
import image_card_7 from "../../public/card-7.jpg";
import image_card_8 from "../../public/card-8.jpeg";

import "./home.css";
// import { categoryList } from "../constant";

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
          <img src={image_home_1} alt="" />
        </Link>
      </Carousel.Item>
      <Carousel.Item>
        <Link to={"/products/" + "men's clothing"}>
          <img src={image_home_2} alt="" />
        </Link>
      </Carousel.Item>
      <Carousel.Item>
        <Link to={"/products/" + "women's clothing"}>
          <img src={image_home_3} alt="" />
        </Link>
      </Carousel.Item>
      <Carousel.Item>
        <Link to={"/products/" + "jewelery"}>
          <img src={image_home_4} alt="" />
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
            image={image_card_1}
            category="electronics"
          />
          <CardLayout
            title="Men's Clothing"
            image={image_card_2}
            category="men's clothing"
          />
          <CardLayout
            title="Jewelery"
            image={image_card_3}
            category="jewelery"
          />
          <CardLayout
            title="Women's Clothing"
            image={image_card_4}
            category="women's clothing"
          />
          <CardLayout
            title="A whole new way to work"
            image={image_card_5}
            category="electronics"
          />
          <CardLayout
            title="Men's clothing"
            image={image_card_6}
            category="men's clothing"
          />
          <CardLayout
            title="Fashion trends you like"
            image={image_card_7}
            category="women's clothing"
          />
          <CardLayout
            title="Jewelery"
            image={image_card_8}
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
    <div className="col-sm-6 col-lg-4 col-xl-3 card-parent">
      <Card>
        <Card.Title>{title}</Card.Title>
        <Link to={"/products/" + category}>
          <Card.Img variant="top" src={image} />
          <span className="see-more">See more</span>
        </Link>
      </Card>
    </div>
  );
}
