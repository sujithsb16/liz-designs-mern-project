import { createSlice } from "@reduxjs/toolkit";



const initialState = {
  loading: false,
  allCategory: [],
  error: null,
};


const categoryListSlice = createSlice ({
    name:"category",
    initialState,
    reducers:{
        categoryReq:(state)=>{
            state.loading = true;
        },
        categorySuccess:(state,action)=>{
            state.loading = false;
            state.allCategory = action.payload;

        },
        categoryFail:(state,action) =>{
            state.loading = false;
            state.error = action.payload;
        },
    }
})

export default categoryListSlice.reducer;
export const { categoryReq, categorySuccess, categoryFail } =
  categoryListSlice.actions;