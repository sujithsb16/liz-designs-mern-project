import { axiosAdminInstance } from "../utility/axios";
import { adminLoginFail, adminLoginReq, adminLoginSuccess, adminLogout } from "../features/admin/adminLoginSlice";
import {
  vendorListFail,
  vendorListReq,
  vendorListSuccess,
} from "../features/admin/allVendorListSlice";
import { vendorVerifyFail, vendorVerifySuccess, vendorVerifyReq } from "../features/admin/vendorVerifySlice";
import { vendorBlockFail, vendorBlockReq, vendorBlockSuccess } from "../features/admin/vendorBlockSlice";
import { userListFail, userListReq, userListSuccess } from "../features/admin/allUserListSlice";
import { categoryFail, categoryReq, categorySuccess } from "../features/admin/adminCategorySlice";




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

    // const { data } = await axiosAdminInstanceAdminInstance.post(
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


export const allVendorList = () => async (dispatch, getState) => {
  try {
    dispatch(vendorListReq());

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

    const { data } = await axiosAdminInstance.get("/allvendors", config)
      console.log(data);
      dispatch(vendorListSuccess(data));
    

  } catch (error) {
    dispatch(vendorListFail(error));
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

    const  {data}  = await axiosAdminInstance
      .get("/allusers", config)
      
      dispatch(userListSuccess(data));
  } catch (error) {
    dispatch(userListFail(error));
    console.log(error);
  }
};


export const verifyVendor = (id, status) => async (dispatch, getState) => {
  try {
    dispatch(vendorVerifyReq());

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

    await axiosAdminInstance.patch(`/verifyvendor/${id}`, sendStatus, config).then(() => {
      dispatch(vendorVerifySuccess());
    });

    dispatch(vendorVerifySuccess());
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(vendorVerifyFail(message));
    console.log(message);
  }
};





export const vendorBlock = (id, status) => async (dispatch, getState) => {
  try {
    dispatch(vendorBlockReq());

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

  const response = await axiosAdminInstance.patch(`/blockvendor/${id}`, sendStatus, config)
  if (response.status === 200) {
    // Successful response
    dispatch(vendorBlockSuccess());
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
    dispatch(vendorBlockFail(message));
  }
};




////////////////////////////////////////////////////////////////////////////////////////




export const addCategory =async (category, adminInfo)=>{

  try {

    console.log(category,adminInfo);

     const config = {
       headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${adminInfo.token}`,
       },
     };
      const response = await axiosAdminInstance.post(`/addcategory`,{category}, config)
  if (response.status === 200) {
    // Successful response
    
  } else {
    // Handle other response status codes
    // You can customize the error handling as needed
    throw new Error(`Unexpected response status code: ${response.status}`);
  }
    
  } catch (error) {
    console.log(error.message);
  }

}

export const getCategory = (adminInfo) => async (dispatch) => {
  try {


    dispatch(categoryReq())
    
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };
    const { data } = await axiosAdminInstance.get(`/getcategory`, config);

    console.log(data);

    dispatch(categorySuccess(data))

    if (data) {
      console.log(data);
      // Successful response
    } else {
      // Handle other response status codes
      // You can customize the error handling as needed
      throw new Error(`Unexpected response `);
    }
  } catch (error) {
    dispatch(categoryFail(error.message))
  }
};