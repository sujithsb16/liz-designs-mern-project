import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userRegisterReducer from "../features/users/userRegisterSlice";
import userLoginReducer from "../features/users/userLoginSlice";
import userListReducer from "../features/admin/allUserListSlice";
import adminLoginReducer from "../features/admin/adminLoginSlice";
import venderDetailsReducer from "../features/vender/venderDetailsSlice";
import venderListReducer from "../features/admin/allVenderListSlice";
import adminVenderVerifyReducer from "../features/admin/venderVerifySlice"
import adminVenderBlockReducer from "../features/admin/venderBlockSlice";
import thunk from "redux-thunk";



const store = configureStore({
  reducer: {

    userRegister: userRegisterReducer,
    userLogin: userLoginReducer,
    userList: userListReducer,
    adminLogin: adminLoginReducer,
    adminVenderVerify: adminVenderVerifyReducer,
    adminVenderBlock: adminVenderBlockReducer,
    venderDetails :venderDetailsReducer,
    venderList: venderListReducer,


    },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
