import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from '@reduxjs/toolkit'

export interface PopoverSlice {
  show: boolean;
}

const initialState: PopoverSlice = {
  show: false,
};

export const popoverSlice = createSlice({
  name: "handelPopover",
  initialState,
  reducers: {
    showAndHidden: (state) => {
      state.show = !state.show;
    },
  },
});

// Action creators are generated for each case reducer function
export const { showAndHidden } = popoverSlice.actions;

export default popoverSlice.reducer;
