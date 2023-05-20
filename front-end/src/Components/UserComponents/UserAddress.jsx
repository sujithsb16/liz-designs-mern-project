import React from 'react'
import { Card, CardContent, Typography } from "@mui/material";


const UserAddress = ({ address }) => {
  const styles = {
    card: {
      minWidth: 275,
      marginBottom: "1rem",
      backgroundColor: "#f5f5f5",
      borderRadius: "5px",
    },
    title: {
      fontSize: 14,
    },
    address: {
      fontSize: 16,
      fontWeight: "bold",
    },
  };
  return (
    <>
      <Card sx={styles.card}>
        <CardContent>
          <Typography
            sx={{ ...styles.address, fontFamily: "Inria Serif" }}
            color="text.secondary"
            gutterBottom
          >
            {address.title}
          </Typography>
          <Typography
            sx={{ ...styles.address, fontFamily: "Inria Serif" }}
            color="text.secondary"
          >
            Address : {address.address}
          </Typography>
          <Typography
            sx={{ ...styles.address, fontFamily: "Inria Serif" }}
            color="text.secondary"
          >
            City : {address.city}
          </Typography>
          <Typography
            sx={{ ...styles.address, fontFamily: "Inria Serif" }}
            color="text.secondary"
          >
            State : {address.state}
          </Typography>
          <Typography
            sx={{ ...styles.address, fontFamily: "Inria Serif" }}
            color="text.secondary"
          >
            Zip Code : {address.zipCode}
          </Typography>
          
        </CardContent>
      </Card>
    </>
  );
};

export default UserAddress
