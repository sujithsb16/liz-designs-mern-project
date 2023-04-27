// import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // or any other storage library you prefer

// import userRegisterReducer from "../features/users/userRegisterSlice";
// import userLoginReducer from "../features/users/userLoginSlice";
// import userListReducer from "../features/admin/allUserListSlice";
// import adminLoginReducer from "../features/admin/adminLoginSlice";
// import vendorDetailsReducer from "../features/vendor/vendorDetailsSlice";
// import vendorListReducer from "../features/admin/allVendorListSlice";
// import adminvendorVerifyReducer from "../features/admin/vendorVerifySlice"
// import adminVendorBlockReducer from "../features/admin/vendorBlockSlice";
// import categoryListReducer from "../features/admin/adminCategorySlice";
// import thunk from "redux-thunk";


// // Define the Redux Persist configuration
// const persistConfig = {
//   key: "root", // key for the root of the persisted state
//   storage, // storage library to use for persistence (e.g. localStorage, sessionStorage, etc.)
//   whitelist: ["userLogin", "adminLogin"], // only persist userLogin and adminLogin
// };

// // Wrap the reducers with the Redux Persist higher-order reducer
// const persistedUserLoginReducer = persistReducer(
//   persistConfig,
//   userLoginReducer
// );
// const persistedAdminLoginReducer = persistReducer(
//   persistConfig,
//   adminLoginReducer
// );



// const store = configureStore({
//   reducer: {
//     userRegister: userRegisterReducer,
//     userLogin: persistedUserLoginReducer,
//     userList: userListReducer,
//     adminLogin: persistedAdminLoginReducer,
//     adminVendorVerify: adminVendorVerifyReducer,
//     adminVendorBlock: adminVendorBlockReducer,
//     vendorDetails: vendorDetailsReducer,
//     vendorList: vendorListReducer,
//     categoryList: categoryListReducer,
//   },
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
// });


// const persistor = persistStore(store); // create a persistor object to persist the store

// export { store, persistor };

// export default store;







////////////////////////////////////




import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // or any other storage library you prefer
import userRegisterReducer from "../features/users/userRegisterSlice";
import userLoginReducer from "../features/users/userLoginSlice";
import userListReducer from "../features/admin/allUserListSlice";
import adminLoginReducer from "../features/admin/adminLoginSlice";
import vendorDetailsReducer from "../features/vendor/vendorDetailsSlice";
import vendorListReducer from "../features/admin/allVendorListSlice";
import adminVendorVerifyReducer from "../features/admin/vendorVerifySlice";
import adminVendorBlockReducer from "../features/admin/vendorBlockSlice";
import categoryListReducer from "../features/admin/adminCategorySlice";
import thunk from "redux-thunk";

// Define the Redux Persist configuration
const persistConfig = {
  key: "persist-key", // key for the root of the persisted state
  storage, // storage library to use for persistence (e.g. localStorage, sessionStorage, etc.)
};

// Wrap the reducers with the Redux Persist higher-order reducer
const persistedUserRegisterReducer = persistReducer(
  persistConfig,
  userRegisterReducer
);
const persistedUserLoginReducer = persistReducer(
  persistConfig,
  userLoginReducer
);
const persistedUserListReducer = persistReducer(persistConfig, userListReducer);
const persistedAdminLoginReducer = persistReducer(
  persistConfig,
  adminLoginReducer
);
const persistedAdminVendorVerifyReducer = persistReducer(
  persistConfig,
  adminVendorVerifyReducer
);
const persistedAdminVendorBlockReducer = persistReducer(
  persistConfig,
  adminVendorBlockReducer
);
const persistedVendorDetailsReducer = persistReducer(
  persistConfig,
  vendorDetailsReducer
);
const persistedVendorListReducer = persistReducer(
  persistConfig,
  vendorListReducer
);
const persistedCategoryListReducer = persistReducer(
  persistConfig,
  categoryListReducer
);

const store = configureStore({
  reducer: {
    userRegister: userRegisterReducer,
    userLogin: persistedUserLoginReducer,
    userList: persistedUserListReducer,
    adminLogin: persistedAdminLoginReducer,
    adminVendorVerify: persistedAdminVendorVerifyReducer,
    adminVendorBlock: persistedAdminVendorBlockReducer,
    vendorDetails: persistedVendorDetailsReducer,
    vendorList: persistedVendorListReducer,
    categoryList: persistedCategoryListReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
