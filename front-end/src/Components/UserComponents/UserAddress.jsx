import React from 'react'
import { Button, Card, CardContent, Typography } from "@mui/material";
import { useSelector } from 'react-redux';
import { deleteAddressApi } from '../../apiCalls/userApiCalls';


const UserAddress = ({
  address,
  index,
  setAddAddressSuccess,
  addAddressSuccess,
}) => {
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

  const token = useSelector((state) => state.userLogin.userInfo.token);

  const deleteAddress = async (index) => {
    try {
      console.log("10");
      console.log(index);
      const result = await deleteAddressApi(token, index);

      // console.log("blocksucess2");

      if (result.data) {
        console.log("test 4 ");
        console.log(result.data);
        setAddAddressSuccess(!addAddressSuccess);
        //  setWishlistItems(
        //    wishlistItems.filter((item) => item.productId._id !== productId)
        //  );
      } else {
      }
    } catch (error) {
      // setLoading(false);
      console.log(error.message);
    }
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
        <Button
          variant="contained"
          color="primary"
          sx={{ fontFamily: "Roboto", fontSize: 16 }}
          onClick={() => deleteAddress(index)}
        >
          Delete
        </Button>
      </Card>
    </>
  );
};

export default UserAddress
