
import { vendorDetailsReq } from "../features/vendor/vendorDetailsSlice";
import { axiosVendorInstance } from "../utility/axios";


export const vendorDetails = (email) => async (dispatch) => {
    try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const { data } = await axiosVendorInstance.post(
          "/vendordetails",
          {
            email,
          },
          config
        ).then(({data}) => {
            // console.log(data.data);
            dispatch(vendorDetailsReq(data));} );
    } catch (error) {
        
    }
} 

