import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Box,
} from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import React, { Fragment, useCallback, useEffect } from "react";
import { useState } from "react";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useLocation, useNavigate } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { addToWishlist, deleteWishList, wishlistProductList } from "../../apiCalls/userApiCalls";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Cards = (props) => {




const [error, setError] = useState(false);
const [loading, setLoading] = useState(false);
const [wishlist, setWishlist] = useState([])
const [addSuccess,setAddSuccess] = useState(false)
const user = useSelector((state) => state.userLogin);
const token = user?.userInfo?.token;
const location = useLocation();


const filteredProducts = props.products?.filter(
  (product) =>
    product.isVerified &&
    product.isBlocked &&
    product.name.toLowerCase().includes(search.toLowerCase())
);



  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseEnter = (value) => {
    setHoveredIndex(value);
    console.log(props.isSmall);
  };
  

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };
//////////////////wishlist/////////////////////

    const handleAddToWishlist = async (productId) => {
      try {
        setLoading(true);
        const result = await addToWishlist(token, productId);

        // console.log("blocksucess2");

        if (result.data) {
          setAddSuccess(!addSuccess);
          console.log("test 4 ");
          console.log(result.data);
          // Create the wishlist item with productId and price
          const wishlistItem = {
            productId: { _id: productId },
          };

          setWishlist((prevWishlist) => [...prevWishlist, wishlistItem]);
          console.log(wishlist);
          toast.success("Added To WishList", { icon: "💝" });
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

///////////////////////////////////////////
const getWishlist = useCallback(async () => {
  try {
    setLoading(true);
    const result = await wishlistProductList(token, setLoading);
    if (result.data) {
      setWishlist(result.data.wishlist.item);
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 4000);
      setLoading(false);
      console.log(result);
    }
    setLoading(false);
  } catch (error) {
    console.log(error);
  }
}, [token, setLoading]);
///////////////////////////////////////////
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
      // Remove the wishlist item from the wishlist array
      setWishlist((prevWishlist) =>
        prevWishlist.filter((item) => item.productId._id !== productId)
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
////////////////////////////////////////////

    const [search, setSearch] = useState("");

 const navigate = useNavigate()

  useEffect(() => {
    getWishlist();
  }, [getWishlist, ]);

  console.log(wishlist);

  return (
    <Fragment>
      <Toaster />

      <Box sx={{ minHeight: "100vh" }}>
        <Box
          maxWidth
          sx={{
            bgcolor: "#E9E8E8",
            display: "flex",
            // justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Grid container>
            <Grid
              xs={12}
              sm={6}
              lg={12}
              item
              sx={{
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h4"
                fontWeight={{ xs: 400, sm: 500, md: 600, lg: 800 }}
                my={{ xs: 1, sm: 2, md: 3, lg: 1 }}
                sx={{
                  fontFamily: "Inria Serif",
                  color: "primary.main",
                  textAlign: "center",
                  fontSize: {
                    xs: "1.7rem",
                    sm: "1.75rem",
                    md: "2rem",
                    lg: "2.5rem",
                  },
                }}
              >
                {props.vendorId ? " Vendors products" : " "}
                {!props.vendorId && location.pathname === "/shop"
                  ? "Happy Shopping"
                  : " "}
                {!props.vendorId && location.pathname === "/"
                  ? "New Arrivals"
                  : " "}
              </Typography>
            </Grid>
            <Grid
              xs={12}
              sm={6}
              lg={12}
              item
              sx={{
                justifyContent: "flex-end",
                display: "flex",
                alignItems: "center",
                paddingBottom: "1vw",
                paddingRight: "1vw",
              }}
            >
              {props.isShop ? (
                <Paper
                  component="form"
                  sx={{
                    p: "1px 4px",
                    display: "flex",
                    alignItems: "center",
                    width: { xs: 140, sm: 200 },
                    height: { xs: 25, sm: 40 },
                    borderRadius: 10,
                  }}
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <IconButton
                    type="button"
                    sx={{ p: "10px" }}
                    aria-label="search"
                  >
                    <SearchIcon />
                  </IconButton>
                </Paper>
              ) : (
                ""
              )}
            </Grid>
          </Grid>
        </Box>

        <Box
          sx={{
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
            width: "100%",
            paddingY: 4,
          }}
        >
          <Grid container spacing={4}>
            {props.products
              ?.filter(
                (product) =>
                  product.isVerified &&
                  !product.isBlocked &&
                  product.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((product) => {
                const isFavorite = wishlist.some(
                  (item) => item.productId._id === product._id
                );
                return (
                  <Grid
                    xs={12}
                    sm={6}
                    lg={3}
                    item
                    key={product._id}
                    sx={{
                      justifyContent: "center",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Card
                      key={product._id}
                      onMouseEnter={() => handleMouseEnter(product._id)}
                      onMouseLeave={handleMouseLeave}
                      sx={{
                        ...props.shopCards,
                        ...props.homeCards,
                        minHeight: "65vh",
                      }}
                    >
                      <Link
                        to={`/singleproduct/${product._id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <CardMedia
                          image={product.image[0].url}
                          sx={{
                            opacity: hoveredIndex === product._id ? 0.5 : 1,
                            width: "15rem",
                            height: "85%",
                          }}
                        />
                      </Link>

                      <CardActions
                      // onClick={() => {
                      //   navigate(`/singleproduct/${product._id}`);
                      // }}
                      >
                        {token &&
                          (!isFavorite ? (
                            <FavoriteBorderIcon
                              style={{
                                position: "absolute",
                                top: "6%",
                                right: "0%",
                                transform: "translate(-50%, -50%)",
                              }}
                              onClick={() => {
                                handleAddToWishlist(product._id);
                              }}
                            />
                          ) : (
                            <FavoriteIcon
                              style={{
                                position: "absolute",
                                top: "6%",
                                right: "0%",
                                transform: "translate(-50%, -50%)",
                              }}
                              onClick={() => {
                                handleRemoveFromWishlist(product._id);
                              }}
                            />
                          ))}
                      </CardActions>

                      <CardContent>
                        <Typography
                          color="primary"
                          variant="h6"
                          sx={{ fontFamily: "Inria Serif", margin: "-17px" }}

                          // fontWeight={{ xs: 550 }}
                        >
                          {product.name}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
          </Grid>
        </Box>

        {location.pathname === "/shop" ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
            <Button
              variant="contained"
              disabled={props.page === 1}
              onClick={() => props.setPage(props.page - 1)}
              sx={{ mr: 2, minWidth: "10vw", borderRadius: 5 }}
            >
              Previous Page
            </Button>
            <Button
              variant="contained"
              sx={{ minWidth: "10vw", borderRadius: 5 }}
              disabled={props.products.length < props.limit}
              onClick={() => props.setPage(props.page + 1)}
            >
              Next Page
            </Button>
          </Box>
        ) : (
          ""
        )}
      </Box>
    </Fragment>
  );
};

export default Cards;
