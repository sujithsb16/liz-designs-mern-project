import React, { useCallback, useEffect, useState } from "react";
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
import { Card, CardContent, CardMedia, CardActions } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import {
  addToCart,
  addToCartRemomeFromWishlist,
  deleteCart,
  deleteWishList,
  updateToCart,
  wishlistProductList,
} from "../../apiCalls/userApiCalls";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";










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

const WishlistItem = ({ item, imageUrl, setAddSuccess, addSuccess }) => {
  const user = useSelector((state) => state.userLogin);
  const token = user?.userInfo?.token;
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

 

  const handleAddToCart = async (productId) => {
    try {
      setLoading(true);
      console.log(productId);
      const result = await addToCartRemomeFromWishlist(token, productId);

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


  const handleRemoveFromWishlist = async (productId) => {
    try {
      setLoading(true);
      console.log(productId);
      const result = await deleteWishList(token, productId);

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
        sx={{ marginRight: "10px", maxWidth: "18vw", minHeight: "30vh" }}
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
            {item.productId.price}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleAddToCart(item.productId._id)}
          >
            Add To Cart
          </Button>

          
          <IconButton
            aria-label="Remove item"
            onClick={() => handleRemoveFromWishlist(item.productId._id)}
          >
            <ClearIcon />
          </IconButton>
        </CardActions>
      </Box>
    </Card>
  );
};




const Wishlist = () => {


const user = useSelector((state) => state.userLogin);
const token = user?.userInfo?.token;
const [error, setError] = useState(false);
const [loading, setLoading] = useState(false);
const [wishlistItems, setWishlistItems] = useState([]);
const [addSuccess, setAddSuccess] = useState(false);





  const getWishlist = useCallback(async () => {
    try {
      setLoading(true);
      const result = await wishlistProductList(token, setLoading);
      if (result.data) {
        console.log("test 4 ");
        //    console.log(result.data);
        setWishlistItems(result.data);
      } else {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 4000);
        setLoading(false);
        console.log(result);
      }
      setLoading(false);
    } catch (error) {}
  }, [token]);


  useEffect(() => {
    getWishlist();
  }, [getWishlist, addSuccess ]);

  ///////////////////////////////////////////////

 const EmptyWishlistContent = (
   <Typography variant="subtitle1">Your wishlist is empty</Typography>
 );

 const wishlistItemsContent = wishlistItems?.wishlist?.item ? (
   <>
     <wishlistItemsContainer>
       {wishlistItems.wishlist.item.length > 0 ? (
         wishlistItems.wishlist.item.map((item) => (
           <WishlistItem
             key={item.id}
             item={item}
            //  handleUpdateCartQty={handleUpdateCartQty}
            //  handleRemoveFromCart={handleRemoveFromCart}
             imageUrl={item.productId.image?.[0]?.url}
             setAddSuccess={setAddSuccess}
             addSuccess={addSuccess}
           />
         ))
       ) : (
         <Typography variant="subtitle1" gutterBottom>
           Your wishlist is empty.
         </Typography>
       )}
     </wishlistItemsContainer>

     <Divider />
     <Box p={2} display="flex" justifyContent="flex-end">
       <Typography
         variant="h6"
         sx={{ fontFamily: "Inria Serif", fontSize: "1.5rem" }}
       >
         Total: ₹
         {/* {wishlistItems.item
           .reduce((acc, item) => acc + item.productId.price, 0)
           .toFixed(2)} */}
       </Typography>
     </Box>
   </>
 ) : (
   EmptyWishlistContent
 );

  ///////////////////////////////////////////////


  const navigate = useNavigate()
  return (
    <>
      <Wrapper>
        <Toaster toasterOptions={{ duratiom: 4000 }} />

        <StyledPaper>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontFamily: "Inria Serif", fontSize: "2.5rem" }}
          >
            Your WishList
          </Typography>
          {wishlistItemsContent}
          <Box m={2} display="flex" justifyContent="space-between">
            <Button variant="outlined" href="/">
              Continue Shopping
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                navigate("/cart");
              }}
            >
              Go To Cart
            </Button>
          </Box>
        </StyledPaper>
      </Wrapper>
    </>
  );
};

export default Wishlist;
