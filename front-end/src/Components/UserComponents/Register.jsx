import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";
import Otp from "otp-input-react";
import { auth } from "../../utility/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { shadows } from "@mui/system";
import toast, { Toaster } from "react-hot-toast";
import { Alert } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import { userSignUp } from "../../apiCalls/userApiCalls";
import { userSignUpSchema } from "../../schema/Validation";
import { Link } from "react-router-dom";

export const toasts = () => {
  toast.success("OTP sended successfully");
};

const initialValues = {
  firstName: "",
  lastName: "",
  mobile: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const theme = createTheme();

  /////////////////////validation//////////

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: userSignUpSchema,
      onSubmit: (values) => {
        // submitHandler();
        moblieVerify();

        console.log(values);
      },
    });

  console.log(errors);

  /////////////////////////////////////////////////

  //For Registration//

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  //For otp//

  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);

  //////////////////////////////////////

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            moblieVerify();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  }

  function moblieVerify() {
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
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 4000);
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
        submitHandler();
        setLoading(false);
        setShowOtp(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.message);
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 4000);
        toast.error(error.message);
      });
  };

  const submitHandler = async () => {
    try {
      const userData = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        mobile: values.mobile,
        password: values.password,
      };

      setLoading(true);

      const result = await userSignUp(userData, setLoading);

      if (result.data) {
        setSuccess(true);
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
                          error={
                            errors.firstName && touched.firstName ? true : false
                          }
                          autoComplete="given-name"
                          name="firstName"
                          required
                          fullWidth
                          id="firstName"
                          value={values.firstName}
                          label={
                            errors.firstName ? errors.firstName : "First Name"
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
                          value={values.lastName}
                          error={
                            errors.lastName && touched.lastName ? true : false
                          }
                          label={
                            errors.lastName ? errors.lastName : "Last Name"
                          }
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
                          error={errors.email && touched.email ? true : false}
                          label={errors.email ? errors.email : "Email"}
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
                          error={errors.mobile && touched.mobile ? true : false}
                          label={errors.mobile ? errors.mobile : "Mobile No"}
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
                          error={
                            errors.password && touched.password ? true : false
                          }
                          label={errors.password ? errors.password : "Password"}
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          error={
                            errors.confirmPassword && touched.confirmPassword
                              ? true
                              : false
                          }
                          required
                          fullWidth
                          name="confirmPassword"
                          type="password"
                          // id="password"
                          autoComplete="new-password"
                          size="small"
                          value={values.confirmPassword}
                          label={
                            errors.confirmPassword
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
                        disabled={error ? true : false}
                        fullWidth
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

                    {message && (
                      <ErrorMessage severity="warning">{message}</ErrorMessage>
                    )}

                    <Grid container justifyContent="flex-start">
                      <Grid item>
                        <Link to={"/usersignin"} variant="body2">
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

export default Register;
