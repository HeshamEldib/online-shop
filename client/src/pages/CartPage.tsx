import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ButLove } from "../components/LoveMenu";
import { Price } from "./ProductPage";
import { ProductIdProps } from "../interface";
import {
  fetchCountProduct,
  fetchDeleteFromCart,
  fetchGetAllFromCart,
} from "../redux/slices/cartSlice";
import {
  fetchAddAllBuying,
  fetchAddBuying,
  fetchDeleteAllBuying,
  fetchDeleteBuying,
  fetchGetAllBuying,
} from "../redux/slices/buyingSlice";
import { Dropdown, DropdownButton, Form } from "react-bootstrap";
import { MainURL } from "../constant";
import { UploadButton } from "./ProductDetails";
import "./cart-page.css";

export default function Cart() {
  return (
    <section className="cart-page">
      <div className="row flex-column-reverse flex-md-row">
        <div className="col-md-8">
          <CartContent />
        </div>
        <div className="col-md-4 mb-3">
          <ProceedToCheckout />
        </div>
      </div>
    </section>
  );
}

function CartContent() {
  return (
    <div className="cart-content">
      <CartContentHeader />
      <ProductsCart />
      <PriceTargetProducts />
    </div>
  );
}

function CartContentHeader() {
  const productsCart: any[] = useSelector((state: RootState) =>
    state.cart.products[0] !== undefined ? state.cart.products[0] : undefined
  );

  const productsBuying: any[] = useSelector((state: RootState) =>
    state.buying.products[0] !== undefined
      ? state.buying.products[0]
      : undefined
  );
  const dispatch = useDispatch();

  const targetAllItems = () => {
    if (productsCart?.length === productsBuying?.length) {
      dispatch(fetchDeleteAllBuying());
    } else {
      dispatch(fetchAddAllBuying());
    }
  };

  return (
    <div className="cart-header">
      <h1>Shopping Cart</h1>
      <button className="target-all-items" onClick={() => targetAllItems()}>
        {productsCart?.length === productsBuying?.length ? (
          <>Deselect all items</>
        ) : (
          <>Select all items</>
        )}
      </button>
    </div>
  );
}

function ProductsCart() {
  const products = useSelector((state: RootState) =>
    state.cart.products[0] !== undefined ? state.cart.products[0] : undefined
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetAllFromCart());
  }, []);

  return (
    <div className="products-cart">
      {products?.map((item: any, index: number) => {
        return (
          <ProductCart
            product={item.product}
            count={item.count}
            key={item.product._id + index}
          />
        );
      })}
    </div>
  );
}

interface ProductCartProps {
  product: any;
  count: number;
}
function ProductCart({ product, count }: ProductCartProps) {
  return (
    <div className="product-cart">
      <Buying product={product} count={count} />
      <div className="image">
        <img src={MainURL + product.image} alt="" />
      </div>
      <div className="text">
        <h2 className="title">{product.title}</h2>
        <Price price={product.price} />
        <ActionButs product={product} count={count} />
      </div>
    </div>
  );
}

function Buying({ product, count }: ProductCartProps) {
  const productsBuying: any[] = useSelector((state: RootState) =>
    state.buying.products[0] !== undefined
      ? state.buying.products[0]
      : undefined
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetAllBuying());
  }, []);

  let find: boolean = false;
  productsBuying?.forEach((item: any) => {
    if (product._id === item.product._id) {
      return (find = true);
    }
  });

  const targetProduct = (e: any) => {
    if (e.target.checked) {
      dispatch(fetchAddBuying({ productId: product._id, count }));
      dispatch(fetchGetAllBuying());
    } else {
      dispatch(fetchDeleteBuying(product._id));
    }
  };

  return (
    <div className="buying">
      <Form>
        <Form.Check
          inline
          name="buying-products"
          type="checkbox"
          id={`inline-1`}
          checked={find}
          onChange={(e) => targetProduct(e)}
        />
      </Form>
    </div>
  );
}

function ActionButs({ product, count }: ProductCartProps) {
  return (
    <div className="action-buts">
      <QuantityProduct productId={product._id} count={count} />
      <ButLove productId={product._id} />
      <DeleteFromCart productId={product._id} />
    </div>
  );
}

function DeleteFromCart({ productId }: ProductIdProps) {
  const dispatch = useDispatch();

  return (
    <div className="action-delete">
      <button
        className="but-delete"
        onClick={() => dispatch(fetchDeleteFromCart(productId))}
      >
        Delete
      </button>
    </div>
  );
}

interface ProductIdCartProps {
  productId: string;
  count: number;
}
function QuantityProduct({ productId, count }: ProductIdCartProps) {
  const dispatch = useDispatch();
  const [updateCount, setUpdateCount] = useState(true);
  const [countValue, setCountValue] = useState(count);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
  };

  const arr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const handleSelect: any = (productId: string, value: number): void => {
    dispatch(fetchCountProduct({ productId, value }));

    updateCount || setUpdateCount(true);
  };

  return (
    <div className="action-quantity">
      <form onSubmit={handleSubmit}>
        {updateCount && (
          <DropdownButton
            align="end"
            title={`Qty ${count}`}
            id="dropdown-menu-align-end"
            className="but-quantity"
          >
            {arr.map((num: number) => {
              return (
                <Dropdown.Item
                  as="button"
                  className={
                    count === num
                      ? "but-count-product checked"
                      : "but-count-product"
                  }
                  value={0}
                  key={num}
                  onClick={() => handleSelect(productId, num)}
                >
                  {num}
                </Dropdown.Item>
              );
            })}
            <Dropdown.Item
              as="button"
              className="but-count-product add-more"
              onClick={() => setUpdateCount(false)}
            >
              10 +
            </Dropdown.Item>
          </DropdownButton>
        )}

        {updateCount || (
          <div className="enter-count d-flex">
            <input
              type="number"
              min={1}
              max={50}
              placeholder={`${count}`}
              defaultValue={count}
              onChange={(e) => setCountValue(+e.target.value)}
            />
            <UploadButton
              buttonAction={() => handleSelect(productId, countValue)}
            />
          </div>
        )}
      </form>
    </div>
  );
}

function PriceTargetProducts() {
  const productsBuying: any[] = useSelector((state: RootState) =>
    state.buying.products[0] !== undefined
      ? state.buying.products[0]
      : undefined
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetAllBuying());
  }, []);

  const calcPrice = () => {
    let count: number = 0;
    let price: number = 0;
    productsBuying?.forEach((item: any) => {
      count += item.count;
      price += item.count * item.product.price;
    });
    return { count, price };
  };

  return (
    <div className="price-target-product">
      {calcPrice().count === 0 ? (
        <div>
          <span>No items selected</span>
        </div>
      ) : (
        <div>
          <span>
            Subtotal
            <span>({calcPrice().count} items)</span>:
          </span>
          <Price price={calcPrice().price} />
        </div>
      )}
    </div>
  );
}

function ProceedToCheckout() {
  const checkOutCart = () => {
    console.log("Check out OnlineShop Cart");
  };

  return (
    <div className="proceed-to-checkout">
      <PriceTargetProducts />

      <button className="main-button" onClick={() => checkOutCart()}>
        Check out OnlineShop Cart
      </button>
    </div>
  );
}
