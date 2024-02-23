import { useDispatch } from "react-redux";
import { useState } from "react";
import { fetchAddProduct } from "../redux/slices/myProductsSlice";

import "./add-product.css";

export default function AddProduct() {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(Number);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    dispatch(fetchAddProduct({ title, price, category, description, image }));
    location.href = "/my-products";
  };

  return (
    <section className="add-product main-form">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <InputString
            title="Product Title"
            name="product-title"
            value={title}
            setValue={(e) => setTitle(e.target.value)}
          />
          <InputNumber
            title="Product Price"
            name="product-price"
            value={price}
            setValue={(e) => setPrice(e.target.value)}
          />
          <InputString
            title="Product Category"
            name="product-category"
            value={category}
            setValue={(e) => setCategory(e.target.value)}
          />
          <TextArea
            title="Product Description"
            name="product-description"
            value={description}
            setValue={(e: any) => setDescription(e.target.value)}
          />
          <UploadImage
            title="Product Image"
            name="product-image"
            setValue={(e) => setImage(e.target.files[0])}
          />
          {/* <label htmlFor="product-title">Product Title</label>
          <input
            type="text"
            name="product-title"
            id="product-title"
            required
            value={title}
            onChange={(e: any) => setTitle(e.target.value)}
          /> */}

          {/* <label htmlFor="product-price">Product Price</label>
          <input
            type="number"
            name="product-price"
            id="product-price"
            required
            value={price}
            onChange={(e: any) => setPrice(e.target.value)}
          /> */}

          {/* <label htmlFor="product-category">Product Category</label>
          <input
            type="text"
            name="product-category"
            id="product-category"
            required
            value={category}
            onChange={(e: any) => setCategory(e.target.value)}
          /> */}

          {/* <label htmlFor="product-description">Product Description</label>
          <textarea
            name="product-description"
            id="product-description"
            required
            minLength={50}
            value={description}
            onChange={(e: any) => setDescription(e.target.value)}
          ></textarea> */}

          {/* <label htmlFor="product-image">Product Image</label>
          <input
            type="file"
            name="product-image"
            id="product-image"
            required
            accept="image/*"
            onChange={(e: any) => setImage(e.target.files[0])}
          /> */}

          <div className="submit">
            <button className="main-button" type="submit">
              Send
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

interface InputStringProps {
  title: string;
  name: string;
  value: string;
  setValue(e: any): void;
}
export function InputString({
  title,
  name,
  value,
  setValue,
}: InputStringProps) {
  return (
    <>
      <label htmlFor={name}>{title}</label>
      <input
        type="text"
        name={name}
        id={name}
        required
        value={value}
        onChange={(e: any) => setValue(e)}
      />
    </>
  );
}
interface InputNumberProps {
  title: string;
  name: string;
  value: number;
  setValue(e: any): void;
}
export function InputNumber({
  title,
  name,
  value,
  setValue,
}: InputNumberProps) {
  return (
    <>
      <label htmlFor={name}>{title}</label>
      <input
        type="number"
        name={name}
        id={name}
        required
        value={value}
        onChange={(e: any) => setValue(e)}
      />
    </>
  );
}
export function TextArea({ title, name, value, setValue }: InputStringProps) {
  return (
    <>
      <label htmlFor={name}>{title}</label>
      <textarea
        name={name}
        id={name}
        required
        minLength={50}
        value={value}
        onChange={(e: any) => setValue(e)}
      ></textarea>
    </>
  );
}
interface UploadImageProps {
  title: string;
  name: string;
  value?: any;
  setValue(e: any): void;
}
export function UploadImage({
  title,
  name,
  value,
  setValue,
}: UploadImageProps) {
  const [file, setFile] = useState("");
  return (
    <div className="upload-image">
      <label htmlFor={name}>{title}</label>
      <input
        type="file"
        name={name}
        id={name}
        required
        value={value}
        accept="image/*"
        onChange={(e: any) => {
          setFile(URL.createObjectURL(e.target.files[0]));
          setValue(e);
        }}
      />

      <img src={file} alt="" />
    </div>
  );
}
