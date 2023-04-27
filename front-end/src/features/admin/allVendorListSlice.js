import { createSlice } from "@reduxjs/toolkit";

const vendorInfoFromStorage = localStorage.getItem("vendorInfo")
  ? JSON.parse(localStorage.getItem("vendorInfo"))
  : null;

const initialState = {
  loading: false,
  vendorInfo: vendorInfoFromStorage,
  allVender: [],
  error: null,
};

const vendorListSlice = createSlice({
  name: "vendor",
  initialState,
  reducers: {
    vendorListReq: (state, action) => {
      state.loading = true;
    },
    vendorListSuccess: (state, action) => {
      state.allVender = action.payload;
      state.loading = false;
    },
    vendorListFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default vendorListSlice.reducer;
export const { vendorListReq, vendorListSuccess, vendorListFail } =
  vendorListSlice.actions;
