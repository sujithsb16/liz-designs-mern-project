import { axiosVendorInstance } from "../utility/axios";





export const vendorLogin = async (vendorData, setLoading) => {
  try {
    console.log("test api");
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const response = await axiosVendorInstance.post("/login", vendorData, config);
    console.log(response);
    return response;
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    setLoading(false);
    console.log(errorIs);
    return errorIs;
  }
};


export const vendorSignUp = async (vendorData, setLoading) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const response = await axiosVendorInstance.post(
      "/register",
      vendorData,
      config
    );
    if (response.status === 201) {
      // Successful response
      return response;
    } else {
      // Handle other response status codes
      // You can customize the error handling as needed
      throw new Error(`Unexpected response status code: ${response.status}`);
    }
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    setLoading(false);
    console.log(errorIs);
    return errorIs;
  }
};

//////////////////category/////////////

export const vendorCategoryList = async (token, setLoading) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axiosVendorInstance.get("/getcategory", config);
    console.log(response);
    return response;
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    setLoading(false);
    console.log("vendor apiCalls error - " + errorIs);
    return errorIs;
  }
};

//////////////////////////////////////

/////////////// product //////////////////////
export const vendorAddProduct = async (token, formData, images, setLoading) => {
  try {
    console.log("test api");
    

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axiosVendorInstance.post(
      "/addproduct",
      {...formData,images,
      },config
    );
    console.log(response);
    return response;
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    setLoading(false);
    console.log(errorIs);
    return errorIs;
  }
};

export const vendorProductList = async (token, setLoading) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axiosVendorInstance.get("/getproduct", config);
    console.log(response);
    return response;
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    setLoading(false);
    console.log("vendor apiCalls error - " + errorIs);
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

    const response = await axiosVendorInstance.patch(
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

/////////////////////////////////////

///////////////order start//////////
export const vendorOrderList = async (token, setLoading) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axiosVendorInstance.get("/getorders", config);
    console.log(response);
    return response;
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    setLoading(false);
    console.log("vendor apiCalls error - " + errorIs);
    return errorIs;
  }
};

export const orderStatusControl = async (id, token, setLoading) => {
  try {
    console.log("token" + token);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axiosVendorInstance.patch(
      `/orderstatus/${id}`,
      { token },
      config
    );

   
    return response;
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    setLoading(false);
    console.log("vendor apiCalls error - " + errorIs);
    return errorIs;
  }
};
///////////////order end////////////

export const vendorChartApi = async (token, setLoading) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axiosVendorInstance.get("/getchart", config);
    console.log(response);
    return response;
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    setLoading(false);
    console.log("vendor apiCalls error - " + errorIs);
    return errorIs;
  }
};

