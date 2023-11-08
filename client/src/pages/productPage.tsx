import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../redux/store";
import { fetchProducts } from "../redux/slices/productsSlice";
import { ButLove } from "../components/LoveMenu";

import "./product-page.css";

export default function ProductPage() {
  return (
    <search className="product-page">
      <div className="container">
        <Bar />
        <Products />
      </div>
    </search>
  );
}

function Bar() {
  return (
    <div className="ranking">
      <ul>
        <li>
          <button>all</button>
        </li>
        <li>
          <button>all</button>
        </li>
      </ul>
    </div>
  );
}

function Products() {
  const products = useSelector(
    (state: RootState) => state.products.products[0]
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <div className="products">
      <div className="row">
        {products?.map((product: any) => {
          return <ProductItem product={product} key={product._id} />;
        })}
      </div>
    </div>
  );
}

interface ProductItemProps {
  product: any;
}
function ProductItem({ product }: ProductItemProps) {
  return (
    <div className="col-4 col-md-3 col-xl-2 product-parent">
      <div className="product-item">
        <Link to={"/product/" + product._id}>
          <div className="image">
            <img src="../public/product.jpg" alt="" />
          </div>
          <div className="info">
            <div className="info-top">
              <Price price={product.price} />
              <ButLove />
            </div>
            <h3 className="title">
              {product.title.slice(0, 50) +
                (product.title.slice(0, 50).length >= 50 ? "..." : "")}
            </h3>
          </div>
        </Link>
      </div>
    </div>
  );
}

interface PriceProps {
  price: number;
}
export function Price({ price }: PriceProps) {
  return (
    <div className="price">
      <span className="price-currency">$</span>
      <span className="price-value">{price}</span>
    </div>
  );
}
