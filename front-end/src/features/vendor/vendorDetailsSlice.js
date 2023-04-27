import { createSlice } from "@reduxjs/toolkit";

const vendorInfoFromStorage = localStorage.getItem("vendorInfo")
  ? JSON.parse(localStorage.getItem("vendorInfo"))
  : null;

const initialState = {
  loading: false,
  vendorInfo: vendorInfoFromStorage,
  vendorList:[],
  error: null,
};

const vendorDetailsSlice = createSlice({
    name: "vendor",
    initialState,
    reducers: {
        vendorDetailsReq:(state,action) => {
            state.vendorInfo = action.payload
        }
    },

  },
  )



export default vendorDetailsSlice.reducer;
export const { vendorDetailsReq,} =
  vendorDetailsSlice.actions;
