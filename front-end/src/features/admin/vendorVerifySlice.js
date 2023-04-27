import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  
};

const vendorVerifySlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    vendorVerifyReq: (state, action) => {
      state.loading = true;
      state.success = false;
    },
    vendorVerifySuccess: (state, action) => {
      state.loading = false;
      state.success = true;
    },
    vendorVerifyFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
  },
});

export default vendorVerifySlice.reducer;
export const { vendorVerifyReq, vendorVerifySuccess, vendorVerifyFail } =
  vendorVerifySlice.actions;
