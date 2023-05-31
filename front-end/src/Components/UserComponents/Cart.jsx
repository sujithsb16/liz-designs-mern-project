import React, { useState } from 'react'
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
  Rating,
  Typography,
  styled,
} from "@mui/material";
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { addToCart, deleteCart, updateToCart } from '../../apiCalls/userApiCalls';
import { useSelector } from 'react-redux';
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';




const CartItem = ({
  item,
  imageUrl,
  setAddSuccess,
  addSuccess,
}) => {
  const user = useSelector((state) => state.userLogin);
  const token = user?.userInfo?.token;
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async (productId) => {
    try {
      setLoading(true);
      console.log(productId);
      const result = await addToCart(token, productId);

      // console.log("blocksucess2");

      if (result.data) {
        console.log("test 4 ");
        console.log(result.data);
        setAddSuccess(!addSuccess)
        toast.success("Success");
        setLoading(false);
      } else {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 4000);
        toast.error(result);
      }
    } catch (error) {
      // setLoading(false);
      console.log(error.message);
    }
  };

  const handleUpdateCartQty = async (productId) => {
    try {
      setLoading(true);
      console.log(productId);
      const result = await updateToCart(token, productId);

      // console.log("blocksucess2");

      if (result.data) {
        console.log("test 4 ");
        console.log(result.data);
        setAddSuccess(!addSuccess);
        toast.success("Success");
        setLoading(false);
      } else {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 4000);
        toast.error(result);
      }
    } catch (error) {
      // setLoading(false);
      console.log(error.message);
    }
  };
  const handleRemoveFromCart = async (productId) => {
    try {
      setLoading(true);
      console.log(productId);
      const result = await deleteCart(token, productId);

      // console.log("blocksucess2");

      if (result.data) {
        console.log("test 4 ");
        console.log(result.data);
        setAddSuccess(!addSuccess);
        toast.success("Success");
        setLoading(false);
      } else {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 4000);
        toast.error(result);
      }
    } catch (error) {
      // setLoading(false);
      console.log(error.message);
    }
  };

  return (
    <Card sx={{ display: "flex", padding: "10px", margin: "10px" }}>
      <CardMedia
        component="img"
        height="100"
        image={imageUrl}
        alt={item.name}
        sx={{ marginRight: "10px",  maxWidth: "8vw",
          minHeight: "35vh",
          // width: "100%",
          maxHeight: 170,
          objectFit: "cover",
          cursor: "pointer",
          "@media (max-width: 600px)": {
            width: "70%",
            marginY: 2,} }}
      />
      <Box sx={{ flexGrow: 1 }}>
        <CardContent sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            variant="h6"
            gutterBottom
            style={{ fontFamily: "Inria Serif", fontSize: "1.2rem" }}
          >
            {item.productId.name}
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            style={{ fontFamily: "Arial, sans-serif", fontSize: "1rem" }}
          >
            {item.productId.price} x {item.qty}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <IconButton
            aria-label="Decrease quantity"
            onClick={() => handleUpdateCartQty(item.productId._id)}
          >
            <RemoveCircleOutlineIcon />
          </IconButton>
          <Typography
            sx={{
              margin: "0 10px",
              fontFamily: "Arial, sans-serif",
              fontSize: "1rem",
            }}
          >
            {item.qty}
          </Typography>
          <IconButton
            aria-label="Increase quantity"
            onClick={() => handleAddToCart(item.productId._id)}
          >
            <AddCircleOutlineIcon />
          </IconButton>
          <IconButton
            aria-label="Remove item"
            onClick={() => handleRemoveFromCart(item.productId._id)}
          >
            <ClearIcon />
          </IconButton>
        </CardActions>
      </Box>
    </Card>
  );
};




  const Wrapper = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 2;
    margin-top: ${(props) => props.theme.spacing(4)}px;
  `;

  const StyledPaper = styled(Paper)`
    padding: ${(props) => props.theme.spacing(2)};
    margin: auto;
    max-width: 800px;
    width: 800px;
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.2);
  `;

  const CartItemsContainer = styled(Box)`
    padding: ${(props) => props.theme.spacing(2)};
  `;

  const EmptyCart = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
  `;

const Cart = ({
  cartItems,
  handleUpdateCartQty,
  handleRemoveFromCart,
  setAddSuccess,
  addSuccess,
}) => {
  console.log(cartItems?.cart);

  const EmptyCartContent = (
    <Typography
      variant="subtitle1"
      sx={{  fontFamily: "Inria Serif" }}
    >
      Your cart is empt
    </Typography>
  );

  const CartItemsContent = cartItems?.cart?.items ? (
    <>
      <CartItemsContainer>
        {cartItems.cart.items.length > 0 ? (
          cartItems.cart.items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              handleUpdateCartQty={handleUpdateCartQty}
              handleRemoveFromCart={handleRemoveFromCart}
              imageUrl={item.productId.image?.[0]?.url}
              setAddSuccess={setAddSuccess}
              addSuccess={addSuccess}
            />
          ))
        ) : (
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ fontFamily: "Inria Serif" }}
          >
            Your cart is empty.
          </Typography>
        )}
      </CartItemsContainer>

      <Divider />
      <Box p={2} display="flex" justifyContent="flex-end">
        <Typography
          variant="h6"
          sx={{ fontFamily: "Inria Serif", fontSize: "1.5rem" }}
        >
          Total: ₹
          {cartItems.cart.items
            .reduce((acc, item) => acc + item.productId.price * item.qty, 0)
            .toFixed(2)}
        </Typography>
      </Box>
    </>
  ) : (
    EmptyCartContent
  );
   const navigate = useNavigate();
   


  return (
    <Wrapper>
      <Toaster />

      <StyledPaper>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontFamily: "Inria Serif", fontSize: "2.5rem" }}
        >
          Your Shopping Cart
        </Typography>
        {CartItemsContent}
        <Box m={2} display="flex" justifyContent="space-between">
          <Button
            variant="outlined"
            onClick={() => navigate("/shop")}
            sx={{ borderRadius: 5, fontFamily: "Inria Serif" }}
          >
            Continue Shopping
          </Button>
          <Button
            variant="contained"
            disabled={cartItems?.cart?.items.length === 0 ? true : false}
            color="primary"
            sx={{ borderRadius: 5, fontFamily: "Inria Serif" }}
            onClick={() => navigate("/checkout")}
          >
            Checkout
          </Button>
        </Box>
      </StyledPaper>
    </Wrapper>
  );
};
export default Cart;
