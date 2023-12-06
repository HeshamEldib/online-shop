import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { URL } from "../../constant";

export const fetchUser: any = createAsyncThunk(
  "userSlice/fetchUser",
  async (userToken: string) => {
    const res = await fetch(`${URL}/api/users/${userToken}`);
    const data = await res.json();
    // console.log("userToken => ", userToken);
    return data.data.user;
  }
);

export interface UserSlice {
  user: any;
}

const initialState: UserSlice = {
  user: {},
};

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Img1QGdtYWlsLmNvbSIsImlkIjoiNjU0ZGYyY2Q4OTM0ZGQ3NWMwZDU0MmM0Iiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNjk5NjA3MjQ1fQ.qnpbgtjGBoJv_inE4jzbcQ6ZwmZDL-AwPcELd8RHIrE
export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchUser.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.user = { ...action.payload };
        // console.log("payload => ", action.payload);
        
      }
    );
  },
});

// Action creators are generated for each case reducer function
// export const { showAndHiddenLinks, showAndHiddenLove } = productsSlice.actions;

export default userSlice.reducer;
