import { createSlice } from "@reduxjs/toolkit";

const venderInfoFromStorage = localStorage.getItem("venderInfo")
  ? JSON.parse(localStorage.getItem("venderInfo"))
  : null;

const initialState = {
  loading: false,
  venderInfo: venderInfoFromStorage,
  venderList:[],
  error: null,
};

const venderDetailsSlice = createSlice({
    name: "vender",
    initialState,
    reducers: {
        venderDetailsReq:(state,action) => {
            state.venderInfo = action.payload
        }
    },

  },
  )



export default venderDetailsSlice.reducer;
export const { venderDetailsReq,} =
  venderDetailsSlice.actions;
