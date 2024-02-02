import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Authorization, URL } from "../../constant";

export const fetchGetLove: any = createAsyncThunk(
  "loveProductsSlice/fetchGetLove",
  async () => {
    const res = await fetch(`${URL}api/users/love/0`, {
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
    const res = await fetch(`${URL}api/users/love/${productId}`, {
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
    const res = await fetch(`${URL}api/users/love/${productId}`, {
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
  reducers: {
    removeLoveItem: (state, action: PayloadAction<any>) => {
      state.products[0].splice(action.payload, 1);
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(
      fetchGetLove.fulfilled,
      (state, action: PayloadAction<any>) => {
        // Add user to the state array
        state.products.push(action.payload);
      }
    );
    builder.addCase(
      fetchAddLove.fulfilled,
      (state, action: PayloadAction<any>) => {
        // Add user to the state array
        state.products[0].push(action.payload);
      }
    );
    builder.addCase(
      fetchDeleteLove.fulfilled,
      (state, action: PayloadAction<any>) => {
        // Add user to the state array
      }
    );
  },
});

// Action creators are generated for each case reducer function
export const { removeLoveItem } = loveProductsSlice.actions;

export default loveProductsSlice.reducer;
