import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { RootState } from "../redux/store";
import { fetchProductById } from "../redux/slices/productByIdSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { Price } from "./ProductPage";
import { fetchAddToCart } from "../redux/slices/cartSlice";
import { ProductProps } from "../interface";

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
  return (
    <div className="product-content">
      <h3 className="title">{product.title}</h3>
      <div className="ratings">
        <span className="rating-rate">{product.rating?.rate}</span>
        <RatingStars rate={product.rating?.rate} />
        <span className="rating-count">{product.rating?.count}</span>
      </div>
      <Price price={product.price} />
      <button onClick={() => dispatch(fetchAddToCart(product._id))}>add to cart</button>
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
