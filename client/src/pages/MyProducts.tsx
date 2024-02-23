import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  Price,
  ProductImage,
  ProductInfoTop,
  ProductItem,
  ProductItemInfo,
  ProductTitle,
} from "./ProductPage";
import { ButDelete, ButUpdate } from "./ProductDetails";
import {
  fetchDeleteProduct,
  fetchGetMyProducts,
} from "../redux/slices/myProductsSlice";
import { ProductIdProps } from "../interface";

import "./my-products.css";

export default function MyProducts() {
  const myProducts = useSelector(
    (state: RootState) => state.myProducts.myProducts
  );

  return (
    <section className="my-products">
      <div className="container">
        <ProductsContent length={myProducts?.length} />
      </div>
    </section>
  );
}

interface LengthProps {
  length: number;
}
function ProductsContent({ length }: LengthProps) {
  const myProducts = useSelector(
    (state: RootState) => state.myProducts.myProducts
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetMyProducts());
  }, []);

  return (
    <>
      {length === 0 ? (
        <NotFoundProducts />
      ) : (
        <div className="products">
          <div className="row">
            {myProducts?.map((product: any) => {
              return (
                <ProductItem key={"product-page" + product._id}>
                  <Link to={"/product/" + product._id}>
                    <ProductImage image={product.image} />
                  </Link>
                  <ProductItemInfo>
                    <ProductInfoTop>
                      <Price price={product.price} />
                    </ProductInfoTop>

                    <ProductTitle title={product.title} />
                  </ProductItemInfo>
                  <ButControllersProduct productId={product._id} />
                </ProductItem>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

function ButControllersProduct({ productId }: ProductIdProps) {
  const dispatch = useDispatch();
  const deleteProduct = () => {
    dispatch(fetchDeleteProduct(productId));
  };
  return (
    <div className="but-controllers-product">
      <ButDelete buttonAction={() => deleteProduct()} />
      <Link to={"/update-product/" + productId}>
        <ButUpdate buttonAction={() => {}} />
      </Link>
    </div>
  );
}

function NotFoundProducts() {
  return (
    <div className="not-fond-products">
      <h4>Not Fond Products.</h4>
      <div>
        <Link to="/add-product" className="main-button">
          add to product
        </Link>
      </div>
    </div>
  );
}
