import MainMenu, { ContentMenu, HeaderMenu } from "./MainMenu";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { showAndHiddenLove } from "../redux/slices/targetMenu";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight, faHeart } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { fetchUser } from "../redux/slices/userSlice";
import { Price } from "../pages/ProductPage";
import {
  fetchAddLove,
  fetchDeleteLove,
  fetchGetLove,
  removeLoveItem,
} from "../redux/slices/loveProductsSlice";
import "./love-menu.css";

export default function LoveMenu() {
  const showMenu = useSelector((state: RootState) => state.targetMenu.showLove);
  const userLove: string[] = useSelector(
    (state: RootState) => state.user.user.love
  );

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
  // const userLove: string[] = useSelector(
  //   (state: RootState) => state.user.user.love
  // );
  const dispatch = useDispatch();

  const products = useSelector(
    (state: RootState) => state.groupProducts.products[0]
  );

  // console.log("userLove => ", userLove);
  // console.log("products => ", products);

  useEffect(() => {
    // dispatch(fetchUser(localStorage.getItem("userToken")));
    dispatch(fetchGetLove());
  }, []);
  return (
    <div className="products-love">
      {products?.map((product: any, index: number) => (
        <ProductLove product={product} key={"love " + product._id + index} />
      ))}
    </div>
  );
}

interface ProductLoveProps {
  product: any;
}
function ProductLove({ product }: ProductLoveProps) {
  return (
    <div className="product-love">
      <div className="product-content">
        <Link to={"/product/" + product._id}>
          <div className="image">
            <img src="../public/product.jpg" alt="" />
          </div>
        </Link>
        <div className="text">
          <h3 className="title">
            {product.title.slice(0, 50) +
              (product.title.slice(0, 50).length >= 50 ? "..." : "")}
          </h3>
          <Price price={product.price} />
          <ButLove productId={product._id} active="active" />
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

interface ButLoveProps {
  productId: string;
  active: string;
}
export function ButLove({ productId, active }: ButLoveProps) {
  const userLove: string[] = useSelector(
    (state: RootState) => state.user.user.love
  );
  const products = useSelector(
    (state: RootState) => state.groupProducts.products[0]
  );
  const dispatch = useDispatch();
  // const [active, setActive] = useState("");

  useEffect(() => {
    dispatch(fetchUser(localStorage.getItem("userToken")));
    if (userLove?.indexOf(productId) > -1) {
      // setActive("active");
    } else {
      // setActive("");
    }
  }, []);

  const handelClick = async (productId: any) => {
    if (userLove?.indexOf(productId) > -1) {
      for (let i = 0; i < products.length; i++) {
        if (products[i]._id === productId) {
          dispatch(removeLoveItem(i));
        }
      }
      dispatch(fetchDeleteLove(productId));

      // setActive("active");
      // console.log("Active =>", active);
    } else {
      dispatch(fetchAddLove(productId));

      // setActive("");
      // console.log("Active =>", active);
    }
  };

  return (
    <button
      className={`but-love ${active}`}
      onClick={() => handelClick(productId)}
    >
      <FontAwesomeIcon icon={faHeart} />
    </button>
  );
}
