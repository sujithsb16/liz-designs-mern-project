
import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Loading from "../Loading";
import axios from "axios";
import ErrorMessage from "../ErrorMessage";
import Otp from "otp-input-react";
import { auth } from "../../utility/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { shadows } from "@mui/system";
import toast, { Toaster } from "react-hot-toast";
import Toastify from "toastify";
import { Alert } from "@mui/material";
import { userRegister } from "../../actions/userActions";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { onSignup, verifyOtp } from "../../actions/userActions";
import {useNavigate } from "react-router-dom";
import { axiosVendorInstance } from "../../utility/axios";
import { vendorSignUpSchema } from "../../schema/Validation";
import { useFormik } from "formik";
import { vendorSignUp } from "../../apiCalls/vendorApiCalls";

export const toasts = () => {
  toast.success("OTP sended successfully");
};

const initialValues = {
  firstName: "",
  lastName: "",
  experience: "",
  mobile: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const VenderSignup = () => {
  
 const navigate = useNavigate()   

  const theme = createTheme();

  //For Registration//

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  //For otp//


  ////////////////////validation///////////

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: vendorSignUpSchema,
      onSubmit: (values) => {
        submitHandler();
        // moblieVerify();

        console.log(values);
      },
    });

  console.log(errors);
////////////////////////////////////////////
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get("email"),
  //     password: data.get("password"),
  //   });
  // };

  // const dispatch = useDispatch();
  //    const userRegisters = useSelector((state) => state.userRegister);
  //    const { loading, error, showOtp, success } = userRegisters;

     function onCaptchVerify() {
       if (!window.recaptchaVerifier) {
         window.recaptchaVerifier = new RecaptchaVerifier(
           "recaptcha-container",
           {
             size: "invisible",
             callback: (response) => {
              //  onSignup();
              submitHandler()
             },
             "expired-callback": () => {},
           },
           auth
         );
       }
     }

  

  function submitHandler() {
    // dispatch(onSignup(mobile))
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;
    const formatPh = "+91" + values.mobile;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOtp(true);
        toast.success("OTP sended successfully");
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
        console.log(error.message);
        toast.error(error.message);
        
        
      });
  }

  

  const otpHandler = () => {
   
    setLoading(true);
    const code = otp;
    window.confirmationResult
      .confirm(code)
      .then(async (result) => {
        const user = result.user;
        vendorSignup()
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.message);
        toast.error(error.message);
      });
  };

  const vendorSignup = async () => {

    // dispatch(userRegister(firstName, lastName, email, mobile, password,confirmPassword))
   
      setMessage(null);
      setLoading(true)

      try {
         const vendorData = {
           firstName: values.firstName,
           lastName: values.lastName,
           email: values.email,
           experience: values.experience,
           mobile: values.mobile,
           password: values.password,
         };
       

       const result = await vendorSignUp(vendorData, setLoading);

       if (result.data) {
         setSuccess(true);
         setTimeout(() => {
           navigate("/vendor")
         }, 4000);
       } else {
         setError(true);
         setTimeout(() => {
           setError(false);
         }, 4000);
         toast.error(result);
       }

       console.log(result);

       setLoading(false);
      } catch (error) {
       setLoading(false);
       console.log(error);
       setError(true);
       setTimeout(() => {
         setError(false);
       }, 4000);
      }
    
  };
  return (
    <div>
      <Toaster toasterOptions={{ duratiom: 4000 }} />
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            bgcolor: "#E9E8E8",
            height: "34rem",
          }}
          display="flex"
          justifyContent="center"
          alignItems="center"
          maxWidth
        >
          <CssBaseline />

          {success ? (
            <Container component="main" maxWidth="xs">
              <Alert severity="success" variant="outlined">
                <strong>Registration Successful!!!</strong>
              </Alert>
            </Container>
          ) : (
            <Container component="main" maxWidth="xs">
              {showOtp ? (
                <Box
                  component="form"
                  noValidate
                  // onSubmit={verifyOtp}
                  boxShadow={10}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    bgcolor: "#20262E",
                    borderRadius: "0.5rem",
                    height: "12rem",
                  }}
                >
                  <Typography
                    variant="h5"
                    color={"whitesmoke"}
                    sx={{ my: "1rem" }}
                  >
                    Enter OTP
                  </Typography>
                  <Otp
                    value={otp}
                    autoFocus
                    onChange={setOtp}
                    OTPLength={6}
                    otpType="number"
                    disabled={false}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                    inputStyles={{
                      borderRadius: "5px",
                      marginRight: ".5rem",
                    }}
                  ></Otp>

                  {loading ? (
                    <Loading></Loading>
                  ) : (
                    <Button
                      sx={{
                        mt: 4,
                        mb: 1,
                        color: "black",
                        bgcolor: "secondary.main",
                        ":hover": {
                          bgcolor: "#CD5888",
                          color: "white",
                        },
                      }}
                      onClick={otpHandler}
                    >
                      <span>Verify OTP</span>
                    </Button>
                  )}

                 
                </Box>
              ) : (
                <Box
                  sx={{
                    marginTop: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    paddingTop: "2rem",
                  }}
                >
                  <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Sign up
                  </Typography>
                  <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 2 }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          autoComplete="given-name"
                          name="firstName"
                          required
                          fullWidth
                          id="firstName"
                          label={
                            errors.firstName && touched.firstName
                              ? errors.firstName
                              : "First Name"
                          }
                          value={values.firstName}
                          error={
                            errors.firstName && touched.firstName ? true : false
                          }
                          autoFocus
                          size="small"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          id="lastName"
                          name="lastName"
                          autoComplete="family-name"
                          size="small"
                          label={
                            errors.lastName && touched.lastName
                              ? errors.lastName
                              : "Last Name"
                          }
                          error={
                            errors.lastName && touched.lastName ? true : false
                          }
                          value={values.lastName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          id="email"
                          name="email"
                          autoComplete="email"
                          size="small"
                          value={values.email}
                          label={
                            errors.email && touched.email
                              ? errors.email
                              : "Email"
                          }
                          error={errors.email && touched.email ? true : false}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          // id="email"

                          name="mobile"
                          size="small"
                          value={values.mobile}
                          label={
                            errors.mobile && touched.mobile
                              ? errors.mobile
                              : "Mobile"
                          }
                          error={errors.mobile && touched.mobile ? true : false}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          // id="email"

                          name="experience"
                          size="small"
                          value={values.experience}
                          label={
                            errors.experience && touched.experience
                              ? errors.experience
                              : "Experience"
                          }
                          error={
                            errors.experience && touched.experience
                              ? true
                              : false
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          name="password"
                          type="password"
                          id="password"
                          autoComplete="new-password"
                          size="small"
                          value={values.password}
                          error={
                            errors.password && touched.password ? true : false
                          }
                          label={
                            errors.password && touched.password
                              ? errors.password
                              : "Password"
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          name="confirmPassword"
                          type="password"
                          // id="password"
                          autoComplete="new-password"
                          size="small"
                          value={values.confirmPassword}
                          error={
                            errors.confirmPassword && touched.confirmPassword
                              ? true
                              : false
                          }
                          label={
                            errors.confirmPassword && touched.confirmPassword
                              ? errors.confirmPassword
                              : "confirm Password"
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Grid>
                      {/* <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid> */}
                    </Grid>
                    {loading ? (
                      <Loading />
                    ) : (
                      <Button
                        type="submit"
                        fullWidth
                        disabled={error ? true : false}
                        variant="contained"
                        sx={{
                          mt: 3,
                          mb: 2,
                          bgcolor: "secondary.main",
                          ":hover": {
                            bgcolor: "#20262E",
                            color: "white",
                          },
                        }}
                      >
                        Sign Up
                      </Button>
                    )}
                    <div id="recaptcha-container"></div>

  

                    <Grid container justifyContent="flex-start">
                      <Grid item>
                        <Link href="#" variant="body2">
                          Already have an account? Sign in
                        </Link>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              )}
            </Container>
          )}
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default VenderSignup;

