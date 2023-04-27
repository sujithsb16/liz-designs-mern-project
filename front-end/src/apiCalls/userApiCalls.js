import { axiosUserInstance } from "../utility/axios"


export const userLogin = async(userData , setLoading) => {
    try {
        console.log("test api");
        const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
        const response = await axiosUserInstance.post(
        "/login",
       userData,
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
       console.log(errorIs);
       return errorIs
        
    }
}


export const userSignUp = async (userData, setLoading) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const response = await axiosUserInstance.post(
      "/register",
      userData,
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

//////////////////////////////////////////
export const userProductList = async (setLoading) => {
  try {
    // const config = {
    //   headers: { Authorization: `Bearer ${token}` },
    // };
    const response = await axiosUserInstance.get("/getproducts");
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

export const singleProduct = async (id,setLoading) => {
  try {
    // const config = {
    //   headers: { Authorization: `Bearer ${token}` },
    // };
    const response = await axiosUserInstance.get(`/singleproduct/${id}`);
    console.log(response);
    return response;
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    setLoading(false);
    console.log("user apiCalls error - " + errorIs);
    return errorIs;
  }
};

export const addToCart = async (token ,productId) => {
  try {

    console.log("user api " + token);

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    // console.log(productId);
    const response = await axiosUserInstance.get(`/addtocart/${productId}`, config);
    console.log(response);
    return response;
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    // setLoading(false);
    console.log("user apiCalls error - " + errorIs);
    return errorIs;
  }
};
export const cartProductList = async (token) => {
  try {
    console.log("user api " + token);

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    // console.log(productId);
    const response = await axiosUserInstance.get(
      `/getcart`,
      config
    );
    // console.log(response);
    return response;
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    // setLoading(false);
    console.log("user apiCalls error - " + errorIs);
    return errorIs;
  }
};



/////////////////////////////////////////