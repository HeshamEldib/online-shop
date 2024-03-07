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
  fetchAddComment,
  fetchDeleteComment,
  fetchUpdateComment,
} from "../redux/slices/commentsSlice";
import { Price } from "./ProductPage";
import {
  ButtonActionProps,
  CommentProps,
  ProductIdProps,
  ProductProps,
} from "../interface";
import { ButLove } from "../components/LoveMenu";
import { CheckUserToken, MainURL, UserToken } from "../constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { findIconDefinition, library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import Swal from "sweetalert2";
// import { IconProp } from "@fortawesome/fontawesome-svg-core";

import "./product-details.css";

library.add(fas, far);
const starSolid = findIconDefinition({ prefix: "fas", iconName: "star" });
const starRegular = findIconDefinition({ prefix: "far", iconName: "star" });
const starHalf = findIconDefinition({
  prefix: "far",
  iconName: "star-half-stroke",
});
const paper = findIconDefinition({ prefix: "far", iconName: "paper-plane" });
// const f = findIconDefinition()
{
  /* <FontAwesomeIcon icon="fa-regular fa-star" /> */
}

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
          <div className="col-md-5 col-lg-4 text-center">
            <ProductImages product={product} />
          </div>

          <div className="col-md-6 col-lg-7 mt-4 mt-md-0">
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
      <img src={MainURL + product?.image} alt="" />
    </div>
  );
}

function ProductContent({ product }: ProductProps) {
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
        <AddCart productId={product._id} />
        <ButLove productId={product._id} />
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

// add cart
function AddCart({ productId }: ProductIdProps) {
  const dispatch = useDispatch();

  const addCartMethod = () => {
    if (CheckUserToken) {
      dispatch(fetchAddToCart(productId));
    } else {
      location.href = "/signin";
    }
  };
  return (
    <button className="main-button" onClick={addCartMethod}>
      add to cart
    </button>
  );
}

interface RatingStarsProps {
  rate: number;
}
function RatingStars({ rate }: RatingStarsProps) {
  // The number before the sign
  const numBeforeSign: number = Math.floor(rate);
  // The number after the sign
  const numAfterSign: number = (rate - numBeforeSign) * 10;
  // array of start
  let arrStart: string[] = ["false", "false", "false", "false", "false"];
  // the start is done
  for (let i: number = 0; i < arrStart.length; i++) {
    if (i <= rate - 1) {
      arrStart[i] = "true";
    }
  }

  // the half start
  if (numBeforeSign < 5) {
    if (numAfterSign < 3) {
      arrStart[numBeforeSign] = "false";
    } else if (numAfterSign >= 3 && numAfterSign <= 8) {
      arrStart[numBeforeSign] = "half";
    } else if (numAfterSign > 8) {
      arrStart[numBeforeSign] = "true";
    }
  }

  return (
    <div className="rating-stars">
      {arrStart.map((star, index) => {
        if (star === "false") {
          return (
            <span key={index}>
              <FontAwesomeIcon icon={starRegular} />
              {/* <FontAwesomeIcon icon={"fa-regular fa-star" as IconProp} /> */}
            </span>
          );
        } else if (star === "true") {
          return (
            <span key={index}>
              <FontAwesomeIcon icon={starSolid} />
              {/* <FontAwesomeIcon icon="fa-solid fa-star" /> */}
            </span>
          );
        } else {
          return (
            <span key={index}>
              <FontAwesomeIcon icon={starHalf} />
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
    if (CheckUserToken) {
      dispatch(fetchAddAndUpdateRatings({ productId, rating }));
    } else {
      location.href = "/signin";
    }
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
              <FontAwesomeIcon icon={starSolid} />
              {/* <FontAwesomeIcon icon="fa-solid fa-star" /> */}
            </button>
          ) : (
            <button
              key={num}
              onClick={() => submitRating(num)}
              data-count={num}
            >
              <FontAwesomeIcon icon={starRegular} />
              {/* <FontAwesomeIcon icon="fa-regular fa-star" /> */}
            </button>
          );
        })}
      </form>
    </div>
  );
}

// comments
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
    if (CheckUserToken) {
      dispatch(fetchAddComment({ productId, comment: content }));
    } else {
      location.href = "/signin";
    }
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
        <UploadButton buttonAction={submitComment} />
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

function ViewComment({ comment }: CommentProps) {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const [userCreated, setUserCreated] = useState(false);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    if (comment.author === UserToken) {
      setUserCreated(true);
    }
  }, []);

  return (
    <div className="view-comment">
      <CommentAuthor comment={comment} />

      {update ? (
        <UpdateComment comment={comment} setUpdate={() => setUpdate(false)} />
      ) : (
        <CommentContent comment={comment} />
      )}

      {userCreated && (
        <div className="comment-action">
          <ButDelete
            buttonAction={() =>
              dispatch(
                fetchDeleteComment({ productId, commentId: comment._id })
              )
            }
          />
          <ButUpdate buttonAction={() => setUpdate(true)} />
        </div>
      )}
    </div>
  );
}

function CommentAuthor({ comment }: CommentProps) {
  const [user, setUser] = useState({ avatar: "", userName: "" });

  useEffect(() => {
    const user = async () => {
      const res = await fetch(`${MainURL}api/users/${comment.author}`);
      const data = await res.json();
      setUser(data.data.user);
    };
    user();
  }, []);
  return (
    <div className="user-info">
      <div className="avatar">
        <img src={MainURL + user?.avatar} className="main-avatar" alt="" />
      </div>
      <div className="info">
        <h5>{user?.userName}</h5>
      </div>
    </div>
  );
}

interface UpdateCommentProps {
  comment: any;
  setUpdate(): any;
}
function UpdateComment({ comment, setUpdate }: UpdateCommentProps) {
  const dispatch = useDispatch();
  const { productId } = useParams();

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
    setUpdate();
  };

  return (
    <div className="update-comment add-comment my-1">
      <form onSubmit={(e) => handleSubmit(e)}>
        <textarea
          name="add-comment"
          placeholder="Enter the comment"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <UploadButton buttonAction={submitComment} />
      </form>
    </div>
  );
}
function CommentContent({ comment }: CommentProps) {
  return (
    <div className="content-comment">
      <p className="date">done write comment on: {comment.date}</p>
      <p className="content">{comment.content}</p>
    </div>
  );
}

// update button
export function ButUpdate({ buttonAction }: ButtonActionProps) {
  return (
    <button className="main-button update" onClick={() => buttonAction()}>
      Update
    </button>
  );
}

// delete button
export function ButDelete({ buttonAction }: ButtonActionProps) {
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
        buttonAction();
      }
    });
  };

  return (
    <button className="main-button delete" onClick={() => deleteComment()}>
      Delete
    </button>
  );
}

// Upload Button
export function UploadButton({ buttonAction }: ButtonActionProps) {
  return (
    <button className="main-button" onClick={() => buttonAction()}>
      <FontAwesomeIcon icon={paper} />
      {/* <FontAwesomeIcon icon="fa-solid fa-paper-plane" /> */}
    </button>
  );
}
