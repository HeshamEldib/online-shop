import { configureStore } from "@reduxjs/toolkit";
import targetMenuSlice from "./slices/targetMenu";
import productsSlice from "./slices/productsSlice";
import productByIdSlice from "./slices/productByIdSlice";

export const store = configureStore({
  reducer: {
    targetMenu: targetMenuSlice,
    products: productsSlice,
    productById: productByIdSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
