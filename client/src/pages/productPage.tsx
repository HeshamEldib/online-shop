import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../redux/store";
import { fetchProducts } from "../redux/slices/productsSlice";
import { ButLove } from "../components/LoveMenu";
import { ProductProps } from "../interface";
import { Pagination as PaginationBoot } from "react-bootstrap";

import "./product-page.css";
import { categoryList } from "../constant";

export default function ProductPage() {
  const totalPages: number = useSelector(
    (state: RootState) => state.products.totalPages
  );
  return (
    <search className="product-page">
      <div className="container">
        <Category />
        <Products />
        {totalPages > 1 && <Pagination />}
      </div>
    </search>
  );
}

function Category() {
  const dispatch = useDispatch();

  const handelCategory = (e: any) => {
    let buttons =
      e.target.parentElement.parentElement.querySelectorAll("button.active");
    buttons.forEach((but: any) => {
      but.classList.remove("active");
    });
    e.target.classList.add("active");
    dispatch(fetchProducts({ category: e.target.dataset.category }));
  };

  return (
    <div className="category">
      <ul>
        <li>
          <button
            className="active"
            onClick={(e) => handelCategory(e)}
            data-category="all"
          >
            all
          </button>
        </li>
        {categoryList.map((item: string) => {
          return (
            <li key={item}>
              <button onClick={(e) => handelCategory(e)} data-category={item}>
                {item}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Products() {
  const products = useSelector((state: RootState) => state.products.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <div className="products">
      <div className="row">
        {products?.map((product: any) => {
          return (
            <ProductItem product={product} key={"product-page" + product._id} />
          );
        })}
      </div>
    </div>
  );
}

function ProductItem({ product }: ProductProps) {
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
    <div className="col-4 col-md-3 col-xl-2 product-parent">
      <div className="product-item">
        <Link to={"/product/" + product._id}>
          <div className="image">
            <img src="../public/product.jpg" alt="" />
          </div>
          <div className="info">
            <div className="info-top">
              <Price price={product.price} />

              {active ? (
                <ButLove productId={product._id} active="active" />
              ) : (
                <ButLove productId={product._id} active="" />
              )}
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

function Pagination() {
  const dispatch = useDispatch();

  const totalPages: number = useSelector(
    (state: RootState) => state.products.totalPages
  );
  const currentPage: number = useSelector(
    (state: RootState) => state.products.currentPage
  );

  const handelProductsPage = (page: number) => {
    dispatch(fetchProducts({ page }));
  };

  const arrayOfTotalPages: number[] = Array.from(
    Array(totalPages).keys(),
    (_, i) => i + 1
  );

  return (
    <PaginationBoot>
      <PaginationBoot.First
        disabled={currentPage === 1}
        onClick={() => handelProductsPage(1)}
      />
      <PaginationBoot.Prev
        disabled={currentPage === 1}
        onClick={() => handelProductsPage(currentPage - 1)}
      />
      {arrayOfTotalPages.map((e: number) => {
        return (
          <PaginationBoot.Item
            key={e}
            active={currentPage === e}
            onClick={() => handelProductsPage(e)}
          >
            {e}
          </PaginationBoot.Item>
        );
      })}

      <PaginationBoot.Next
        disabled={currentPage === totalPages}
        onClick={() => handelProductsPage(currentPage + 1)}
      />
      <PaginationBoot.Last
        disabled={currentPage === totalPages}
        onClick={() => handelProductsPage(totalPages)}
      />
    </PaginationBoot>
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
