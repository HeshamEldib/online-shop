import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Pagination as PaginationBoot } from "react-bootstrap";
import { RootState } from "../redux/store";
import { fetchProducts } from "../redux/slices/productsSlice";
import { ButLove } from "../components/LoveMenu";
import { ChildrenProps } from "../interface";
import { MainURL, categoryList } from "../constant";

import "./product-page.css";

export default function ProductPage() {
  const totalPages: number = useSelector(
    (state: RootState) => state.products.totalPages
  );

  const dispatch = useDispatch();
  const categoryFromURL = useParams()["*"];
  useEffect(() => {
    dispatch(fetchProducts({ category: categoryFromURL }));
  }, []);

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

  // handel button active to pass from home
  const categoryFromURL = useParams()["*"];
  const handelButAuto = () => {
    document.querySelectorAll(".category button").forEach((but: any) => {
      but.classList.remove("active");
      if (
        but.dataset.category === categoryFromURL ||
        (but.dataset.category === "all" && categoryFromURL === "")
      ) {
        but.classList.add("active");
      }
    });
  };

  useEffect(() => {
    handelButAuto();
  }, []);

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

export function Products() {
  const products = useSelector((state: RootState) => state.products.products);

  // const dispatch = useDispatch();
  // const categoryFromURL = useParams()["*"];
  // useEffect(() => {
  //   dispatch(fetchProducts({ category: categoryFromURL }));
  // }, []);

  return (
    <div className="products">
      <div className="row">
        {products?.map((product: any) => {
          return (
            <ProductItem key={"product-page" + product._id}>
              <Link to={"/product/" + product._id}>
                <ProductImage image={product.image} />
                <ProductItemInfo>
                  <ProductInfoTop>
                    <Price price={product.price} />
                    <ButLove productId={product._id} />
                  </ProductInfoTop>

                  <ProductTitle title={product.title} />
                </ProductItemInfo>
              </Link>
            </ProductItem>
          );
        })}
      </div>
    </div>
  );
}

export function ProductItem({ children }: ChildrenProps) {
  return (
    <div className="col-6 col-sm-4 col-md-3 col-xl-2 product-parent">
      <div className="product-item">{children}</div>
    </div>
  );
}

interface ProductImageProps {
  image: string;
}
export function ProductImage({ image }: ProductImageProps) {
  return (
    <div className="image">
      <img src={MainURL + image} alt="" />
    </div>
  );
}

export function ProductItemInfo({ children }: ChildrenProps) {
  return <div className="info">{children}</div>;
}

export function ProductInfoTop({ children }: ChildrenProps) {
  return <div className="info-top">{children}</div>;
}

interface ProductTitleProps {
  title: string;
}
export function ProductTitle({ title }: ProductTitleProps) {
  return (
    <h3 className="title">
      {title.slice(0, 50) + (title.slice(0, 50).length >= 50 ? "..." : "")}
    </h3>
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
    <PaginationBoot className="justify-content-center">
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

// price
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
