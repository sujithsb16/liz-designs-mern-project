import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  userInfo: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserLogin: (state, action) => {
      state.token = action.payload.token;
      state.userInfo = action.payload.userInfo;
    },
    setUserLogout: (state, action) => {
      state.token = null;
      state.userInfo = null;
    },
  },
});

export const { setUserLogin, setUserLogout } = userSlice.actions;

export default userSlice.reducer;
