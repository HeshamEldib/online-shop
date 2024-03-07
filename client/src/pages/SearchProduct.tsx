import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchSearchProduct } from "../redux/slices/productsSlice";
import { Products } from "./ProductsPage";

import "./search-product.css";

export default function SearchProduct() {
  const { searchQuery } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSearchProduct({ searchQuery }));
  }, []);
  return (
    <section className="search-product">
      <div className="container">
        <SearchValue />

        <Products />
      </div>
    </section>
  );
}

function SearchValue() {
  const { searchQuery } = useParams();
  return (
    <div className="search-value">
      <p>
        results for
        <span> "{searchQuery}"</span>
      </p>
    </div>
  );
}
