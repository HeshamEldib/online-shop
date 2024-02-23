import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { fetchProductById } from "../redux/slices/productByIdSlice";
import { useParams } from "react-router-dom";
import { fetchUpdateProduct } from "../redux/slices/myProductsSlice";
import { ProductProps } from "../interface";
import { MainURL } from "../constant";

export default function UpdateProduct() {
  const product: any = useSelector((state: RootState) => {
    return state.productById.product;
  });

  const dispatch = useDispatch();
  const { productId } = useParams();

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, []);

  return (
    <section className="update-product main-form">
      <div className="container">
        {product?.title && <UpdateForm product={product} />}
      </div>
    </section>
  );
}

function UpdateForm({ product }: ProductProps) {
  const dispatch = useDispatch();
  const { productId } = useParams();

  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const [category, setCategory] = useState(product.category);
  const [description, setDescription] = useState(product.description);
  const [image, setImage] = useState();
  const [file, setFile] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    dispatch(
      fetchUpdateProduct({
        title,
        price,
        category,
        description,
        image,
        productId,
      })
    );
    location.href = "/my-products";
  };

  return (
    <section className="update-product main-form">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="product-title">Product Title</label>
          <input
            type="text"
            name="product-title"
            id="product-title"
            value={title}
            onChange={(e: any) => setTitle(e.target.value)}
          />

          <label htmlFor="product-price">Product Price</label>
          <input
            type="number"
            name="product-price"
            id="product-price"
            value={price}
            onChange={(e: any) => setPrice(e.target.value)}
          />

          <label htmlFor="product-category">Product Category</label>
          <input
            type="text"
            name="product-category"
            id="product-category"
            value={category}
            onChange={(e: any) => setCategory(e.target.value)}
          />

          <label htmlFor="product-description">Product Description</label>
          <textarea
            name="product-description"
            id="product-description"
            value={description}
            minLength={50}
            onChange={(e: any) => setDescription(e.target.value)}
          ></textarea>

          <div className="upload-image">
            <label htmlFor="product-image">Product Image</label>
            <input
              type="file"
              name="product-image"
              id="product-image"
              accept="image/*"
              onChange={(e: any) => {
                setFile(URL.createObjectURL(e.target.files[0]));
                setImage(e.target.files[0]);
              }}
            />

            <img src={file === "" ? MainURL + product.image : file} alt="" />
          </div>

          <div className="submit">
            <button className="main-button" type="submit">
              Update
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
