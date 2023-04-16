import { createSlice } from "@reduxjs/toolkit";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  loading: false,
  userInfo: userInfoFromStorage,
  allUser: [],
  error: null,
};

const userListSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userListReq: (state, action) => {
      state.loading = true;
      state.success = false;
    },
    userListSuccess: (state, action) => {
      state.success = true;
      state.allUser = action.payload;
      state.loading = false;
    },
    userListFail: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
  },
});

export default userListSlice.reducer;
export const { userListReq, userListSuccess, userListFail } =
  userListSlice.actions;
