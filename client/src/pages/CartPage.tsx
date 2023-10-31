import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./cart-page.css";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export default function Cart() {
  return (
    <section className="cart-page">
      <div className="row">
        <div className="col-8">
          <CartContent />
        </div>
        <div className="col-4"></div>
      </div>
    </section>
  );
}

function CartContent() {
  return (
    <div className="cart-content">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <button className="target-all-items">Deselect all items</button>
      </div>
      <ProductsCart />
    </div>
  );
}
function ProductsCart() {
  return (
    <div className="products-cart">
      <ProductCart />
      <ProductCart />
      <ProductCart />
      <ProductCart />
      <ProductCart />
    </div>
  );
}

function ProductCart() {
  return (
    <div className="product-cart">
      <div className="target"></div>
      <div className="image">
        <img src="../public/product.jpg" alt="" />
      </div>
      <div className="text">
        <h2 className="title">
          LANDOMIA Ergonomic Office Desk Chair - Mesh Office Chair
        </h2>
        <div className="price">$ 143</div>
        <ActionButs />
      </div>
    </div>
  );
}

function ActionButs() {
  return (
    <div className="action-buts">
      <div className="action-quantity"></div>
      <div className="action-delete">
        <button className="but-delete">Delete</button>
      </div>
      <ActionLove />
    </div>
  );
}
function ActionLove() {
  return (
    <div className="action-love">
      <button className="but-love">
        <FontAwesomeIcon icon={faHeart} />
      </button>
    </div>
  );
}
