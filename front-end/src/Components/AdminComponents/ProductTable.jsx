import React, { useCallback, useEffect, useState } from 'react'
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading";
import { vendorBlock, verifyVendor } from "../../actions/adminActions";
import { Button, Typography } from "@mui/material";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { axiosAdminInstance } from "../../utility/axios";
import {
    adminProductList,
  adminVendorList,
  productStatusControl,
  productVerifyControl,
  vendorStatusControl,
  vendorVerifyControl,
} from "../../apiCalls/adminApiCalls";
import toast, { Toaster } from "react-hot-toast";



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






const ProductTable = () => {
  /////////////////////////////////////////
  const navigate = useNavigate();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  ///////////////////////////////////////////

   const admin = useSelector((state) => state.adminLogin);
   const token = admin.adminInfo.token;

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState([]);
  const [blockSuccess, setBlockSuccess] = useState(false);
  const [verifySuccess, setVerifySuccess] = useState(false);
  ///////////////////////////////////////////////

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
  ///////////////////////////////
  const verifyProduct = async (id, status) => {
    try {
      setLoading(true);
      const result = await productVerifyControl(id, status, token, setLoading);

      console.log("blocksucess2");

      if (result.data) {
        console.log("test 4 ");
        console.log(result.data);
        setVerifySuccess(!verifySuccess);
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

  ////verifyProduct/////////

  const handleProductVerify = (id, status) => {
    console.log("verify test");
    confirmAlert({
      title: "Confirm",
      message: `Are you sure ?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            console.log(id, status);
            verifyProduct(id, status);
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
  /////////BlockProduct///////

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

  ////////////////////////////////
  const allProductList = useCallback(async () => {
    try {
      setLoading(true);
      const result = await adminProductList(token, setLoading);
      if (result.data) {
        console.log("test 4 ");
        console.log(result.data);
        setProductList(result.data);
      } else {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 4000);
        toast.error(result);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, [token, setLoading]);

  ///////////////////////////////

  useEffect(() => {
    allProductList();

    // console.log(allProduct);
  }, [allProductList, verifySuccess, blockSuccess]);

  ///////////////////////////////

  return (
    <>
      <Box sx={{ width: "100%", paddingLeft: "1rem" }}>
        <Toaster toasterOptions={{ duratiom: 4000 }} />

        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            paddingTop: "5rem",
            justifyContent: "center",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{
              margin: "auto",
              display: "flex",
              justifyContent: "center",
              paddingLeft: "25rem",
            }}
          >
            <Tab label="Verified" {...a11yProps(0)} />
            <Tab label="Verifiy Pending" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          {loading ? (
            <Loading
              sx={{
                // marginTop: "10rem",
                height: "100%",
                width: "69.5rem",
                marginLeft: ".5rem",
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          ) : (
            <TableContainer
              component={Paper}
              sx={{
                marginTop: "-.5rem",
                height: "100%",
                width: "69.5rem",
                marginLeft: "-1rem",
              }}
            >
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell align="center">Tailor</StyledTableCell>
                    <StyledTableCell align="center">Price</StyledTableCell>
                    <StyledTableCell align="center">Category</StyledTableCell>
                    {/* <StyledTableCell align="center">Carbs&nbsp;(g)</StyledTableCell> */}
                    <StyledTableCell align="center">Action</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {productList?.map((product) => (
                    <StyledTableRow key={product._id}>
                      {product.isVerified ? (
                        <>
                          <StyledTableCell component="th" scope="row">
                            {product.name}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {product.vendor && product.vendor.firstName}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {product.price}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {product.categoryId && product.categoryId.category}
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
                                handleProductBlock(
                                  product._id,
                                  product.isBlocked
                                );
                              }}
                            >
                              {!product.isBlocked ? "UnBlock" : "Block"}
                            </Button>
                          </StyledTableCell>
                        </>
                      ) : (
                        ""
                      )}
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {loading ? (
            <Loading
              sx={{
                // marginTop: "10rem",
                height: "100%",
                width: "69.5rem",
                marginLeft: ".5rem",
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          ) : (
            <TableContainer
              component={Paper}
              sx={{
                marginTop: "-.5rem",
                height: "100%",
                width: "69.5rem",
                marginLeft: "-1.1rem",
              }}
            >
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell align="center">Tailor</StyledTableCell>
                    <StyledTableCell align="center">Price</StyledTableCell>
                    <StyledTableCell align="center">Category</StyledTableCell>
                    {/* <StyledTableCell align="center">Carbs&nbsp;(g)</StyledTableCell> */}
                    <StyledTableCell align="center">Action</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {productList?.map((product) => (
                    <StyledTableRow key={product._id}>
                      {product.isVerified ? (
                        ""
                      ) : (
                        <>
                          <StyledTableCell component="th" scope="row">
                            {product.name}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {product.vendor && product.vendor.firstName}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {product.price}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {product.categoryId && product.categoryId.category}
                          </StyledTableCell>
                          {/* <StyledTableCell align="center">{row.carbs}</StyledTableCell> */}
                          <StyledTableCell align="center">
                            <Button
                              variant="contained"
                              color="success"
                              onClick={async () => {
                                handleProductVerify(
                                  product._id,
                                  product.isVerified
                                );
                              }}
                            >
                              Verify
                            </Button>
                          </StyledTableCell>
                        </>
                      )}
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </TabPanel>
      </Box>
    </>
  );
}

export default ProductTable
