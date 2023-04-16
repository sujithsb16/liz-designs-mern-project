import axios from "axios";
import {axiosAdminInstance} from "../utility/axios"
import { adminLoginFail, adminLoginReq, adminLoginSuccess, adminLogout } from "../features/admin/adminLoginSlice";
import {
  venderListFail,
  venderListReq,
  venderListSuccess,
} from "../features/admin/allVenderListSlice";
import { venderVerifyFail, venderVerifySuccess, venderVerifyReq } from "../features/admin/venderVerifySlice";
import { venderBlockFail, venderBlockReq, venderBlockSuccess } from "../features/admin/venderBlockSlice";
import { userListFail, userListReq, userListSuccess } from "../features/admin/allUserListSlice";



export const adminLogin = (email, password) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Accept: 'application/json',
        "Content-type": "application/json",
      },
    };
    dispatch(adminLoginReq());

    const { data } = await axiosAdminInstance.post(
      "/adminlogin",
      {
        email,
        password,
      },
      config
    );

    // const { data } = await axiosAdminInstance.post(
    //   "/adminLogin",
    //   {
    //     email,
    //     password,
    //   },
    //   config
    // );

    console.log(data);

    dispatch(adminLoginSuccess(data));

    localStorage.setItem("adminInfo", JSON.stringify(data));
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
        console.log("test " +errorIs);
    dispatch(adminLoginFail(errorIs));
  }
};

export const AdminLogout = () => async (dispatch) => {
  localStorage.removeItem("adminInfo");
  dispatch(adminLogout());
};


export const allVenderList = () => async (dispatch, getState) => {
  try {
    dispatch(venderListReq());

    const{
      adminLogin: {adminInfo},
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
        Accept: "application/json",
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.get("/admin/allvenders", config)
      console.log(data);
      dispatch(venderListSuccess(data));
    

  } catch (error) {
    dispatch(venderListFail(error));
    console.log(error);
  }
};

export const allUserListAction = () => async (dispatch, getState) => {
  try {
    dispatch(userListReq());

    const {
      adminLogin: { adminInfo },
    } = getState();

    const config = {
      headers: { Authorization: `Bearer ${adminInfo.token}` },
    };

    const  {data}  = await axios
      .get("/admin/allusers", config)
      
      dispatch(userListSuccess(data));
  } catch (error) {
    dispatch(userListFail(error));
    console.log(error);
  }
};


export const verifyVender = (id, status) => async (dispatch, getState) => {
  try {
    dispatch(venderVerifyReq());

   const {
     adminLogin: { adminInfo },
   } = getState();

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${adminInfo.token}`,
    },
  };



    const sendStatus = {
      isVerified: status,
    };

    await axios.patch(`/admin/verifyvender/${id}`, sendStatus, config).then(() => {
      dispatch(venderVerifySuccess());
    });

    dispatch(venderVerifySuccess());
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(venderVerifyFail(message));
    console.log(message);
  }
};





export const venderBlock = (id, status) => async (dispatch, getState) => {
  try {
    dispatch(venderBlockReq());

    const {
      adminLogin: { adminInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };

    const sendStatus = {
      blocked: status,
    };

  const response = await axios.patch(`/admin/blockvender/${id}`, sendStatus, config)
  if (response.status === 200) {
    // Successful response
    dispatch(venderBlockSuccess());
  } else {
    // Handle other response status codes
    // You can customize the error handling as needed
    throw new Error(`Unexpected response status code: ${response.status}`);
  }

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(venderBlockFail(message));
  }
};