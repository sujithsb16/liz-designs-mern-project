import React, { useEffect } from 'react'
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Grid from "@mui/material/Grid";
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
} from "@mui/material";
import { useState } from 'react';
import product1 from "../../assets/single product.jpg";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);


const VenderHome = (props) => {


  const vendorDetail = useSelector((state) => state.vendorLogin);
  const { vendorInfo } = vendorDetail;

     const [hoveredIndex, setHoveredIndex] = useState(null);

     const navigate = useNavigate()

     const handleMouseEnter = (index) => {
       setHoveredIndex(index);
       console.log(props.isSmall);
     };

     const handleMouseLeave = () => {
       setHoveredIndex(null);
     };

     const test = props.props
     const cardNames = [
       { name: "Dashboard", },
       { name: "Add Products", },
       { name: "Dress 3", image: product1 },
       { name: "Dress 4", image: product1 },
     ];

     useEffect(() => {
       console.log(props.props);
       console.log(test);
     });

     useEffect(() => {
       if (!vendorInfo) {
         navigate("/vendor");
       }
     }, [navigate, vendorInfo]); 


  return (
    <>
      <Box
        maxWidth
        sx={{
          bgcolor: "#E9E8E8",
        }}
        // display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography
          variant="h4"
          fontWeight={{ xs: 400, sm: 500, md: 600, lg: 800 }}
          my={{ xs: 0.5, sm: 1, md: 1.6, lg: 2 }}
          sx={{
            fontFamily: "Inria Serif",
            color: "primary.main",
          }}
        >
          Welcome Tailor name
        </Typography>

        <Grid container >
          {cardNames.map((value, index) => {
            return (
              <Grid
                xs={12}
                sm={6}
                lg={3}
                item
                key={index}
                sx={{ padding: "5vh" }}
              >
                <Card
                  sx={{
                    minWidth: 275,
                    maxWidth: 275,
                    borderRadius: 10,
                    minHeight: 275,
                    boxShadow:15,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    <CardContent sx={{ textAlign: "center" }}>
                      <Button
                        onClick={() => {
                          navigate("/vendor/addproducts");
                        }}
                        sx={{
                          position: "relative",
                          top: "15vh",
                          backgroundColor:"alertInfo.main"
                        }}
                      >
                        {value.name}
                       
                      </Button>
                    </CardContent>
                  </Box>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
}

export default VenderHome
