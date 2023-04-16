import React, { useState } from 'react'
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
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../Loading';
import ErrorMessage from '../ErrorMessage';
import { useDispatch } from 'react-redux';
import { venderDetails } from "../../actions/venderActions";
import UploadFileIcon from "@mui/icons-material/UploadFile";

const VendorSignIn = () => {

    const dispatch = useDispatch()
    const Navigate = useNavigate()

    //  const handleSubmit = (event) => {
    //    event.preventDefault();
    //    const data = new FormData(event.currentTarget);
    //    console.log({
    //      email: data.get("email"),
    //      password: data.get("password"),
    //    });
    //  };
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPasword] = useState("")
    const [error, setError] = useState(null)
    const [pic,setPics] = useState(null)
    const [message, setMessage] = useState(null)

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true)
       const config = {
         headers: {
           "Content-type": "application/json",
         },
       };
      //  setLoading(true);
      const { data } = await axios
        .post("/vender/signin", { email, password }, config)
        .then(
          
         async ({data}) => {await localStorage.setItem("venderInfo", JSON.stringify(data));
         await dispatch(venderDetails(email))
            Navigate("/venderVerification")})
        .catch( (error) => {
          if (error.response) {
            setLoading(false);
            console.log(error.response);
            setError(error.response.data.message);
            setMessage(error.response.data.message);
          }
        });
    }

    // const handleFileUpload = (pics)=> {
    //   const data = new FormData();
    //   data.append("file",pics);
    //   data.append("upload_preset","project");
    //   data.append("cloud_name", "dqsrpxhjq");
    //   fetch("https://api.cloudinary.com/v1_1/dqsrpxhjq/image/upload",{method:"post", body:data,})
       
    //       .then((res) => res.json())
    //       .then((data) => {
    //         let {url} = data 
    //         console.log(data.url);
    //         console.log(url);
    //         // setPics(data.url.toString());
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });

    // }

    //  const postDetails = (pics) => {
    //    if (pics.type === "image/jpeg" || pics.type === "image/png") {
    //      const data = new FormData();
    //      data.append("file", pics);
    //      data.append("upload_preset", "notemaker");
    //      data.append("cloud_name", "dh7awu1h4");
    //      fetch("https://api.cloudinary.com/v1_1/dh7awu1h4/image/upload", {
    //        method: "post",
    //        body: data,
    //      })
    //        .then((res) => res.json())
    //        .then((data) => {
    //          console.log(data);
    //         //  setPic(data.url.toString());
    //        })
    //        .catch((err) => {
    //          console.log(err);
    //        });
    //    } else {
    //     //  return setPicMessage("Please Select an Image");
    //    }
    //  };



  return (
    <>
      <Container component="main" maxWidth="xs">
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPasword(e.target.value)}
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
            {error ? <ErrorMessage children={error} /> : ""}

            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link onClick={() => Navigate("/vendersignup")} variant="body2">
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
}

export default VendorSignIn
