import { configureStore } from "@reduxjs/toolkit";
import targetMenuSlice from "./slices/targetMenu";
import productsSlice from "./slices/productsSlice";
import productByIdSlice from "./slices/productByIdSlice";
import userSlice from "./slices/userSlice";
import loveProductsSlice from "./slices/loveProductsSlice";
import cartSlice from "./slices/cartSlice";
import buyingSlice from "./slices/buyingSlice";
import ratingsSlice from "./slices/ratingsSlice";

export const store = configureStore({
  reducer: {
    targetMenu: targetMenuSlice,
    products: productsSlice,
    productById: productByIdSlice,
    user: userSlice,
    loveProductsSlice: loveProductsSlice,
    cart: cartSlice,
    buying: buyingSlice,
    rating: ratingsSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
