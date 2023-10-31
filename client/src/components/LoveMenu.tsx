import MainMenu, { ContentMenu, HeaderMenu } from "./MainMenu";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { showAndHiddenLove } from "../redux/slices/targetMenu";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import "./love-menu.css";

export default function LoveMenu() {
  const showMenu = useSelector((state: RootState) => state.targetMenu.showLove);

  return (
    <div className="love-menu">
      <MainMenu showMenu={showMenu} action={showAndHiddenLove}>
        <ContentMenu action={showAndHiddenLove}>
          <HeaderMenu />
          <ProductsLove />
        </ContentMenu>
      </MainMenu>
    </div>
  );
}

function ProductsLove() {
  return (
    <div className="products-love">
      <ProductLove />
      <ProductLove />
      <ProductLove />
      <ProductLove />
      <ProductLove />
      <ProductLove />
      <ProductLove />
      <ProductLove />
      <ProductLove />
      <ProductLove />
      <ProductLove />
      <ProductLove />
    </div>
  );
}
function ProductLove() {
  return (
    <div className="product-love">
      <Link to="/">
        <div className="image">
          <img src="../public/product.jpg" alt="" />
        </div>
        <div className="text">
          <h3 className="title">FelixKing Ergonomic Office Chair, Headrest Desk Chair</h3>
          <span className="price">180 $</span>
        </div>
        <button className="but-go">
          <FontAwesomeIcon icon={faAnglesRight} />
        </button>
      </Link>
    </div>
  );
}
