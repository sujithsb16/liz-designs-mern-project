import React, { useEffect, useState } from 'react'
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Loading from '../../Components/Loading';
import { loginSchema } from '../../schema/Validation';
import { useFormik } from 'formik';
import toast, { Toaster } from "react-hot-toast";
import { adminLogin } from '../../apiCalls/adminApiCalls';
import { setAdminLogin } from '../../Redux/adminSlice';

const initialValues = {
  email: "",
  password: "",
};


const theme = createTheme();

const AdminSignIn = () => {


  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);


    const Navigate = useNavigate();

     const dispatch = useDispatch();
     const adminLogins = useSelector((state) => state.adminLogin);
     const { adminInfo, } = adminLogins;


     ////////////validation/////////
 const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
   useFormik({
     initialValues: initialValues,
     validationSchema: loginSchema,
     onSubmit: (values) => {
       submitHandler();

       console.log(values);
     },
   });
   ////////////////////////////////////




    const submitHandler = async() => {
      
      try {
      setLoading(true);
      console.log("test");

      const adminData = {
        email: values.email,
        password: values.password,
      };
      console.log(adminData);

      const result = await adminLogin(adminData, setLoading);

      // console.log(result);

      if (result.data) {
        console.log("test 4 ");
        console.log(result.data);
        dispatch(
          setAdminLogin({
            token: result.data.token,
            adminInfo: result.data,
          })
        );
      } else {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 4000);
        toast.error(result);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
       
     
    };

    useEffect(() => {
      if (adminInfo) {
        Navigate("/admin/dashboard");
      }
    }, [Navigate, adminInfo]);



  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Toaster toasterOptions={{ duratiom: 4000 }} />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                "url(https://garethpughstudio.com/wp-content/uploads/2021/07/How-to-Become-a-Successful-Fashion-Designer-7.jpg)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Admin Sign in
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label={
                    errors.email && touched.email
                      ? errors.email
                      : "Email Address"
                  }
                  error={errors.email && touched.email ? true : false}
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  type="password"
                  id="password"
                  error={errors.password && touched.password ? true : false}
                  label={
                    errors.password && touched.password
                      ? errors.password
                      : "Enter password"
                  }
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {/* <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                /> */}
                {loading ? (
                  <Loading></Loading>
                ) : (
                  <Button
                    type="submit"
                    disabled={error ? true : false}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                )}
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    {/* <Link href="#" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link> */}
                  </Grid>
                </Grid>
                {/* <Copyright sx={{ mt: "200px" }} /> */}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}

export default AdminSignIn
