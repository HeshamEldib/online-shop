import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faLeaf } from "@fortawesome/free-solid-svg-icons";
import { ButLove } from "../components/LoveMenu";
import { Price } from "./ProductPage";
import { ProductIdProps, ProductProps } from "../interface";
import {
  fetchCountProduct,
  fetchDeleteFromCart,
  fetchGetAllFromCart,
} from "../redux/slices/cartSlice";
import { Dropdown, DropdownButton, Form } from "react-bootstrap";
import "./cart-page.css";
import {
  fetchAddAllBuying,
  fetchAddBuying,
  fetchDeleteAllBuying,
  fetchDeleteBuying,
  fetchGetAllBuying,
} from "../redux/slices/buyingSlice";

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
        Deselect all items
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
        <img src="../public/product.jpg" alt="" />
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
    <div className="action-buts">
      <QuantityProduct productId={product._id} count={count} />
      <DeleteFromCart productId={product._id} />
      {active ? (
        <ButLove productId={product._id} active="active" />
      ) : (
        <ButLove productId={product._id} active="" />
      )}
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

  const arr: number[] = [1, 2, 3, 4, 5];
  function handleSelect(productId: string, value: number) {
    dispatch(fetchCountProduct({ productId, value }));

    updateCount || setUpdateCount(true);
  }

  return (
    <div className="action-quantity">
      <form onSubmit={handleSubmit}>
        {updateCount && (
          <DropdownButton
            align="end"
            title={`Qty ${count}`}
            id="dropdown-menu-align-end"
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
            <Dropdown.Divider />
            <Dropdown.Item
              as="button"
              className="but-count-product"
              onClick={() => setUpdateCount(false)}
            >
              10 +
            </Dropdown.Item>
          </DropdownButton>
        )}

        {updateCount || (
          <div className="enterCount d-flex">
            <input
              type="number"
              min={1}
              max={50}
              placeholder={`${count}`}
              defaultValue={count}
              onChange={(e) => setCountValue(+e.target.value)}
            />
            <button onClick={() => handleSelect(productId, countValue)}>
              update
            </button>
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

// function ActionLove() {
//   return (
//     <div className="action-love">
//       <button className="but-love">
//         <FontAwesomeIcon icon={faHeart} />
//       </button>
//     </div>
//   );
// }
