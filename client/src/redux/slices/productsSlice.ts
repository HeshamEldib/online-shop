import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { URL } from "../../constant";

export const fetchProducts: any = createAsyncThunk(
  "productsSlice/fetchProducts",
  async (dataInfo: any = {}) => {
    const res = await fetch(
      `${URL}/api/products/?page=${dataInfo.page || 1}&limit=${
        dataInfo.limit || 20
      }&category=${dataInfo.category || "all"}`
    );
    const data = await res.json();
    return data.data.products;
  }
);

export interface ProductsSlice {
  products: any[];
}

const initialState: ProductsSlice = {
  products: [],
};

export const productsSlice = createSlice({
  name: "productsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(
      fetchProducts.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.products = action.payload;
      }
    );
  },
});

// Action creators are generated for each case reducer function
// export const { showAndHiddenLinks, showAndHiddenLove } = productsSlice.actions;

export default productsSlice.reducer;
