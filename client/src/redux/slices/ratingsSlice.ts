import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Authorization, URL } from "../../constant";

export const fetchGetRatings: any = createAsyncThunk(
  "ratingsSlice/fetchGetRatings",
  async (productId: string) => {
    const res = await fetch(`${URL}api/products/${productId}/rating`, {
      headers: {
        Authorization,
      },
    });
    const data = await res.json();
    return data.data.rating;
  }
);

export const fetchAddAndUpdateRatings: any = createAsyncThunk(
  "ratingsSlice/fetchAddAndUpdateRatings",
  async (newData: any) => {
    const res = await fetch(
      `${URL}api/products/${newData.productId}/rating`,
      {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
          Authorization,
        },
        body: JSON.stringify({
          rating: newData.rating,
        }),
      }
    );
    const data = await res.json();
    return data.data.rating;
  }
);

export interface RatingsSlice {
  rating: number;
}

const initialState: RatingsSlice = {
  rating: 0,
};

export const ratingsSlice = createSlice({
  name: "ratingsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(
      fetchGetRatings.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.rating = action.payload;
      }
    );
    builder.addCase(
      fetchAddAndUpdateRatings.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.rating = action.payload;
      }
    );
  },
});

// Action creators are generated for each case reducer function

export default ratingsSlice.reducer;
