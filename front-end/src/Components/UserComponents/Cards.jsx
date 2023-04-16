import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
} from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import product1 from "../../assets/single product.jpg";

const Cards = (props) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
    console.log(props.isSmall);
  };
  

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const test = props.props

  const cardNames = [
    { name: "Dress 1", image: product1 },
    { name: "Dress 2", image: product1 },
    { name: "Dress 3", image: product1 },
    { name: "Dress 4", image: product1 },
  ];

  useEffect(()=>{
    console.log(props.props);
    console.log(test);
  })

  return (
    <Fragment>
     
      <Grid container sx={{  justifyContent: "center" }}>
        {cardNames.map((value, index) => {
          return (
            <Grid
              xs={12}
              sm={6}
              lg={3}
              item
              key={index}
              // sx={{ borderRadius: 5 }}
            >
              <Card
                key={index}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                
                sx={{
                //  justifyItems:"center",
                //  justifyContent:"center",
                // alignItems:"center",
                  
                  ...props.shopCards,
                  ...props.homeCards,
                }}
              >
                <CardMedia
                  image={value.image}
                  sx={{
                    // height: { xs: 200, sm: 250 },
                    opacity: hoveredIndex === index ? 0.5 : 1,
                    width:"15rem",
                    height:"80%"
                    
                  }}
                />

                {hoveredIndex === index && (
                  <CardActions
                    style={{
                      position: "absolute",
                      top: "90%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <Button variant="contained" color="primary">
                      View
                    </Button>
                  </CardActions>
                )}
                <CardContent
                sx={{height:"20%"}}>
                  <Typography
                    color="primary"
                    variant="h6"
                    fontWeight={{ xs: 550 }}
                     
                  >
                    {value.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Fragment>
  );
};

export default Cards;
