import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MainURL } from "../../constant";

export const fetchProductById: any = createAsyncThunk(
  "productByIdSlice/fetchProductById",
  async (productId: string) => {
    const res = await fetch(`${MainURL}api/products/${productId}`);
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

export default productByIdSlice.reducer;
