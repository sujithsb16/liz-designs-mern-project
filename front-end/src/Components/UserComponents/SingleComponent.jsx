import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from "prop-types";

import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useNavigate, useParams } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
import { addToCart, singleProduct } from '../../apiCalls/userApiCalls';
import { Box, Button, Divider, Grid, Paper, Rating, Typography, styled } from '@mui/material';
import Loading from '../Loading';
import { useSelector } from 'react-redux';
import ZoomImageOnHover from './ZoomImageOnHover';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";



// import { Rating } from "@material-ui/lab";
// import { makeStyles } from "@material-ui/core/styles";



const Wrapper = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 0;
  background-color: #e9e8e8;
  padding: 1rem;
  @media (max-width: 960px) {
    padding: 1vw;
  }
`;

const StyledPaper = styled(Paper)`
  padding: ${(props) => props.theme.spacing(2)};
  margin: auto;
  max-width: 800px;
  width: 100%;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  background-color: #e9e8e8;

  @media (max-width: 600px) {
    max-width: 90vw;
  }

  @media (min-width: 960px) {
    max-width: 60vw;
  }
`;

const Image = styled("img")({
  width: "100%",
  maxHeight: 600,
  objectFit: "cover",
});

const LargeImage = styled("img")({
  width: "100%",
  maxHeight: 540,
  objectFit: "cover",
  "@media (max-width: 600px)": {
    width: "70%",
  },
});

const ZoomContainer = styled(Box)({
  position: "relative",
  
});

const SmallImage = styled("img")({
  width: "100%",
  maxHeight: 170,
  objectFit: "cover",
  cursor: "pointer",
  "@media (max-width: 600px)": {
    width: "70%",
    marginY:2
  },
});




const SingleComponent = (props) => {

  const MySwal = withReactContent(Swal);

    const navigate = useNavigate();


    const user = useSelector((state) => state.userLogin);
    const token = user?.userInfo?.token;


    


let { id } = useParams();
console.log(id);

const [product, setProduct] = useState([]);
const [goToCart, setGoTOCart] = useState(false)

const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);


    const [selectedImage, setSelectedImage] = useState("");





    const getSingleProduct = useCallback(async () => {
      try {
        setLoading(true);
        const result = await singleProduct(id, setLoading);
        if (result.data) {
          console.log("test 4 ");
          console.log(result.data);
          setProduct(result.data);
        } else {
          setError(true);
          setTimeout(() => {
            setError(false);
          }, 4000);
          setLoading(false);
          toast.error(result);
          console.log(result);
        }
        setLoading(false);
      } catch (error) {}
    }, [id, setLoading]);

    const handleShoppingCartClick = () => {
 MySwal.fire({
   icon: "warning",
   title: "Please Login",
   time: 4000,
 }).then(() => {
   navigate("/usersignin");
 });  
 };




    const handleAddToCart = async (productId) => {
      try {
        setLoading(true);
        const result = await addToCart(token,
          productId
        );

        // console.log("blocksucess2");

        if (result.data) {
          console.log("test 4 ");
          console.log(result.data);
          setGoTOCart(true)
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

     

    // useEffect(() => {
    //   const fetching = async () => {
    //     const { data } = await axios.get(`/api/notes/${id}`);

    //     setTitle(data.title);
    //     setContent(data.content);
    //     setCategory(data.category);
    //     setDate(data.updatedAt);
    //   };

    //   fetching();
    // }, []);
    
    useEffect(() => {
      getSingleProduct();
    }, [getSingleProduct]);

    const handleImageClick = (imageUrl) => {
      setSelectedImage(imageUrl);
    };

    /////////////image zoom///////////////////////


    /////////////////////////////////////////////


  return (
    <>
      <Toaster />{" "}
      <Wrapper>
        <StyledPaper sx={{ boxShadow: 10 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              {/* <LargeImage
                src={selectedImage || (product.image?.[0]?.url ?? "")}
                alt="product"
              /> */}
              <ZoomContainer>
                <ZoomImageOnHover
                  src={selectedImage || (product.image?.[0]?.url ?? "")}
                />
              </ZoomContainer>

              <Grid container spacing={1}>
                {(product.image?.slice(0) ?? []).map((image, index) => (
                  <Grid item xs={4} key={index}>
                    <SmallImage
                      src={image.url}
                      alt="product"
                      onClick={() => handleImageClick(image.url)}
                      sx={{ marginTop: 2, marginLeft: 0 }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="h4"
                gutterBottom
                sx={{ fontFamily: "Inria Serif" }}
              >
                {product.name}
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Rating value={product.rating} readOnly />
              </Box>
              <Typography
                variant="body1"
                gutterBottom
                sx={{ fontFamily: "Inria Serif" }}
              >
                {product.description}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontFamily: "Inria Serif" }}
              >
                Price: ₹ {product.price}
              </Typography>

              {token ? (
                <Button
                  disabled={loading ? true : false}
                  variant="contained"
                  sx={{
                    my: 3,
                    width: { xs: "auto", sm: "auto", lg: "10vw" },
                    borderRadius: 5,
                    fontFamily: "Inria Serif",
                  }}
                  onClick={
                    goToCart
                      ? () => {
                          navigate("/cart");
                        }
                      : () => {
                          handleAddToCart(product._id);
                        }
                  }
                  color="primary"
                >
                  {goToCart ? "Go To Cart" : "Add to Cart"}
                </Button>
              ) : (
                <Button
                  disabled={loading ? true : false}
                  variant="contained"
                  sx={{
                    my: 3,
                    width: { xs: "auto", sm: "auto", lg: "10vw" },
                    borderRadius: 5,
                    fontFamily: "Inria Serif",
                  }}
                  onClick={handleShoppingCartClick}
                  color="primary"
                >
                  {"Add to Cart"}
                </Button>
              )}

              <Box
                sx={{
                  my: 3,
                  backgroundColor: "info.main",
                  padding: "10px",
                  boxShadow: 10,
                  borderRadius: 5,
                  // width:"30vw"
                  marginX: 5,
                  "@media (max-width: 600px)": {
                    marginX: 5,
                  },
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    mb: 1,
                    fontFamily: "Inria Serif",
                    fontWeight: "bold",
                    color: "black",
                    letterSpacing: "1px",
                    lineHeight: "1.5em",
                  }}
                >
                  Tailor Details
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography
                      variant="body2"
                      sx={{ fontFamily: "Open Sans", marginLeft: ".7vw" }}
                    >
                      Name: {product?.vendor?.firstName}
                    </Typography>
                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{ fontSize: ".6rem", padding: "4px 6px" }}
                      onClick={() => navigate(`/shop/${product?.vendor?._id}`)}
                    >
                      View Tailor
                    </Button>
                  </Box>
                  <Typography variant="body2" sx={{ fontFamily: "Open Sans" }}>
                    Email: {product?.vendor?.email}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontFamily: "Open Sans", marginLeft: "-3vw" }}
                  >
                    Phone: {product?.vendor?.mobile}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Button
            // disabled={loading? true: false}
            variant="contained"
            disabled={!token ? true : false}
            sx={{ my: 3, borderRadius: 5, fontFamily: "Inria Serif" }}
            onClick={() => {
              navigate("/checkout");
            }}
            color="primary"
          >
            Check Out
          </Button>
        </StyledPaper>
      </Wrapper>
    </>
  );

}


export default SingleComponent
