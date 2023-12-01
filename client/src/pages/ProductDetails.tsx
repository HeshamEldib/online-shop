import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../redux/store";
import { fetchProductById } from "../redux/slices/productByIdSlice";
import { fetchAddToCart } from "../redux/slices/cartSlice";
import {
  fetchAddAndUpdateRatings,
  fetchGetRatings,
} from "../redux/slices/ratingsSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { Price } from "./ProductPage";
import { ProductProps } from "../interface";
import { ButLove } from "../components/LoveMenu";

import "./product-details.css";

library.add(fas, far);

export default function ProductDetails() {
  const product = useSelector((state: RootState) => state.productById.product);
  const dispatch = useDispatch();
  const { productId } = useParams();

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, []);

  return (
    <section className="product-details">
      <div className="container">
        <div className="row">
          <div className="col-5">
            <ProductImages product={product} />
          </div>
          <div className="col-7">
            <ProductContent product={product} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductImages({ product }: ProductProps) {
  return (
    <div className="images">
      <img src="../public/product.jpg" alt="" />
    </div>
  );
}

function ProductContent({ product }: ProductProps) {
  const dispatch = useDispatch();
  const loveProducts: any[] = useSelector(
    (state: RootState) => state.loveProductsSlice.products[0]
  );

  let active: boolean = false;
  loveProducts?.forEach((e) => {
    if (e._id === product._id) {
      active = true;
    }
  });

  return (
    <div className="product-content">
      <h3 className="title">{product.title}</h3>
      <div className="ratings">
        <span className="rating-rate">{product.rating?.rate}</span>
        <RatingStars rate={product.rating?.rate} />
        <span className="rating-count">{product.rating?.count}</span>
      </div>
      <Price price={product.price} />
      {active ? (
        <ButLove productId={product._id} active="active" />
      ) : (
        <ButLove productId={product._id} active="" />
      )}
      <button onClick={() => dispatch(fetchAddToCart(product._id))}>
        add to cart
      </button>

      <Ratings />
      <Comments />
    </div>
  );
}

interface RatingStarsProps {
  rate: number;
}
function RatingStars({ rate }: RatingStarsProps) {
  const num: number = (rate - Math.floor(rate)) * 10;
  let arr: string[] = ["false", "false", "false", "false", "false"];
  for (let i: number = 0; i < arr.length; i++) {
    if (i <= rate - 1) {
      arr[i] = "true";
    }
  }
  if (num < 3) {
    arr[Math.floor(rate)] = "false";
  } else if (num >= 3 && num <= 8) {
    arr[Math.floor(rate)] = "half";
  } else if (num > 8) {
    arr[Math.floor(rate)] = "true";
  }

  return (
    <div className="rating-stars">
      {arr.map((star, index) => {
        if (star === "false") {
          return (
            <span key={index}>
              <FontAwesomeIcon icon="fa-regular fa-star" />
            </span>
          );
        } else if (star === "true") {
          return (
            <span key={index}>
              <FontAwesomeIcon icon="fa-solid fa-star" />
            </span>
          );
        } else {
          return (
            <span key={index}>
              <FontAwesomeIcon icon="fa-regular fa-star-half-stroke" />
            </span>
          );
        }
      })}
    </div>
  );
}

function Ratings() {
  const rating: number = useSelector((state: RootState) => state.rating.rating);
  const dispatch = useDispatch();
  const { productId } = useParams();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
  };

  const submitRating = (rating: number) => {
    dispatch(fetchAddAndUpdateRatings({ productId, rating }));
  };

  useEffect(() => {
    dispatch(fetchGetRatings(productId));
  }, []);

  const arr = [1, 2, 3, 4, 5];
  return (
    <div className="add-ratings">
      <form onSubmit={(e) => handleSubmit(e)}>
        {arr.map((num: number) => {
          return num <= rating ? (
            <button
              key={num}
              onClick={() => submitRating(num)}
              data-count={num}
              className="active"
            >
              <FontAwesomeIcon icon="fa-solid fa-star" />
            </button>
          ) : (
            <button
              key={num}
              onClick={() => submitRating(num)}
              data-count={num}
            >
              <FontAwesomeIcon icon="fa-regular fa-star" />
            </button>
          );
        })}
      </form>
    </div>
  );
}

function Comments() {
  return <div className="comments"></div>;
}
