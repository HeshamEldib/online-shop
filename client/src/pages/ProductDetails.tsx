import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../redux/store";
import { fetchProductById } from "../redux/slices/productByIdSlice";
import { fetchAddToCart } from "../redux/slices/cartSlice";
import {
  fetchAddAndUpdateRatings,
  fetchGetRatings,
} from "../redux/slices/ratingsSlice";
import {
  a,
  fetchAddComment,
  fetchDeleteComment,
  fetchUpdateComment,
} from "../redux/slices/commentsSlice";
import { Price } from "./ProductPage";
import { ProductProps } from "../interface";
import { ButLove } from "../components/LoveMenu";
import { URL, UserToken } from "../constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import Swal from "sweetalert2";

import "./product-details.css";
import { Method } from "axios";

library.add(fas, far);

export default function ProductDetails() {
  const product = useSelector((state: RootState) => state.productById.product);
  const dispatch = useDispatch();
  const { productId } = useParams();

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, []);

  return (
    <section className="product-details">
      <div className="container">
        <div className="row justify-content-around">
          <div className="col-sm-5 col-lg-4 col-xl-3 text-center">
            <ProductImages product={product} />
          </div>

          <div className="col-sm-6 col-lg-7 col-xl-8 mt-4 mt-sm-0">
            <ProductContent product={product} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductImages({ product }: ProductProps) {
  return (
    <div className="images">
      <img src={URL + product?.image} alt="" />
    </div>
  );
}

function ProductContent({ product }: ProductProps) {
  const dispatch = useDispatch();
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
    <div className="product-content">
      <h3 className="title">{product.title}</h3>
      <div className="ratings">
        <span className="rating-rate">{product.rating?.rate}</span>
        <RatingStars rate={product.rating?.rate} />
        <span className="rating-count">{product.rating?.count} ratings</span>
      </div>
      <Price price={product.price} />
      <div className="buttons">
        <button
          className="main-button"
          onClick={() => dispatch(fetchAddToCart(product._id))}
        >
          add to cart
        </button>
        {active ? (
          <ButLove productId={product._id} active="active" />
        ) : (
          <ButLove productId={product._id} active="" />
        )}
      </div>

      <div className="about">
        <h5>About this item</h5>
        <p>{product.description}</p>
      </div>

      <Ratings />
      <Comments />
    </div>
  );
}

interface RatingStarsProps {
  rate: number;
}
function RatingStars({ rate }: RatingStarsProps) {
  const num: number = (rate - Math.floor(rate)) * 10;
  let arr: string[] = ["false", "false", "false", "false", "false"];
  for (let i: number = 0; i < arr.length; i++) {
    if (i <= rate - 1) {
      arr[i] = "true";
    }
  }
  if (num < 3) {
    arr[Math.floor(rate)] = "false";
  } else if (num >= 3 && num <= 8) {
    arr[Math.floor(rate)] = "half";
  } else if (num > 8) {
    arr[Math.floor(rate)] = "true";
  }

  return (
    <div className="rating-stars">
      {arr.map((star, index) => {
        if (star === "false") {
          return (
            <span key={index}>
              <FontAwesomeIcon icon="fa-regular fa-star" />
            </span>
          );
        } else if (star === "true") {
          return (
            <span key={index}>
              <FontAwesomeIcon icon="fa-solid fa-star" />
            </span>
          );
        } else {
          return (
            <span key={index}>
              <FontAwesomeIcon icon="fa-regular fa-star-half-stroke" />
            </span>
          );
        }
      })}
    </div>
  );
}

