import React, { useCallback, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
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
import { confirmAlert } from "react-confirm-alert";
import { useState } from "react";
import {
  productStatusControl,
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
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const initialValues = {
  name: "",
  price: "",
  description: "",
  qty: "",
};

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
  const MySwal = withReactContent(Swal);

  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("");

  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);

  const [categoryList, setCategoryList] = useState([]);
  const [productList, setProductList] = useState([]);

  const [blockSuccess, setBlockSuccess] = useState(false);
  const [verifySuccess, setVerifySuccess] = useState(false);

  const [error, setError] = useState(false);

  const vendor = useSelector((state) => state.vendorLogin);
  const token = vendor.vendorInfo.token;

  ////////////////////////////////////

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: productSchema,
      onSubmit: (values, action) => {
        submitHandler();
        // moblieVerify();

        console.log(values);
        action.resetForm();
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
      // setLoading(true);
      const formData = {
        name: values.name,
        price: values.price,
        description: values.description,
        qty: values.qty,
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
        MySwal.fire({
          icon: "success",
          title: "Product added",
          time: 4000,
        });
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

  /////////////////////////////////////////
  const productBlock = async (id, status) => {
    try {
      setLoading(true);
      const result = await productStatusControl(id, status, token, setLoading);

      console.log("blocksucess2");

      if (result.data) {
        console.log("test 4 ");
        console.log(result.data);
        setBlockSuccess(!blockSuccess);
      } else {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 4000);
        toast.error(result);
      }
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };

  //////////////////////////////////////////

  const handleProductBlock = (id, status) => {
    confirmAlert({
      title: "Confirm",
      message: `Are you sure ?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            productBlock(id, status);
            // navigate("/admin");
          },
        },
        {
          label: "No",
          onClick: () => navigate("/admin/tailors"),
        },
      ],
    });
  };

  ///////////////////////////////////////////

  const options = categoryList
    .filter(({ isBlocked }) => !isBlocked)
    .map(({ category }) => ({ label: category }));

  useEffect(() => {
    getProducts();
  }, [blockSuccess]);

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
          {loading ? (
            <Loading />
          ) : (
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
                          {product.isVerified ? (
                            product.adminBlocked ? (
                              <Typography variant="sub2" color="error">
                                Admin blocked the product
                              </Typography>
                            ) : (
                              <Typography variant="sub2" color="green">
                                Verified
                              </Typography>
                            )
                          ) : product.adminBlocked ? (
                            <Typography variant="sub2" color="error">
                              Admin blocked the product
                            </Typography>
                          ) : (
                            <Typography variant="sub2" color="brown">
                              Pending
                            </Typography>
                          )}
                        </StyledTableCell>
                        {/* <StyledTableCell align="center">{row.carbs}</StyledTableCell> */}
                        <StyledTableCell align="center">
                          <Button
                            variant="contained"
                            disabled={
                              error || product.adminBlocked ? true : false
                            }
                            color={product.isBlocked ? "success" : "error"}
                            sx={{
                              width: "6rem", // Set the desired width for the button
                              "@media (max-width: 960px)": {
                                width: "10vw", // Set the desired width for smaller screens
                              },
                            }}
                            onClick={() => {
                              handleProductBlock(
                                product._id,
                                product.isBlocked
                              );
                            }}
                          >
                            {product.isBlocked ? "UnBlock" : "Block"}
                          </Button>
                        </StyledTableCell>
                      </>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
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
                    <TextField
                      required
                      fullWidth
                      id="qty"
                      name="qty"
                      autoComplete="family-name"
                      // size="small"
                      label={
                        errors.qty && touched.qty
                          ? errors.qty
                          : "Enter Quantity"
                      }
                      error={errors.qty && touched.qty ? true : false}
                      value={values.qty}
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
                        accept=".jpg,.JPEG "
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
                    AddProduct{" "}
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
