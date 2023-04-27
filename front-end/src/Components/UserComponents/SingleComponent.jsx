import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from "prop-types";

import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useParams } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
import { addToCart, singleProduct } from '../../apiCalls/userApiCalls';
import { Box, Button, Divider, Grid, Paper, Rating, Typography, styled } from '@mui/material';
import Loading from '../Loading';
import { useSelector } from 'react-redux';

// import { Rating } from "@material-ui/lab";
// import { makeStyles } from "@material-ui/core/styles";



const Wrapper = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 0;
  background-color: #E9E8E8;
  padding: 1rem;
`;

const StyledPaper = styled(Paper)`
  padding: ${(props) => props.theme.spacing(2)};
  margin: auto;
  max-width: 800px;
  width: 800px;
 box-shadow: 0 4px 8px rgba(0,0,0,0.5);
  background-color: #e9e8e8;
`;

const Image = styled("img")({
  width: "100%",
  maxHeight: 600,
  objectFit: "cover",
});

const LargeImage = styled("img")({
  width: "100%",
  maxHeight: 600,
  objectFit: "cover",
});

const SmallImage = styled("img")({
  width: "100%",
  maxHeight: 150,
  objectFit: "cover",
  cursor: "pointer",
});





const SingleComponent = (props) => {

    const user = useSelector((state) => state.userLogin);
    const token = user.userInfo.token;

let { id } = useParams();
console.log(id);

const [product, setProduct] = useState([]);

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

    
console.log(product.image?.[0]?.url);


    const { post } = props;


    const handleAddToCart = async (productId) => {
      try {
        // setLoading(true);
        const result = await addToCart(token,
          productId
        );

        // console.log("blocksucess2");

        if (result.data) {
          console.log("test 4 ");
          console.log(result.data);
          toast.success("Added To Cart");
        //   setBlockSuccess(!blockSuccess);
        } else {
        //   setError(true);
        //   setTimeout(() => {
        //     setError(false);
        //   }, 4000);
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



  return (
    <>
      <Toaster toasterOptions={{ duratiom: 4000 }} />
      <Wrapper>
        <StyledPaper>
          {loading ? (
            <Loading />
          ) : (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <LargeImage
                  src={selectedImage || (product.image?.[0]?.url ?? "")}
                  alt="product"
                />
                <Grid container spacing={1}>
                  {(product.image?.slice(0) ?? []).map((image, index) => (
                    <Grid item xs={4} key={index}>
                      <SmallImage
                        src={image.url}
                        alt="product"
                        onClick={() => handleImageClick(image.url)}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h4" gutterBottom>
                  {product.name}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Rating value={product.rating} readOnly />
                </Box>
                <Typography variant="body1" gutterBottom>
                  {product.description}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Price: ${product.price}
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => {
                    handleAddToCart(product._id);
                  }}
                  color="primary"
                >
                  Add to Cart
                </Button>
              </Grid>
            </Grid>
          )}
        </StyledPaper>
      </Wrapper>
    </>
  );

}


export default SingleComponent
