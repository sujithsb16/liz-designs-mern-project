import React from 'react'
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

const CartItem = ({
  item,
  handleUpdateCartQty,
  handleRemoveFromCart,
  imageUrl,
}) => {
  return (
    <Card sx={{ display: "flex", padding: "10px", margin: "10px" }}>
      <CardMedia
        component="img"
        height="100"
        image={imageUrl}
        alt={item.name}
        sx={{ marginRight: "10px" }}
      />
      <Box sx={{ flexGrow: 1 }}>
        <CardContent sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h6" gutterBottom>
            {item.name}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            {item.price.formatted_with_symbol} x {item.quantity}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <IconButton
            aria-label="Decrease quantity"
            onClick={() => handleUpdateCartQty(item.id, item.quantity - 1)}
          >
            <RemoveCircleOutlineIcon />
          </IconButton>
          <Typography sx={{ margin: "0 10px" }}>{item.quantity}</Typography>
          <IconButton
            aria-label="Increase quantity"
            onClick={() => handleUpdateCartQty(item.id, item.quantity + 1)}
          >
            <AddCircleOutlineIcon />
          </IconButton>
          <IconButton
            aria-label="Remove item"
            onClick={() => handleRemoveFromCart(item.id)}
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

const Cart = ({ cartItems, handleUpdateCartQty, handleRemoveFromCart }) => {

    console.log(cartItems.cart);

  const EmptyCartContent = (
    <Typography variant="subtitle1">Your cart is empty</Typography>
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
             imageUrl={item.image?.[0]?.url}
           />
         ))
       ) : (
         <Typography variant="subtitle1" gutterBottom>
           Your cart is empty.
         </Typography>
       )}
     </CartItemsContainer>

     <Divider />
     <Box p={2} display="flex" justifyContent="flex-end">
       <Typography variant="h6">
         Total: $
         {cartItems.cart.items
           .reduce((acc, item) => acc + item.price * item.quantity, 0)
           .toFixed(2)}
       </Typography>
     </Box>
   </>
 ) : (
   EmptyCartContent
 );






  return (
    <Wrapper>
      <StyledPaper>
        <Typography variant="h4" align="center" gutterBottom>
          Your Shopping Cart
        </Typography>
        {CartItemsContent}
        <Box m={2} display="flex" justifyContent="space-between">
          <Button variant="outlined" href="/">
            Continue Shopping
          </Button>
          <Button variant="contained" color="primary" href="/checkout">
            Checkout
          </Button>
        </Box>
      </StyledPaper>
    </Wrapper>
  );
};

export default Cart;
