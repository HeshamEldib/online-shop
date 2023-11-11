import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { URL } from "../../constant";

export const fetchUser: any = createAsyncThunk(
  "userSlice/fetchUser",
  async (userToken: string) => {
    const res = await fetch(`${URL}/api/users/${userToken}`);
    const data = await res.json();
    return data.data.user;
  }
);

export interface UserSlice {
  user: any;
}

const initialState: UserSlice = {
  user: {},
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(
      fetchUser.fulfilled,
      (state, action: PayloadAction<any>) => {
        // Add user to the state array
        state.user = { ...action.payload };
      }
    );
  },
});

// Action creators are generated for each case reducer function
// export const { showAndHiddenLinks, showAndHiddenLove } = productsSlice.actions;

export default userSlice.reducer;
