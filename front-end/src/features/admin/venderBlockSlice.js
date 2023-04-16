import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
};

const venderBlockSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    venderBlockReq: (state, action) => {
      state.loading = true;
      state.success = false;
    },
    venderBlockSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
    },
    venderBlockFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
  },
});

export default venderBlockSlice.reducer;
export const { venderBlockReq, venderBlockSuccess, venderBlockFail } =
  venderBlockSlice.actions;
