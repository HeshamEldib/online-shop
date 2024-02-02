import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { URL, Authorization } from "../../constant";

export const fetchUser: any = createAsyncThunk(
  "userSlice/fetchUser",
  async (userToken: string) => {
    const res = await fetch(`${URL}api/users/${userToken}`);
    const data = await res.json();
    return data.data.user;
  }
);

export const fetchUpdateUser: any = createAsyncThunk(
  "userSlice/fetchUpdateUser",
  async (newData: any) => {
    const formData = new FormData();

    newData.userName !== undefined &&
      formData.append("userName", newData.userName);
    newData.mobile !== undefined && formData.append("mobile", newData.mobile);
    newData.address !== undefined &&
      formData.append("address", newData.address);

    formData.append("avatar", newData.avatar);

    const res = await fetch(`${URL}api/users/${newData.userToken}`, {
      method: "PATCH",
      body: formData,
    });
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
    builder.addCase(
      fetchUser.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.user = { ...action.payload };
      }
    );
    builder.addCase(
      fetchUpdateUser.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.user = { ...action.payload };
      }
    );
  },
});

// Action creators are generated for each case reducer function
// export const { showAndHiddenLinks, showAndHiddenLove } = productsSlice.actions;

export default userSlice.reducer;
