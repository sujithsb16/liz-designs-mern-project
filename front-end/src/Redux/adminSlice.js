import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  adminInfo: null,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdminLogin: (state, action) => {
      state.token = action.payload.token;
      state.adminInfo = action.payload.adminInfo;
    },
    setAdminLogout: (state, action) => {
      state.token = null;
      state.adminInfo = null;
    },
  },
});

export const { setAdminLogin, setAdminLogout } = adminSlice.actions;

export default adminSlice.reducer;
