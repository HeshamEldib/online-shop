import { PayloadAction, combineReducers, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { URL } from "../../constant";

export const fetchProductById: any = createAsyncThunk(
  "productByIdSlice/fetchProductById",
  async (productId: string) => {
    const res = await fetch(`${URL}/api/products/${productId}`);
    const data = await res.json();
    return data.data.product;
  }
);

export interface ProductByIdSlice {
  product: any;
}

const initialState: ProductByIdSlice = {
  product: {},
};

export const productByIdSlice = createSlice({
  name: "productByIdSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(
      fetchProductById.fulfilled,
      (state, action: PayloadAction<any>) => {
        // Add user to the state array
        state.product = action.payload;
      }
    );
  },
});

// Action creators are generated for each case reducer function
// export const { showAndHiddenLinks, showAndHiddenLove } = productsSlice.actions;
// export const rootReducer = combineReducers({
//   product: productByIdSlice.reducer,
//   act: fetchProductById,
// });
export default productByIdSlice.reducer;
