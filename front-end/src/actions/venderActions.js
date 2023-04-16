import axios from "axios";
import { venderDetailsReq } from "../features/vender/venderDetailsSlice";



export const venderDetails = (email) => async (dispatch) => {
    try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const { data } = await axios.post(
          "/vender/venderdetails",
          {
            email,
          },
          config
        ).then(({data}) => {
            // console.log(data.data);
            dispatch(venderDetailsReq(data));} );
    } catch (error) {
        
    }
} 

