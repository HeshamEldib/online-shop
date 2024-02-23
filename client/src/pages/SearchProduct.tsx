import { useParams } from "react-router-dom";
import { Products } from "./ProductPage";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchSearchProduct } from "../redux/slices/productsSlice";

export default function SearchProduct() {
  // const { searchProduct } = useParams();
  // const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(fetchSearchProduct({searchProduct}))
  // },[])
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
  const { searchProduct } = useParams();
  return (
    <div className="search-value">
      <p>
        results for
        <span> "{searchProduct}"</span>
      </p>
    </div>
  );
}
