import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Authorization, URL } from "../../constant";

export const fetchAddComment: any = createAsyncThunk(
  "commentsSlice/fetchAddComment",
  async (newData: any) => {
    const res = await fetch(
      `${URL}/api/products/${newData.productId}/comment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
          Authorization,
        },
        body: JSON.stringify({
          content: newData.comment,
        }),
      }
    );
    const data = await res.json();
    return data.data.comment;
  }
);

export const fetchUpdateComment: any = createAsyncThunk(
  "commentsSlice/fetchUpdateComment",
  async (newData: any) => {
    const res = await fetch(
      `${URL}/api/products/${newData.productId}/comment/${newData.commentId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "Application/json",
          Authorization,
        },
        body: JSON.stringify({
          content: newData.newComment,
        }),
      }
    );
    const data = await res.json();
    return data.data.comment;
  }
);

export const fetchDeleteComment: any = createAsyncThunk(
  "commentsSlice/fetchDeleteComment",
  async (newData: any) => {
    const res = await fetch(
      `${URL}/api/products/${newData.productId}/comment/${newData.commentId}`,
      {
        method: "DELETE",
        headers: {
          Authorization,
        },
      }
    );
    const data = await res.json();
    return data.data.content;
  }
);

export interface CommentSlice {
  comments: any[];
}

// const comments: any[] = useSelector(
//   (state: RootState) => state.productById.product.comment
// );
// const store = configureStore({
//   reducer: {
//   }
// });
// console.log("Initial state: ", store.getState());

const initialState: CommentSlice = {
  comments: [],
};

export const commentsSlice = createSlice({
  name: "commentsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchAddComment.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.comments.push(action.payload);
      }
    );
    builder.addCase(
      fetchUpdateComment.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.comments.push(action.payload);
      }
    );
    builder.addCase(
      fetchDeleteComment.fulfilled,
      (state, action: PayloadAction<any>) => {
        // state.comments = action.payload;
      }
    );
  },
});

// Action creators are generated for each case reducer function
export default commentsSlice.reducer;
