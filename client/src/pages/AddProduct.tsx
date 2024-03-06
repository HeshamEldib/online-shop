import { useDispatch } from "react-redux";
import { useState } from "react";
import { fetchAddProduct } from "../redux/slices/myProductsSlice";

export default function AddProduct() {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(Number);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await dispatch(
      fetchAddProduct({ title, price, category, description, image })
    );
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
