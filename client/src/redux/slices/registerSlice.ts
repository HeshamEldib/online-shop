import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { URL } from "../../constant";

export const fetchRegister: any = createAsyncThunk(
  "registerSlice/fetchRegister",
  async () => {
    const res = await fetch(`${URL}/api/products/`);
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

export const registerSlice = createSlice({
  name: "registerSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(
      fetchRegister.fulfilled,
      (state, action: PayloadAction<any>) => {
        // Add user to the state array
        state.products.push(action.payload);
      }
    );
  },
});

// Action creators are generated for each case reducer function
// export const { showAndHiddenLinks, showAndHiddenLove } = productsSlice.actions;

export default registerSlice.reducer;
