import {
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./userSlice";
import adminReducer from "./adminSlice";
import vendorReducer from "./vendorSlice";


const persistConfig = {
  key: "persist-key",
  storage,
};

const reducers = combineReducers({
  user: userReducer,
});

const persistedUserLoginReducer = persistReducer(
  persistConfig,
  userReducer
);
const persistedAdminLoginReducer = persistReducer(
  persistConfig,
  adminReducer
);
const persistedVendorLoginReducer = persistReducer(
  persistConfig,
  vendorReducer
);


const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: {
    userLogin: persistedUserLoginReducer,
    adminLogin: persistedAdminLoginReducer,
    vendorLogin: persistedVendorLoginReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      immutableCheck: true,
      serializableCheck: false,
    }),
});

export default store;
