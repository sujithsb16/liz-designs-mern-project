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

export const updateUserApi = async (token,updatedUser, setLoading) => {
  try {
    console.log("test api");
   const response = await axiosUserInstance.patch(`/updateuser/`, updatedUser, {
     headers: { Authorization: `Bearer ${token}` },
   });
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
export const addAddressApi = async (token,address, setLoading) => {
  try {
    console.log("test api 2");
    console.log(address);
   const response = await axiosUserInstance.patch(`/addaddress/`, address, {
     headers: { Authorization: `Bearer ${token}` },
   });
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

export const deleteAddressApi = async (token, index) => {
  try {
    console.log("user api " + token);

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    // console.log(productId);
    const response = await axiosUserInstance.delete(
      `/deleteaddress/${index}`,
      config
    );
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

//////////////////////////////////////////
export const userProductList = async (setLoading, page, limit, vendorId) => {
  try {
    // const config = {
    //   headers: { Authorization: `Bearer ${token}` },
    // };
    const response = await axiosUserInstance.get(
      `/getproducts/${page}/${limit}`,
      { vendorId }
    );
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
export const updateToCart = async (token ,productId) => {
  try {

    console.log("user api " + token);

    // console.log(productId);
    const response = await axiosUserInstance.patch(`/editcart/${productId}`,null, {
      headers: { Authorization: `Bearer ${token}` },
    });
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
export const deleteCart = async (token ,productId) => {
  try {

    console.log("user api " + token);

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    // console.log(productId);
    const response = await axiosUserInstance.get(`/deletecart/${productId}`, config);
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


export const UserProfileApi = async (token) => {
  try {
    console.log("user api " + token);

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    // console.log(productId);
    const response = await axiosUserInstance.get(`/userprofile`, config);
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

export const userCouponActivate = async (token,couponId, setLoading) => {
  try {
    console.log("user api " + token);
    

    
    const response = await axiosUserInstance.patch(
      `/couponactivate/${couponId}`,
      null,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
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



/////////////////////////////////////////


export const getUserApi = async (token) => {
  try {
    console.log("user api " + token);

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    // console.log(productId);
    const response = await axiosUserInstance.get(`/getuser`, config);
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

////////////user wishlist start///////////////////////
export const addToWishlist = async (token, productId) => {
  try {
    console.log("user api " + token);

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    // console.log(productId);
    const response = await axiosUserInstance.get(
      `/addtowishlist/${productId}`,
      config
    );
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

export const wishlistProductList = async (token) => {
  try {
    console.log("user api " + token);

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    // console.log(productId);
    const response = await axiosUserInstance.get(`/getwishlist`, config);
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

export const deleteWishList = async (token, productId) => {
  try {
    console.log("user api " + token);

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    // console.log(productId);
    const response = await axiosUserInstance.get(
      `/deletewishlist/${productId}`,
      config
    );
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

export const addToCartRemomeFromWishlist = async (token, productId) => {
  try {
    console.log("user api " + token);

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    // console.log(productId);
    const response = await axiosUserInstance.get(
      `/deletewishlistaddtocart/${productId}`,
      config
    );
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
////////////user wishlist end/////////////////////////

//////////////banner start////////////////////////////
export const userBanner = async (token, setLoading) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axiosUserInstance.get("/getbanner", config);
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
//////////////banner end//////////////////////////////


/////////////////////order start//////////////////////
export const buildOrder = async (
  token,
  totalPrice,
  orderAddress,
  appliedCoupon,
  discount,
  paymentMethod,
  setLoading
) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    console.log("order api");
    console.log(orderAddress);
    const response = await axiosUserInstance.post(
      "/orderproduct",
      { orderAddress, totalPrice, appliedCoupon, discount, paymentMethod },
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

export const cancelOrder = async (token, orderId, setLoading) => {
  try {
    console.log("user api " + token);

    const response = await axiosUserInstance.patch(
      `/cancelorder/${orderId}`,
      null,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
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
export const returnOrder = async (token, orderId, setLoading) => {
  try {
    console.log("user api " + token);

    const response = await axiosUserInstance.patch(
      `/returnorder/${orderId}`,
      null,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
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
export const paymentApi = async ( totalPrice,
        paymentToken,
        userToken,) => {
  try {
    const amount = totalPrice * 100;
    console.log("user api " + userToken);
    const config = {
      headers: { Authorization: `Bearer ${userToken}` },
    };

    const response = await axiosUserInstance.post(
      `/payment/`,
      { amount, paymentToken, userToken },
      config
    );
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

export const getOrderDetails = async (orderId, token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axiosUserInstance.get(`/getorderdetials/${orderId}`, config);
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

export const productRateApi = async (token, rate, productId, setLoading) => {
  try {
    console.log("user api " + token);

    const response = await axiosUserInstance.patch(
      `/rateproduct/${productId}`,
      { rate },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
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


/////////////////////order end////////////////////////


