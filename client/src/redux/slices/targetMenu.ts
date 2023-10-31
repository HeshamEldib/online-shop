import { createSlice } from "@reduxjs/toolkit";

export interface TargetMenuSlice {
  showLinks: string;
  showLove: string;
}

const initialState: TargetMenuSlice = {
  showLinks: "",
  showLove: "",
};

export const targetMenuSlice = createSlice({
  name: "targetMenu",
  initialState,
  reducers: {
    showAndHiddenLinks: (state) => {
      state.showLinks === "" ? state.showLinks = "show-menu" : state.showLinks = "";
    },
    showAndHiddenLove: (state) => {
      state.showLove === "" ? state.showLove = "show-menu" : state.showLove = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { showAndHiddenLinks, showAndHiddenLove } = targetMenuSlice.actions;

export default targetMenuSlice.reducer;
