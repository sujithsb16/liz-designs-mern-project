import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Typography, Grid, Box, Stack, Divider, Button } from '@mui/material';
import { getOrderDetails } from '../../apiCalls/userApiCalls';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';

// Import API functions to fetch order details


const ProductImage = styled.img`
  width: 100px;
  height: 150px;
  object-fit: cover;
  margin-right: ${({ theme }) => theme.spacing(2)};
`;
  

const OrderSuccessPage = () => {
  const { orderId } = useParams(); // Get the order ID from the URL params
  const [order, setOrder] = useState(null);
  const user = useSelector((state) => state.userLogin);
  const token = user?.userInfo?.token;
   const navigate = useNavigate();


  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const orderData = await getOrderDetails(orderId, token); // Fetch order details from API
        // console.log(orderData.data.order);
        setOrder(orderData.data.order);
      } catch (error) {
        console.error("Failed to fetch order details:", error);
      }
    };

    fetchOrderDetails();
  }, [orderId, token]);

  if (!order) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography>Loading order details...</Typography>
      </Box>
    );
  }   
  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          justifyContent: "center",
          padding: 5,
          backgroundColor: "info.main",
          borderRadius: 5,
        }}
      >
        <Typography
          variant="h4"
          fontFamily="Inria Serif"
          sx={{ marginBottom: 5 }}
        >
          Order Details
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          {order.products.items.map((item) => (
            <>
              <Box
                sx={{ borderRadius: 5, boxShadow: 10, minWidth: "20vw" }}
                key={item.productId._id}
              >
                <Typography variant="h6" fontFamily="Inria Serif">
                  Order Items
                </Typography>{" "}
                <Link
                  to={`/singleproduct/${item.productId._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <ProductImage
                    src={item.productId.image[0].url}
                    alt={item.productId.name}
                  />
                  <Box sx={{ flexWrap: "wrap" }}>
                    <Typography fontFamily="Inria Serif">
                      {item.productId.name}
                    </Typography>
                    <Typography fontFamily="Inria Serif">
                      Quantity: {item.qty}
                    </Typography>
                    <Typography fontFamily="Inria Serif">
                      Price: {item.price}
                    </Typography>
                  </Box>
                </Link>
              </Box>
            </>
          ))}
        </Stack>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 5,
          }}
        >
          {" "}
          <Box
            sx={{
              borderRadius: 5,
              boxShadow: 10,
              minWidth: "20vw",
              minHeight: "24vh",
            }}
          >
            {" "}
            <Typography variant="h6" fontFamily="Inria Serif">
              Shipping Information
            </Typography>
            <Typography fontFamily="Inria Serif">Name: {order.name}</Typography>
            <Typography fontFamily="Inria Serif">
              Address: {order.address}
            </Typography>
            <Typography fontFamily="Inria Serif">City: {order.city}</Typography>
            <Typography fontFamily="Inria Serif">
              State: {order.state}
            </Typography>
            <Typography fontFamily="Inria Serif">Zip: {order.zip}</Typography>
          </Box>
          <Box
            sx={{
              borderRadius: 5,
              boxShadow: 10,
              minWidth: "20vw",
              minHeight: "24vh",
              justifyContent: "center",
            }}
          >
            {" "}
            <Box sx={{ marginTop: 4 }}>
              <Typography variant="h6" fontFamily="Inria Serif">
                Order Information
              </Typography>
              <Typography fontFamily="Inria Serif">
                Order ID: {order._id}
              </Typography>
              <Typography fontFamily="Inria Serif">
                Payment Method: {order.payment}
              </Typography>
              <Typography fontFamily="Inria Serif">
                Total Price: {order.products.totalPrice}
              </Typography>
            </Box>
          </Box>
        </Stack>
        <Button
          variant="outlined"
          onClick={() => navigate("/shop")}
          sx={{
            borderRadius: 5,
            fontFamily: "Inria Serif",
            marginTop: { sm: 2, lg: 7 },
          }}
        >
          Continue Shopping
        </Button>
      </Box>
    </>
  );
}

export default OrderSuccessPage
