import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainMenu, { ContentMenu, HeaderMenu } from "./MainMenu";
import { RootState } from "../redux/store";
import { showAndHiddenLove } from "../redux/slices/targetMenu";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { Price } from "../pages/ProductPage";
import {
  fetchAddLove,
  fetchDeleteLove,
  fetchGetLove,
} from "../redux/slices/loveProductsSlice";
import { ProductIdProps, ProductProps } from "../interface";
import { MainURL, UserToken } from "../constant";

import "./love-menu.css";

export default function LoveMenu() {
  const showMenu = useSelector((state: RootState) => state.targetMenu.showLove);

  return (
    <div className="love-menu">
      <MainMenu
        showMenu={showMenu}
        action={showAndHiddenLove}
        actionTwo={fetchGetLove}
      >
        <ContentMenu action={showAndHiddenLove}>
          <HeaderMenu />
          <ProductsLove />
        </ContentMenu>
      </MainMenu>
    </div>
  );
}

function ProductsLove() {
  const dispatch = useDispatch();

  const products = useSelector(
    (state: RootState) => state.loveProductsSlice.products
  );

  useEffect(() => {
    if (!UserToken) {
      dispatch(fetchGetLove());
    }
  }, []);
  return (
    <div className="products-love">
      {products?.map((product: any, index: number) => (
        <ProductLove product={product} key={"love " + product._id + index} />
      ))}
    </div>
  );
}

function ProductLove({ product }: ProductProps) {
  return (
    <div className="product-love">
      <div className="product-content">
        <Link to={"/product/" + product._id}>
          <div className="image">
            <img src={MainURL + product.image} alt="" />
          </div>
        </Link>
        <div className="text">
          <h3 className="title">
            {product.title.slice(0, 50) +
              (product.title.slice(0, 50).length >= 50 ? "..." : "")}
          </h3>
          <Price price={product.price} />
          <ButLoveContent productId={product._id} active="active" />
        </div>
        <Link to={`/product/${product._id}`}>
          <button className="but-go">
            <FontAwesomeIcon icon={faAnglesRight} />
          </button>
        </Link>
      </div>
    </div>
  );
}

interface ButLoveContentProps {
  productId: string;
  active: string;
}
function ButLoveContent({ productId, active }: ButLoveContentProps) {
  const products = useSelector(
    (state: RootState) => state.loveProductsSlice.products
  );

  const dispatch = useDispatch();

  const handelClick = (productId: any) => {
    if (UserToken) {
      location.href = "/signin";
    } else {
      let findProduct: Boolean = false;
      products?.forEach((product: any) => {
        if (product._id === productId) {
          findProduct = true;
          return dispatch(fetchDeleteLove(productId));
        }
      });

      if (!findProduct) {
        return dispatch(fetchAddLove(productId));
      }
    }
  };

  return (
    <button
      className={`but-love ${active}`}
      onClick={() => handelClick(productId)}
    >
      {active !== "" ? (
        <FontAwesomeIcon icon="fa-solid fa-heart" />
      ) : (
        <FontAwesomeIcon icon="fa-regular fa-heart" />
      )}
    </button>
  );
}

export function ButLove({ productId }: ProductIdProps) {
  const loveProducts: any[] = useSelector(
    (state: RootState) => state.loveProductsSlice.products
  );

  let active: boolean = false;
  loveProducts?.forEach((e) => {
    if (e._id === productId) {
      active = true;
    }
  });

  return (
    <>
      {active ? (
        <ButLoveContent productId={productId} active="active" />
      ) : (
        <ButLoveContent productId={productId} active="" />
      )}
    </>
  );
}
