import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from '@reduxjs/toolkit'

export interface TargetMenuSlice {
  show: string;
}

const initialState: TargetMenuSlice = {
  show: "",
};

export const targetMenuSlice = createSlice({
  name: "targetMenu",
  initialState,
  reducers: {
    showAndHidden: (state) => {
      state.show === "" ? state.show = "show-menu" : state.show = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { showAndHidden } = targetMenuSlice.actions;

export default targetMenuSlice.reducer;
