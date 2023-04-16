
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

export const toasts = () => {
  toast.success("OTP sended successfully");
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

  

  function submitHandler(event) {
    event.preventDefault();
    // dispatch(onSignup(mobile))
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;
    const formatPh = "+91" + mobile;

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
        toast.failed(error.message);
      });
  }

  

  const otpHandler = () => {
    // dispatch(
    //   verifyOtp(
    //     otp,
    //     firstName,
    //     lastName,
    //     email,
    //     mobile,
    //     password,
    //     confirmPassword
    //   )
    // );
    setLoading(true);
    const code = otp;
    window.confirmationResult
      .confirm(code)
      .then(async (result) => {
        const user = result.user;
        venderSignup()
        setLoading(false);
        // setShowOtp(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.message);
        toast.error(error.message);
      });
  };

  const venderSignup = async () => {

    // dispatch(userRegister(firstName, lastName, email, mobile, password,confirmPassword))
    if (password !== confirmPassword) {
      setLoading(true);
      setMessage("passwords does not match");
      console.log(message);
      setLoading(false);
    } else {
      setMessage(null);

      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        setLoading(true);

        const { data } = await axios
          .post(
            "/vender/register",
            {
              firstName,
              lastName,
              email,
              mobile,
              experience,
              password,
            },
            config
          ).then(()=> navigate("/venderVerification"))
          .catch(function (error) {
            if (error.response) {
              setLoading(false);
              setError(error.response.data.message);
              setMessage(error.response.data.message);
            }
          });
        console.log(data);
        // localStorage.setItem("venderInfo", JSON.stringify(data));
        setLoading(false);
        data ? setSuccess(true) : setSuccess(false);
      } catch (error) {
        setLoading(false);
        // console.log(error)
        setError(error.response.data.message);
      }
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

                  {error ? <ErrorMessage>{error}</ErrorMessage> : ""}
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
                    onSubmit={submitHandler}
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
                          label="First Name"
                          value={firstName}
                          autoFocus
                          size="small"
                          onChange={(e) => {
                            setFirstName(e.target.value);
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          id="lastName"
                          label="Last Name"
                          name="lastName"
                          autoComplete="family-name"
                          size="small"
                          value={lastName}
                          onChange={(e) => {
                            setLastName(e.target.value);
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                          size="small"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          // id="email"
                          label="Mobile No"
                          name="email"
                          size="small"
                          value={mobile}
                          onChange={(e) => {
                            setMobile(e.target.value);
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          // id="email"
                          label="Your Experience"
                          name=""
                          size="small"
                          value={experience}
                          onChange={(e) => {
                            setExperience(e.target.value);
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          autoComplete="new-password"
                          size="small"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          name="confirm Password"
                          label="confirm Password"
                          type="password"
                          // id="password"
                          autoComplete="new-password"
                          size="small"
                          value={confirmPassword}
                          onChange={(e) => {
                            setMessage(false);
                            setConfirmPassword(e.target.value);
                          }}
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