function Ratings() {
  const rating: number = useSelector((state: RootState) => state.rating.rating);
  const dispatch = useDispatch();
  const { productId } = useParams();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
  };

  const submitRating = (rating: number) => {
    dispatch(fetchAddAndUpdateRatings({ productId, rating }));
  };

  useEffect(() => {
    dispatch(fetchGetRatings(productId));
  }, []);

  const arr = [1, 2, 3, 4, 5];
  return (
    <div className="add-ratings">
      <h6>my rating:</h6>
      <form onSubmit={(e) => handleSubmit(e)}>
        {arr.map((num: number) => {
          return num <= rating ? (
            <button
              key={num}
              onClick={() => submitRating(num)}
              data-count={num}
              className="active"
            >
              <FontAwesomeIcon icon="fa-solid fa-star" />
            </button>
          ) : (
            <button
              key={num}
              onClick={() => submitRating(num)}
              data-count={num}
            >
              <FontAwesomeIcon icon="fa-regular fa-star" />
            </button>
          );
        })}
      </form>
    </div>
  );
}

function Comments() {
  return (
    <div className="comments">
      <AddComment />
      <ViewComments />
    </div>
  );
}

function AddComment() {
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const { productId } = useParams();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
  };
  const submitComment = async () => {
    dispatch(fetchAddComment({ productId, comment: content }));
  };

  return (
    <div className="add-comment">
      <form onSubmit={(e) => handleSubmit(e)}>
        <textarea
          name="add-comment"
          placeholder="Enter the comment"
          required
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <UploadButton uploadMethod={submitComment} />
      </form>
    </div>
  );
}

function ViewComments() {
  const comments: any[] = useSelector(
    (state: RootState) => state.productById.product.comment
  );

  return (
    <div className="view-comments">
      {comments?.map((comment: any) => {
        return <ViewComment key={comment?._id} comment={comment} />;
      })}
    </div>
  );
}

interface ViewCommentProps {
  comment: any;
}
function ViewComment({ comment }: ViewCommentProps) {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const [user, setUser] = useState({ avatar: "", userName: "" });
  const [userCreated, setUserCreated] = useState(false);

  useEffect(() => {
    const user = async () => {
      const res = await fetch(`${URL}api/users/${comment.author}`);
      const data = await res.json();
      setUser(data.data.user);
    };
    user();

    if (comment.author === UserToken) {
      setUserCreated(true);
    }
  }, []);

  const deleteComment = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        dispatch(fetchDeleteComment({ productId, commentId: comment._id }));
      }
    });
  };

  const [update, setUpdate] = useState(false);
  const updateComment = () => {
    setUpdate(true);
  };

  const [content, setContent] = useState(comment.content);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
  };
  const submitComment = async () => {
    dispatch(
      fetchUpdateComment({
        productId,
        commentId: comment._id,
        newComment: content,
      })
    );
    setUpdate(false);
  };

  return (
    <div className="view-comment">
      <div className="user-info">
        <div className="avatar">
          <img src={URL + user?.avatar} className="main-avatar" alt="" />
        </div>
        <div className="info">
          <h5>{user?.userName}</h5>
        </div>
      </div>

      {update ? (
        <div className="update-comment add-comment my-1">
          <form onSubmit={(e) => handleSubmit(e)}>
            <textarea
              name="add-comment"
              placeholder="Enter the comment"
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <UploadButton uploadMethod={submitComment} />
          </form>
        </div>
      ) : (
        <div className="content-comment">
          <p className="date">done write comment on: {comment.date}</p>
          <p className="content">{comment.content}</p>
        </div>
      )}

      {userCreated && (
        <div className="comment-action">
          <button
            className="main-button delete"
            onClick={() => deleteComment()}
          >
            Delete
          </button>
          <button
            className="main-button update"
            onClick={() => updateComment()}
          >
            Update
          </button>
        </div>
      )}
    </div>
  );
}

// Update Button
interface UploadButtonProps {
  uploadMethod(): any;
}
export function UploadButton({ uploadMethod }: UploadButtonProps) {
  return (
    <button className="main-button" onClick={() => uploadMethod()}>
      <FontAwesomeIcon icon="fa-solid fa-paper-plane" />
    </button>
  );
}
