import { axiosAdminInstance } from "../utility/axios";




export const adminLogin = async (adminData, setLoading) => {
  try {
    console.log("test api");
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const response = await axiosAdminInstance.post(
      "/adminlogin",
      adminData,
      config
    );
    console.log(response);
    return response;
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    setLoading(false);
    console.log( "admin apiCalls error - "+ errorIs);
    return errorIs;
  }
};

///////////////////user start/////////////////////

export const adminUserList = async(token,setLoading) => {
    try {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axiosAdminInstance.get("/allusers", config);
        console.log(response);
        return response;
    } catch (error) {
        const errorIs =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
         setLoading(false);
         console.log("admin apiCalls error - " + errorIs);
         return errorIs;

        
    }
}


export  const userStatusControl = async (id, status, token, setLoading) => {
  try {
    console.log("token" + token);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axiosAdminInstance.patch(
      `/blockuser/${id}`,
      { blocked: status },
      config
    );

    console.log("blocksucess2");
    console.log("response " + response);
    return response;
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    setLoading(false);
    console.log("admin apiCalls error - " + errorIs);
    return errorIs;
  }
};

/////////////////user api end//////////////


////////////////vendor api start/////////////

export const adminVendorList = async (token, setLoading) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axiosAdminInstance.get("/allvendors", config);
    console.log(response);
    return response;
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    setLoading(false);
    console.log("admin apiCalls error - " + errorIs);
    return errorIs;
  }
};

export const vendorStatusControl = async (id, status, token, setLoading) => {
  try {
    console.log("token" + token);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axiosAdminInstance.patch(
      `/blockvendor/${id}`,
      { blocked: status },
      config
    );

    console.log("blocksucess2");
    console.log("response " + response);
    return response;
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    setLoading(false);
    console.log("admin apiCalls error - " + errorIs);
    return errorIs;
  }
};

export const vendorVerifyControl = async (id, status, token, setLoading) => {
  try {
    console.log("token" + token);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axiosAdminInstance.patch(
      `/verifyvendor/${id}`,
      { status },
      config
    );

    console.log("verifysuccess");
    console.log("response " + response);
    return response;
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    setLoading(false);
    console.log("admin apiCalls error - " + errorIs);
    return errorIs;
  }
};

///////////////vendor api end//////////////////


///////////////category api start/////////////
export const adminCategoryList = async (token, setLoading) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axiosAdminInstance.get("/getcategory", config);
    console.log(response);
    return response;
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    setLoading(false);
    console.log("admin apiCalls error - " + errorIs);
    return errorIs;
  }
};

export const adminAddCategory = async (category, token, setLoading) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axiosAdminInstance.post(
      `/addcategory`,
      { category },
      config
    );
    console.log(response);
    return response;
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    console.log("admin apiCalls error - " + errorIs);
    return errorIs;
  }
};

export const categoryStatusControl = async (id, status, token, setLoading) => {
  try {
    console.log("token" + token);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axiosAdminInstance.patch(
      `/blockcategory/${id}`,
      { blocked: status },
      config
    );

    console.log("blocksucess2");
    console.log("response " + response);
    return response;
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    setLoading(false);
    console.log("admin apiCalls error - " + errorIs);
    return errorIs;
  }
};
///////////////category api end/////////////

///////////////product api start/////////////
export const adminProductList = async (token, setLoading) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axiosAdminInstance.get("/getproduct", config);
    console.log(response);
    return response;
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    setLoading(false);
    console.log("admin apiCalls error - " + errorIs);
    return errorIs;
  }
};

export const productVerifyControl = async (id, status, token, setLoading) => {
  try {
    console.log("token" + token);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axiosAdminInstance.patch(
      `/verifyproduct/${id}`,
      { status },
      config
    );

    console.log("verifysuccess");
    console.log("response " + response);
    return response;
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    setLoading(false);
    console.log("admin apiCalls error - " + errorIs);
    return errorIs;
  }
};


export const productStatusControl = async (id, status, token, setLoading) => {
  try {
    console.log("token" + token);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axiosAdminInstance.patch(
      `/blockproduct/${id}`,
      { blocked: status },
      config
    );

    console.log("blocksucess2");
    console.log("response " + response);
    return response;
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    setLoading(false);
    console.log("admin apiCalls error - " + errorIs);
    return errorIs;
  }
};
///////////////product api end/////////////