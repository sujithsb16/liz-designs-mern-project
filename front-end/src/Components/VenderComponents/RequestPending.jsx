import { Alert, createTheme, CssBaseline, ThemeProvider, } from '@mui/material';
import Typography from "@mui/material/Typography";
import { Box, Container } from '@mui/system';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const RequestPendingPage = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const venderDetails = useSelector((state) => state.venderDetails);
  const {venderInfo} = venderDetails
  const {isVerified} = venderInfo

  useEffect(() => {
    
    if(isVerified){
   navigate("/venderhome")
    }


  })


    const theme = createTheme();
    return (
      <>
        
          <CssBaseline />
          <Box
            sx={{
                bgcolor: "info.main",
              height: "34rem",
            }}
            display="flex"
            justifyContent="center"
            alignItems="center"
            maxWidth
          >
            <Container component="main" maxWidth="xs">
              <Box
                component="form"
                noValidate
                // onSubmit={verifyOtp}
                boxShadow={10}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  bgcolor: "white",
                  borderRadius: "0.5rem",
                  height: "12rem",
                }}
              >

                <Typography variant="h5">
                  <Alert severity="alertInfo" variant="filled">
                    <strong>Your Request is pending!  </strong>
                  </Alert>
                </Typography>
              </Box>
            </Container>
          </Box>
        
      </>
    );
}

export default RequestPendingPage
