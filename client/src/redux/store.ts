import { configureStore } from "@reduxjs/toolkit";
import registerSlice from "./slices/registerSlice";
import targetMenuSlice from "./slices/targetMenu";
import productsSlice from "./slices/productsSlice";
import productByIdSlice from "./slices/productByIdSlice";
import userSlice from "./slices/userSlice";
import loveProductsSlice from "./slices/loveProductsSlice";
import cartSlice from "./slices/cartSlice";
import buyingSlice from "./slices/buyingSlice";
import ratingsSlice from "./slices/ratingsSlice";
import commentsSlice from "./slices/commentsSlice";
import myProductsSlice from "./slices/myProductsSlice";

export const store = configureStore({
  reducer: {
    register: registerSlice,
    targetMenu: targetMenuSlice,
    products: productsSlice,
    productById: productByIdSlice,
    user: userSlice,
    loveProductsSlice: loveProductsSlice,
    cart: cartSlice,
    buying: buyingSlice,
    rating: ratingsSlice,
    comment: commentsSlice,
    myProducts: myProductsSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
