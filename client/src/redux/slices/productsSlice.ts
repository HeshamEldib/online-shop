import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { URL } from "../../constant";

export const fetchProducts: any = createAsyncThunk(
  "productsSlice/fetchProducts",
  async (dataInfo: any = {}) => {
    const res = await fetch(
      `${URL}api/products/?page=${dataInfo.page || 1}&category=${
        dataInfo.category || "all"
      }`
    );
    const data = await res.json();
    return data.data;
  }
);

export interface ProductsSlice {
  products: any[];
  totalPages: number;
  currentPage: number;
}

const initialState: ProductsSlice = {
  products: [],
  totalPages: 1,
  currentPage: 1,
};

export const productsSlice = createSlice({
  name: "productsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchProducts.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.products = action.payload.products;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      }
    );
  },
});

// Action creators are generated for each case reducer function
// export const { showAndHiddenLinks, showAndHiddenLove } = productsSlice.actions;

export default productsSlice.reducer;
