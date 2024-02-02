import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Authorization, URL } from "../../constant";

export const fetchGetAllFromCart: any = createAsyncThunk(
  "cartSlice/fetchGetAllFromCart",
  async () => {
    const res = await fetch(`${URL}api/users/cart/0`, {
      headers: {
        Authorization,
      },
    });
    const data = await res.json();
    return data.data.products;
  }
);

export const fetchAddToCart: any = createAsyncThunk(
  "cartSlice/fetchAddToCart",
  async (productId: string) => {
    const res = await fetch(`${URL}api/users/cart/${productId}`, {
      method: "POST",
      headers: {
        Authorization,
      },
    });
    const data = await res.json();
    return data.data;
  }
);

export const fetchDeleteFromCart: any = createAsyncThunk(
  "cartSlice/fetchDeleteFromCart",
  async (productId: string) => {
    const res = await fetch(`${URL}api/users/cart/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization,
      },
    });
    const data = await res.json();
    return data.data;
  }
);

export const fetchCountProduct: any = createAsyncThunk(
  "cartSlice/fetchCountProduct",
  async (newData: any) => {
    const res = await fetch(`${URL}api/users/cart/${newData.productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "Application/json",
        Authorization,
      },
      body: JSON.stringify({
        count: newData.value,
      }),
    });
    const data = await res.json();
    return data.data;
  }
);

export interface CartSlice {
  products: any[];
}

const initialState: CartSlice = {
  products: [],
};

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(
      fetchGetAllFromCart.fulfilled,
      (state, action: PayloadAction<any>) => {
        // Add user to the state array
        state.products.push(action.payload);
      }
    );
    builder.addCase(
      fetchAddToCart.fulfilled,
      (state, action: PayloadAction<any>) => {
        let find: boolean = false;
        state.products[0]?.filter((item: any) => {
          if (item.product._id === action.payload?.product._id) {
            item.count = action.payload?.count;
            find = true;
          }
        });
        find || state.products[0]?.push(action.payload);
      }
    );
    builder.addCase(
      fetchDeleteFromCart.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.products[0].map((item: any, index: number) => {
          if (item.product._id === action.payload?.product._id) {
            state.products[0].splice(index, 1);
          }
        });
      }
    );

    builder.addCase(
      fetchCountProduct.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.products[0].map((item: any) => {
          if (item.product._id === action.payload?.product._id) {
            item.count = action.payload?.count;
          }
        });
      }
    );
  },
});

// Action creators are generated for each case reducer function
// export const { removeItemFromCart } = cartSlice.actions;

export default cartSlice.reducer;
