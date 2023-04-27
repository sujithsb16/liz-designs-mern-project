
import { auth } from "../utility/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toasts } from "../Components/UserComponents/Register";

import {
  userError,
  userLoginFail,
  userLoginReq,
  userLoginSuccess,
  userLogout,
} from "../features/users/userLoginSlice";
import { userRegisterFail, userRegisterOtp, userRegisterReq, userRegisterSuccess } from "../features/users/userRegisterSlice";
import { async } from "@firebase/util";
import { axiosUserInstance } from "../utility/axios";


export const login = (email, password) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    dispatch(userLoginReq());

    const { data } = await axiosUserInstance.post(
      "/login",
      {
        email,
        password,
      },
      config
    );

    console.log(data);

    dispatch(userLoginSuccess(data));

    localStorage.setItem("userInfo", JSON.stringify(data));

  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(userLoginFail(errorIs));
     setTimeout(() => {
     dispatch(userLoginFail());
     }, 4000);
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch(userLogout());
};

function onCaptchVerify() {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          onSignup();
        },
        "expired-callback": () => {},
      },
      auth
    );
  }
}

export const onSignup =
  (mobile) =>
  async (dispatch) => {
    //   event.preventDefault();
    // setLoading(true);
    dispatch(userRegisterReq());
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;
    const formatPh = "+91" + mobile;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        // setLoading(false);
        //   setShowOtp(true);
        dispatch(userRegisterOtp());
        toasts()
        //   toast.success("OTP sended successfully");
      })
      .catch((error) => {
        // setLoading(false);
        // setError(error.message);
        //   toast.failed(error.message);
        dispatch(userRegisterFail(error.message));
      });
  };

 export const verifyOtp = ( otp, firstName, lastName, email, mobile, password, confirmPassword ) => async(dispatch) => {
    // setLoading(true);
    dispatch(userRegisterReq());
    const code = otp;
    window.confirmationResult
      .confirm(code)
      .then(async (result) => {
        const user = result.user;
       dispatch(userRegister(
          firstName,
          lastName,
          email,
          mobile,
          password,
          confirmPassword
        )) 
        console.log("hlo");
        // setLoading(false);
        // setShowOtp(false);
        // dispatch(userRegisterOtp())
        dispatch(userRegisterSuccess());
      })
      .catch((error) => {
        // setLoading(false);
        console.log(error.message);
        dispatch(userRegisterFail(error.message));
        // toast.error(error.message);
      });
  };
  








export const userRegister =
  (firstName, lastName, email, mobile, password, confirmPassword) => async (dispatch) => {
    if (password !== confirmPassword) {
        dispatch(userRegisterReq())
    //   setLoading(true);
      dispatch(userRegisterFail("passwords does not match"));
    //   console.log(message);
    //   setLoading(false);
    } else {
    //   setMessage(null);

      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        dispatch(userRegisterReq());
        // setLoading(true);

        const { data } = await axiosUserInstance.post(
            "/register",
            {
              firstName,
              lastName,
              email,
              mobile,
              password,
            },
            config
          )
          .catch(function (error) {
            if (error.response) {
            //   setError(error.response.data.message);
            //   setMessage(error.response.data.message);
              dispatch(userRegisterFail(error.response.data.message));
            }
          });
        console.log(data);
        // localStorage.setItem("userInfo", JSON.stringify(data));
        // setLoading(false);
        dispatch(userRegisterSuccess())
        // data ? setSuccess(true) : setSuccess(false);
      } catch (error) {
        // setLoading(false)
        // console.log(error)
        dispatch(userRegisterFail(error.response.data.message));
        // setError(error.response.data.message);
      }
    }
  };