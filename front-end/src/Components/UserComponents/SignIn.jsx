import React, { useEffect } from "react";
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
import { useState } from "react";
import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userActions";
const theme = createTheme();

const SignIn = () => {
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null)

  




   const dispatch = useDispatch();
   const userLogin = useSelector((state) => state.userLogin);
   const { loading, error, userInfo } = userLogin;


  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get("email"),
  //     password: data.get("password"),
  //   });
  // };

  //  useEffect(() => {
  //    setUser(localStorage.getItem("userInfo"));
  //    if (user) {
  //      Navigate("/");
  //    }
  //  }, [user, Navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
    // try {
    //   const config = {
    //     headers: {
    //       "Content-type": "application/json",
    //     },
    //   };
    //   setLoading(true);

    //   const { data } = await axios
    //     .post(
    //       "/users/login",
    //       {
    //         email,
    //         password,
    //       },
    //       config
    //     )
    //     // .then((response) => {
    //     //   // console.log(response.data.results);
    //     //   console.log("hi");

    //     // })
    //     .catch(function (error) {
    //       if (error.response) {
    //         setError(error.response.data.message);
    //       }
    //     });
    //   localStorage.setItem("userInfo", JSON.stringify(data));
    //   console.log(data);
    //   setLoading(false);
    //   setUser(localStorage.getItem("userInfo"));
    // } catch (error) {
    //   // setLoading(false);
    //   // setError(error.response.data.message);
    //   // console.log(error.response.data.message);
    // }
  };

  useEffect(() => {
    if (userInfo) {
      Navigate("/");
    }
  }, [ Navigate, userInfo]);


  return (
    <>
      <ThemeProvider theme={theme}>
        {/* <Container component="main" maxWidth="xs"> */}
        <CssBaseline />
        <Box
          sx={{
            bgcolor: "#E9E8E8",
            marginTop: 0,
            height: "34rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop:"4rem"
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={submitHandler}
            noValidate
            sx={{ pt: 2 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={email}
              autoComplete="email"
              autoFocus
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              autoComplete="current-password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
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
                Sign In
              </Button>
            )}

            {error ? <ErrorMessage>{error}</ErrorMessage> : ""}

            <Grid container mt={{ xs: 0.5, sm: 1, md: 1.6, lg: 2 }}
            alignItems="flex-start">
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/usersignup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
        {/* </Container> */}
      </ThemeProvider>
    </>
  );
};

export default SignIn;
