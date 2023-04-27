import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  vendorInfo: null,
};

export const vendorSlice = createSlice({
  name: "vendor",
  initialState,
  reducers: {
    setVendorLogin: (state, action) => {
      state.token = action.payload.token;
      state.vendorInfo = action.payload.vendorInfo;
    },
    setVendorLogout: (state,) => {
      state.token = null;
      state.vendorInfo = null;
    },
  },
});

export const { setVendorLogin, setVendorLogout } = vendorSlice.actions;

export default vendorSlice.reducer;
