import { ButLove } from "../components/LoveMenu";

export default function ProductPage() {
  return (
    <search className="product-page">
      <Bar />
      <Products />
    </search>
  );
}

function Bar() {
  return (
    <div className="product-page">
      <ul>
        <li>
          <button>all</button>
        </li>
      </ul>
    </div>
  );
}

function Products() {
  return (
    <div className="products">
      <div className="row">
        <ProductItem />
      </div>
    </div>
  );
}

function ProductItem() {
  return (
    <div className="col-4">
      <div className="product-item">
        <div className="image">
          <img src="../public/product.jpg" alt="" />
        </div>
        <div className="info">
          <div className="info-top">
            <span className="price">$ 108</span>
            <ButLove />
          </div>
          <h3 className="title">
            FelixKing Ergonomic Office Chair, Headrest Desk Chair
          </h3>
        </div>
      </div>
    </div>
  );
}
