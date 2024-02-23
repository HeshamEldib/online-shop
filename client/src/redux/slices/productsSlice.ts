import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MainURL } from "../../constant";

export const fetchProducts: any = createAsyncThunk(
  "productsSlice/fetchProducts",
  async (dataInfo: any = {}) => {
    const res = await fetch(
      `${MainURL}api/products/?page=${dataInfo.page || 1}&category=${
        dataInfo.category || "all"
      }`
    );
    const data = await res.json();
    return data.data;
  }
);

// search
export const fetchSearchProduct: any = createAsyncThunk(
  "productsSlice/fetchSearchProduct",
  async (searchProduct: string) => {
    const res = await fetch(
      `${MainURL}api/products/search/${searchProduct}`
    );
    const data = await res.json();
    console.log(data);
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


    builder.addCase(
      fetchSearchProduct.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.products = action.payload.products;
      }
    );
  },
});

export default productsSlice.reducer;
