import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
};

const vendorBlockSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    vendorBlockReq: (state, action) => {
      state.loading = true;
      state.success = false;
    },
    vendorBlockSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
    },
    vendorBlockFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
  },
});

export default vendorBlockSlice.reducer;
export const { vendorBlockReq, vendorBlockSuccess, vendorBlockFail } =
  vendorBlockSlice.actions;
