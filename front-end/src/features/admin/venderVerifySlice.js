import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  
};

const venderVerifySlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    venderVerifyReq: (state, action) => {
      state.loading = true;
      state.success = false;
    },
    venderVerifySuccess: (state, action) => {
      state.loading = false;
      state.success = true;
    },
    venderVerifyFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
  },
});

export default venderVerifySlice.reducer;
export const { venderVerifyReq, venderVerifySuccess, venderVerifyFail } =
  venderVerifySlice.actions;
