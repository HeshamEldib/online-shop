import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Authorization, MainURL } from "../../constant";

export const fetchGetAllBuying: any = createAsyncThunk(
  "buyingSlice/fetchGetAllBuying",
  async () => {
    const res = await fetch(`${MainURL}api/users/buying/0`, {
      headers: {
        Authorization,
      },
    });
    const data = await res.json();
    return data.data.products;
  }
);

export const fetchAddBuying: any = createAsyncThunk(
  "buyingSlice/fetchAddBuying",
  async (newData: any) => {
    const res = await fetch(`${MainURL}api/users/buying/${newData.productId}`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        Authorization,
      },
      body: JSON.stringify({
        count: newData.count,
      }),
    });
    const data = await res.json();
    return data.data;
  }
);

export const fetchDeleteBuying: any = createAsyncThunk(
  "buyingSlice/fetchDeleteBuying",
  async (productId: string) => {
    const res = await fetch(`${MainURL}api/users/buying/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization,
      },
    });
    const data = await res.json();
    return data.data;
  }
);

export const fetchAddAllBuying: any = createAsyncThunk(
  "buyingSlice/fetchAddAllBuying",
  async () => {
    const res = await fetch(`${MainURL}api/users/buying/allItem/0`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        Authorization,
      },
    });
    const data = await res.json();
    return data.data;
  }
);

export const fetchDeleteAllBuying: any = createAsyncThunk(
  "buyingSlice/fetchDeleteAllBuying",
  async () => {
    const res = await fetch(`${MainURL}api/users/buying/allItem/0`, {
      method: "DELETE",
      headers: {
        Authorization,
      },
    });
    const data = await res.json();
    return data.data;
  }
);

export interface BuyingSlice {
  products: any[];
}

const initialState: BuyingSlice = {
  products: [],
};

export const buyingSlice = createSlice({
  name: "buyingSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(
      fetchGetAllBuying.fulfilled,
      (state, action: PayloadAction<any>) => {
        // Add user to the state array
        state.products.push(action.payload);
      }
    );

    builder.addCase(
      fetchAddBuying.fulfilled,
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
      fetchDeleteBuying.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.products[0]?.map((item: any, index: number) => {
          if (item.product._id === action.payload?.product._id) {
            state.products[0].splice(index, 1);
          }
        });
      }
    );

    builder.addCase(
      fetchAddAllBuying.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.products[0] = action.payload.products;
      }
    );

    builder.addCase(fetchDeleteAllBuying.fulfilled, (state) => {
      state.products = [];
    });
  },
});

export default buyingSlice.reducer;
