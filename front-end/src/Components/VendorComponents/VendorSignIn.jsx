import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { vendorDetails } from "../../actions/vendorActions";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { axiosVendorInstance } from "../../utility/axios";
import { useFormik } from "formik";
import { loginSchema } from "../../schema/Validation";
import { vendorLogin } from "../../apiCalls/vendorApiCalls";
import { setVendorLogin } from "../../Redux/vendorSlice";
import toast, { Toaster } from "react-hot-toast";



const initialValues = {
  email: "",
  password: "",
};

const VendorSignIn = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const vendor = useSelector((state)=> state.vendorLogin)
  const {vendorInfo} = vendor
  ////////////////////validation//////////

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: loginSchema,
      onSubmit: (values) => {
        submitHandler();

        console.log(values);
      },
    });

  const submitHandler = async () => {
    setLoading(true);

    const vendorData = {
      email: values.email,
      password: values.password,
    };

    const result = await vendorLogin(vendorData, setLoading);

    if (result.data) {
      console.log("test 4 ");
      console.log(result.data);
      dispatch(
        setVendorLogin({
          token: result.data.token,
          vendorInfo: result.data,
        })
      );
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 4000);
      toast.error(result);
    }
  };

  useEffect(()=> {
    if(vendorInfo){
      Navigate("/vendorVerification");
    }
  },[vendorInfo])

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Toaster toasterOptions={{ duratiom: 4000 }} />
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
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
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              value={values.email}
              error={errors.email && touched.email ? true : false}
              label={errors.email ? errors.email : "Email Address"}
              onChange={handleChange}
              onBlur={handleBlur}
              id="email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={values.password}
              error={errors.password && touched.password ? true : false}
              label={errors.password ? errors.password : "Enter password"}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            {loading ? (
              <Loading />
            ) : (
              <>
                <Button
                  disabled={error ? true : false}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                {/* <Button
                  component="label"
                  variant="outlined"
                  startIcon={<UploadFileIcon />}
                  sx={{ marginRight: "1rem" }}
                >
                  upload image
                  <input
                    type="file"
                    accept=".jpg"
                    hidden
                    // onChange={(e) => handleFileUpload(e.target.files[0])}
              
                  />
                </Button> */}
              </>
            )}

            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link onClick={() => Navigate("/vendorsignup")} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </>
  );
};

export default VendorSignIn;
