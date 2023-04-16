import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const userRegisterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userRegisterReq: (state, action) => {
      state.loading = true;
      state.success = false;
    },
    userRegisterOtp: (state, action) => {
      state.showOtp = true;
      state.success = false;
      state.loading = false;
    },
    userRegisterSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.userInfo = action.payload;
    },
    userRegisterFail: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
  },
});

export default userRegisterSlice.reducer;
export const {
  userRegisterReq,
  userRegisterOtp,
  userRegisterSuccess,
  userRegisterFail,
} = userRegisterSlice.actions;
