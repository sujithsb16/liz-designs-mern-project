import React, { useCallback, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import { Button, Grid, Paper, TextField } from "@mui/material";
import { styled } from "@mui/material/styles"; // Import styled from @mui/material/styles for Material-UI v5
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getCategory } from "../../actions/adminActions";
import { useState } from "react";
import {
  vendorAddProduct,
  vendorCategoryList,
  vendorProductList,
} from "../../apiCalls/vendorApiCalls";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import Loading from "../Loading";
import { productSchema } from "../../schema/Validation";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

// const top100Films = [
//   { label: 'The Shawshank Redempt', year: 1994 },
//   { label: 'The Godfather', year: 1972 },
//   { label: 'The Godfather: Part II', year: 1974 },]

const initialValues = {
  name: "",
  price: "",
  description: "",
};

// const StyledTextField = styled(TextField)(({ theme }) => ({
//   marginTop: theme.spacing(2), // Add margin top to create spacing
// }));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));





function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const AddProducts = () => {
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("");

  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);

  const [categoryList, setCategoryList] = useState([]);
  const [productList, setProductList] = useState([]);

  const [error, setError] = useState(false);

  const vendor = useSelector((state) => state.vendorLogin);
  const token = vendor.vendorInfo.token;

  ////////////////////////////////////


  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: productSchema,
      onSubmit: (values) => {
        submitHandler();
        // moblieVerify();

        console.log(values);
      },
    });

  ////////////////////////////////////

  ////////image upload/////////

  function handleUpload(event) {
    const files = Array.from(event.target.files);
    console.log(files);
    files.forEach((file) => {
      console.log(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImages((oldArray) => [...oldArray, reader.result]);
      };
    });
  }
  /////////////////////////////////////

  /////////////////////handle submit///////

  const submitHandler = async () => {
    // Prevents the default form submission behavior
    try {
      setLoading(true);
      const formData = {
        name: values.name,
        price: values.price,
        description: values.description,
        category: category,
      };

      console.log(formData);
      console.log(images);

      const result = await vendorAddProduct(
        token,
        formData,
        images,
        setLoading
      );
      if (result.data) {
        console.log("test 4 ");
        console.log(result.data);
        setImages([]);
      } else {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 4000);
        setLoading(false);
        toast.error(result);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChang = (event, newValue) => {
    setValue(newValue);
  };

  ////////////////////////////////////////
  const getCategory = useCallback(async () => {
    try {
      setLoading(true);
      const result = await vendorCategoryList(token, setLoading);
      if (result.data) {
        console.log("test 4 ");
        console.log(result.data);
        setCategoryList(result.data);
      } else {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 4000);
        setLoading(false);
        toast.error(result);
      }
      setLoading(false);
    } catch (error) {}
  }, [token]);


  /////////////////////////////////////////

  const getProducts = useCallback(async () => {
    try {
      setLoading(true);
      const result = await vendorProductList(token, setLoading);
      if (result.data) {
        console.log("test 4 ");
        console.log(result.data);
        setProductList(result.data);
      } else {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 4000);
        setLoading(false);
        toast.error(result);
      }
      setLoading(false);
    } catch (error) {}
  }, [token]);


  /////////////////////////////////////////

  ///////////////////////////////////////////

  const options = categoryList
    .filter(({ isBlocked }) => !isBlocked)
    .map(({ category }) => ({ label: category }));

  useEffect(() => {
    getCategory();
    getProducts();
  }, [getCategory, getProducts]);

  console.log(productList);

  ///////////////////////////////////////////
  return (
    <>
      <Box sx={{ width: "100%", paddingLeft: "1rem" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Toaster toasterOptions={{ duratiom: 4000 }} />

          <Tabs
            value={value}
            onChange={handleChang}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Products" {...a11yProps(0)} />
            <Tab label="Add Products" {...a11yProps(1)} />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          <TableContainer
            component={Paper}
            sx={{
              marginTop: "-.5rem",
              height: "100%",
              width: "69.5rem",
              marginLeft: "7vw",
            }}
          >
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell align="center">Price</StyledTableCell>
                  <StyledTableCell align="center">Category</StyledTableCell>
                  <StyledTableCell align="center">Status</StyledTableCell>
                  {/* <StyledTableCell align="center">Carbs&nbsp;(g)</StyledTableCell> */}
                  <StyledTableCell align="center">
                    List/Unlist
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productList.map((product) => (
                  <StyledTableRow key={product._id}>
                   
                      <>
                        <StyledTableCell component="th" scope="row">
                          {product.name}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {product.price}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {product.categoryId.category}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {product.isVerified  ? <Typography variant="sub2"  color={"green"}>Verified</Typography> : <Typography variant="sub2"  color={"brown"}>Pending</Typography>}
                        </StyledTableCell>
                        {/* <StyledTableCell align="center">{row.carbs}</StyledTableCell> */}
                        <StyledTableCell align="center">
                          <Button
                            variant="contained"
                            color={product.isBlocked ? "error" : "success"}
                            sx={{
                              width: "6rem", // Set the desired width for the button
                              "@media (max-width: 960px)": {
                                width: "10vw", // Set the desired width for smaller screens
                              },
                            }}
                            onClick={() => {
                              // handleVendorBlock(product._id, product.isBlocked);
                            }}
                          >
                            {!product.isBlocked ? "UnBlock" : "Block"}
                          </Button>
                        </StyledTableCell>
                      </>
                   
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Paper
              sx={{
                bgcolor: "info.main",
                padding: 2,
                height: "auto",
                width: "60vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 6,
                boxShadow: 10,
              }}
            >
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 2 }}
                maxWidth={500}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="given-name"
                      name="name"
                      required
                      fullWidth
                      id="name"
                      label={
                        errors.name && touched.name
                          ? errors.name
                          : "Product Name"
                      }
                      value={values.name}
                      error={errors.name && touched.name ? true : false}
                      autoFocus
                      // size="small"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="price"
                      name="price"
                      autoComplete="family-name"
                      // size="small"
                      label={
                        errors.price && touched.price
                          ? errors.price
                          : "Enter Price"
                      }
                      error={errors.price && touched.price ? true : false}
                      value={values.price}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={options}
                      value={category}
                      onChange={(event, newValue) => {
                        setCategory(newValue ? newValue.label : ""); // set the selected value in state
                      }}
                      getOptionSelected={(option, value) =>
                        option.label === value.label
                      }
                      renderInput={(params) => (
                        <TextField {...params} label="Category" />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      multiline
                      minRows={2}
                      maxRows={4}
                      required
                      fullWidth
                      // id="email"

                      name="description"
                      // size="small"
                      value={values.description}
                      label={
                        errors.description && touched.description
                          ? errors.description
                          : "Description"
                      }
                      error={
                        errors.description && touched.description ? true : false
                      }
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      component="label"
                      variant="outlined"
                      startIcon={<UploadFileIcon />}
                      sx={{ marginRight: "1rem" }}
                    >
                      upload images
                      <input
                        type="file"
                        accept=".jpg"
                        hidden
                        multiple
                        onChange={handleUpload}
                        // onChange={(e) => handleFileUpload(e.target.files[0])}
                      />
                    </Button>
                    <div>
                      {images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={` Image ${index + 1}`}
                          style={{
                            width: "75px",
                            height: "75px",
                            margin: "10px",
                          }}
                        />
                      ))}
                    </div>
                  </Grid>
                </Grid>
                {loading ? (
                  <Loading />
                ) : (
                  <Button
                    type="submit"
                    fullWidth
                    disabled={error ? true : false}
                    variant="contained"
                    sx={{
                      mt: 3,
                      mb: 2,
                      bgcolor: "secondary.main",
                      ":hover": {
                        bgcolor: "#20262E",
                        color: "white",
                      },
                    }}
                  >
                    Sign Up
                  </Button>
                )}
                <div id="recaptcha-container"></div>

                <Grid container justifyContent="flex-start">
                  <Grid item></Grid>
                </Grid>
              </Box>
            </Paper>
          </Box>
        </TabPanel>
      </Box>
    </>
  );
};

export default AddProducts;
