import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MainURL } from "../../constant";

export const fetchRegister: any = createAsyncThunk(
  "registerSlice/fetchRegister",
  async (userData: any) => {
    const res = await fetch(`${MainURL}api/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({ ...userData }),
    });
    const data = await res.json();
    return data;
  }
);

export interface UserSlice {
  message: string;
}

const initialState: UserSlice = {
  message: "",
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
        if (!action.payload.data) {
          state.message = action.payload.message;
          console.log("action =>", action.payload);
        } else {
          state.message = "";
          localStorage.setItem("userToken", action.payload.data.userToken);
          location.href = "/";
        }
      }
    );
  },
});

export default registerSlice.reducer;
