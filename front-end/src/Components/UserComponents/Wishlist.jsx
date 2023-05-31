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

const wishlistItemsContainer = styled(Box)`
  padding: ${(props) => props.theme.spacing(2)};
  margin:5px
`;

const EmptyCart = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
`;

const SmallImage = styled("img")({
  width: "100%",
  maxHeight: 170,
  objectFit: "cover",
  cursor: "pointer",
  "@media (max-width: 600px)": {
    width: "70%",
    marginY: 2,
  },
});

const WishlistItem = ({
  item,
  imageUrl,
  setAddSuccess,
  wishlistItems,
  setWishlistItems,
}) => {
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
         setWishlistItems(
           wishlistItems.filter((item) => item.productId._id !== productId)
         );
        toast.success("Added To Cart");
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
        console.log(wishlistItems);
        setWishlistItems(
          wishlistItems.filter(
            (item) => item.productId._id !== productId
          )
        );
      toast.success("Removed From Wishlist", { icon: "💔" });
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
        sx={{
          marginRight: "10px",
          maxWidth: "8vw",
          minHeight: "35vh",
          // width: "100%",
          maxHeight: 170,
          objectFit: "cover",
          cursor: "pointer",
          "@media (max-width: 600px)": {
            width: "70%",
            marginY: 2,
          },
        }}
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
            ₹{item.productId.price}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleAddToCart(item.productId._id)}
            sx={{ borderRadius: 5, fontFamily: "Inria Serif" }}
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





  const getWishlist = useCallback(async () => {
    try {
      setLoading(true);
      const result = await wishlistProductList(token, setLoading);
      if (result.data) {
        console.log("test 4 ");
        //    console.log(result.data);
        setWishlistItems(result.data.wishlist.item);
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
  }, [getWishlist,  ]);

  ///////////////////////////////////////////////

 const EmptyWishlistContent = (
   <Typography variant="subtitle1">Your wishlist is empty</Typography>
 );

 const wishlistItemsContent = wishlistItems ? (
   <>
     <wishlistItemsContainer>
       <Toaster />

       {wishlistItems.length > 0 ? (
         wishlistItems.map((item) => (
           <WishlistItem
             key={item.id}
             item={item}
             wishlistItems={wishlistItems}
             //  handleUpdateCartQty={handleUpdateCartQty}
             //  handleRemoveFromCart={handleRemoveFromCart}
             imageUrl={item.productId.image?.[0]?.url}
             setWishlistItems={setWishlistItems}
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
         {wishlistItems
           .reduce((acc, item) => acc + item.productId.price * 1, 0)
           .toFixed(2)}
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
            <Button
              variant="outlined"
              sx={{ fontFamily: "Inria Serif", borderRadius: 5 }}
              onClick={() => {
                navigate("/shop");
              }}
            >
              Continue Shopping
            </Button>
            <Button
              sx={{ fontFamily: "Inria Serif", borderRadius: 5 }}
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
