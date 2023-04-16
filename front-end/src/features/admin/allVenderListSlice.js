import { createSlice } from "@reduxjs/toolkit";

const venderInfoFromStorage = localStorage.getItem("venderInfo")
  ? JSON.parse(localStorage.getItem("venderInfo"))
  : null;

const initialState = {
  loading: false,
  venderInfo: venderInfoFromStorage,
  allVender: [],
  error: null,
};

const venderListSlice = createSlice({
  name: "vender",
  initialState,
  reducers: {
    venderListReq: (state, action) => {
      state.loading = true;
    },
    venderListSuccess: (state, action) => {
      state.allVender = action.payload;
      state.loading = false;
    },
    venderListFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default venderListSlice.reducer;
export const { venderListReq, venderListSuccess, venderListFail } =
  venderListSlice.actions;
