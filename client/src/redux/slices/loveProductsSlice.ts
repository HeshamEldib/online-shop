import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Authorization, MainURL } from "../../constant";

export const fetchGetLove: any = createAsyncThunk(
  "loveProductsSlice/fetchGetLove",
  async () => {
    const res = await fetch(`${MainURL}api/users/love/0`, {
      headers: {
        Authorization,
      },
    });
    const data = await res.json();
    return data.data.products;
  }
);

export const fetchAddLove: any = createAsyncThunk(
  "loveProductsSlice/fetchAddLove",
  async (productId: string) => {
    const res = await fetch(`${MainURL}api/users/love/${productId}`, {
      method: "POST",
      headers: {
        Authorization,
      },
    });
    const data = await res.json();
    return data.data.product;
  }
);

export const fetchDeleteLove: any = createAsyncThunk(
  "loveProductsSlice/fetchDeleteLove",
  async (productId: string) => {
    const res = await fetch(`${MainURL}api/users/love/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization,
      },
    });
    const data = await res.json();
    return data.data.product;
  }
);

export interface LoveProductsSlice {
  products: any[];
}

const initialState: LoveProductsSlice = {
  products: [],
};

export const loveProductsSlice = createSlice({
  name: "loveProductsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(
      fetchGetLove.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.products = action.payload;
      }
    );
    builder.addCase(
      fetchAddLove.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.products.push(action.payload);
      }
    );
    builder.addCase(
      fetchDeleteLove.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.products = state.products.filter(
          (item: any) => item._id !== action.payload?._id
        );
      }
    );
  },
});

export default loveProductsSlice.reducer;
