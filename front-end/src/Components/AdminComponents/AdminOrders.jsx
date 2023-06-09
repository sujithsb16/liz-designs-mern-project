import React, { useCallback, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, InputAdornment, Typography, styled } from "@mui/material";
import {
  ConfirmReturnOrder,
  adminOrderList,
  orderDeliverApi,
  orderStatusControl,
} from "../../apiCalls/adminApiCalls";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";

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

const AdminOrders = () => {
  const navigate = useNavigate();

  const handleOrder = (id, status) => {
    confirmAlert({
      title: "Confirm",
      message: `Are you sure ?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            orderConfirm(id, status);
            // navigate("/admin");
          },
        },
        {
          label: "No",
          onClick: () => navigate("/admin/orders"),
        },
      ],
    });
  };
  const handleReturn = (id) => {
    confirmAlert({
      title: "Confirm",
      message: `Are you sure ?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            handleConfirmReturn(id);
            // navigate("/admin");
          },
        },
        {
          label: "No",
          onClick: () => navigate("/admin/orders"),
        },
      ],
    });
  };

  const handleConfirmReturn = async (id) => {
    try {
    
      setLoading(true);
      const result = await ConfirmReturnOrder(token, id, setLoading);
      if (result.data) {
        console.log("test 4 ");
        console.log(result.data);
        setOrderSuccess(!orderSuccess);
        toast.error("order return successful", { icon: "" });
        // setCoupons(result.data); // set only first 4 elements
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
      console.log(error.message);
    }
  };

 

  const orderConfirm = async (id, status) => {
    setIsSubmitting(true); // Set the submitting state to true
    console.log(id);
    try {
      setLoading(true);
      const result = await orderStatusControl(id, token, setLoading, status);

      console.log("blocksucess2");

      if (result.data) {
        console.log("test 4 ");
        console.log(result.data);
        setOrderSuccess(!orderSuccess);
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
      setIsSubmitting(false);
    }
  };
  const orderDeliver = async (id) => {
    setIsSubmitting(true); // Set the submitting state to true
    console.log(id);
    try {
      setLoading(true);
      const result = await orderDeliverApi(id, token, setLoading);

      console.log("blocksucess2");

      if (result.data) {
        console.log("test 4 ");
        console.log(result.data);
        setOrderSuccess(!orderSuccess);
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
      setIsSubmitting(false);
    }
  };

  ////////////////////////////////
  const admin = useSelector((state) => state.adminLogin);
  const token = admin.adminInfo.token;
  ////////////////////////////////
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  ////////////////////////////////

  const [orderList, setOrderList] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  /////////////////////////////////

  const getOrder = useCallback(async () => {
    try {
      setLoading(true);
      const result = await adminOrderList(token, setLoading);
      if (result.data) {
        console.log("test 4 ");
        console.log(result.data);
        setOrderList(result.data);
        setIsSubmitting(false);
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
  ////////////////////////////////

  console.log(orderList);
  const targetStatuses = ["Returned", "Return Requested"];
const filteredOrders = orderList.filter((order) =>
  targetStatuses.includes(order.status)
);

console.log(filteredOrders);



  ////////////////////////////////
  useEffect(() => {
    getOrder();
  }, [getOrder, orderSuccess]);
  ////////////////////////////////

  return (
    <>
      <Box spacing={4} sx={{ width: "100%", paddingLeft: "1rem" }}>
        <Toaster toasterOptions={{ duratiom: 4000 }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            alignItems: "center",
            marginTop: "5rem",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
            sx={{ width: { sm: "50rem", lg: "30vw" } }}
          >
            <Tab label="Orders" {...a11yProps(0)} />
            <Tab label="Returns" {...a11yProps(1)} />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          <TableContainer
            component={Paper}
            sx={{
              marginTop: "1rem",
              height: "100%",
              width: "100%", // Set the container width to 100% to occupy the available space
              marginLeft: "0",
              overflowX: "auto", // Add horizontal scrolling for smaller screens
              "&::-webkit-scrollbar": {
                height: "0.4rem",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#c4c4c4",
              },
            }}
          >
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>SI. No</StyledTableCell>
                  <StyledTableCell align="center">User</StyledTableCell>
                  <StyledTableCell align="center">Products</StyledTableCell>
                  <StyledTableCell align="center">Total</StyledTableCell>
                  <StyledTableCell align="center">Status</StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderList.map((order, index) => (
                  <StyledTableRow key={order._id}>
                    <StyledTableCell component="th" scope="order">
                      {index + 1} {/* Display serial number */}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {order.userId.firstName}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {order.products.items.map((item) => (
                        <div
                          key={item.productId._id}
                          style={{ margin: "0.5rem" }}
                        >
                          <img
                            src={item.productId.image[0].url}
                            alt={item.productId.name}
                            style={{ width: "7vw" }}
                          />
                        </div>
                      ))}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      {order.products.totalPrice}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {order.status}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {order.status === "Build" ? (
                        <Button
                          variant="contained"
                          disabled={order._id === id && isSubmitting}
                          sx={{
                            width: "6rem", // Set the desired width for the button
                            "@media (max-width: 960px)": {
                              width: "10vw", // Set the desired width for smaller screens
                            },
                          }}
                          onClick={() => {
                            handleOrder(order._id, order.status);
                            setId(order._id);
                          }}
                        >
                          {order._id === id && isSubmitting
                            ? "....." // Replace "....." with the desired text for when the conditions are met
                            : "Confirm"}
                        </Button>
                      ) : (
                        ""
                      )}

                      {order.status === "Confirmed" ? (
                        <Button
                          variant="contained"
                          disabled={order._id === id && isSubmitting}
                          sx={{
                            width: "6rem", // Set the desired width for the button
                            "@media (max-width: 960px)": {
                              width: "10vw", // Set the desired width for smaller screens
                            },
                          }}
                          onClick={() => {
                            handleOrder(order._id, order.status);

                            setId(order._id);
                          }}
                        >
                          {order._id === id && isSubmitting
                            ? "....." // Replace "....." with the desired text for when the conditions are met
                            : "Pack"}
                        </Button>
                      ) : (
                        ""
                      )}
                      {order.status === "Packed" ? (
                        <Button
                          variant="contained"
                          disabled={order._id === id && isSubmitting}
                          sx={{
                            width: "6rem", // Set the desired width for the button
                            "@media (max-width: 960px)": {
                              width: "10vw", // Set the desired width for smaller screens
                            },
                          }}
                          onClick={() => {
                            handleOrder(order._id, order.status);

                            setId(order._id);
                          }}
                        >
                          {order._id === id && isSubmitting
                            ? "....." // Replace "....." with the desired text for when the conditions are met
                            : "Shipment"}
                        </Button>
                      ) : (
                        ""
                      )}
                      {order.status === "Shipped" ? (
                        <Button
                          variant="contained"
                          disabled={order._id === id && isSubmitting}
                          sx={{
                            width: "6rem", // Set the desired width for the button
                            "@media (max-width: 960px)": {
                              width: "10vw", // Set the desired width for smaller screens
                            },
                          }}
                          onClick={() => {
                            handleOrder(order._id, order.status);

                            setId(order._id);
                          }}
                        >
                          {order._id === id && isSubmitting
                            ? "....." // Replace "....." with the desired text for when the conditions are met
                            : "Delivered"}
                        </Button>
                      ) : (
                        ""
                      )}

                      {order.status === "Delivered" ? (
                        <Typography color="green">Delivered</Typography>
                      ) : (
                        " "
                      )}

                      {/* {order.status === "Attempted" ? : order.status === "Packed" ?  : order.status === "Delivered" ? (
                          <Typography color="green">Delivered</Typography>
                        ) : (
                          <Typography color="brown">Confirmed</Typography>
                        )} */}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <TableContainer
            component={Paper}
            sx={{
              marginTop: "1rem",
              height: "100%",
              width: "100%", // Set the container width to 100% to occupy the available space
              marginLeft: "0",
              overflowX: "auto", // Add horizontal scrolling for smaller screens
              "&::-webkit-scrollbar": {
                height: "0.4rem",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#c4c4c4",
              },
            }}
          >
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>SI. No</StyledTableCell>
                  <StyledTableCell align="center">User</StyledTableCell>
                  <StyledTableCell align="center">Products</StyledTableCell>
                  <StyledTableCell align="center">Total</StyledTableCell>
                  <StyledTableCell align="center">Status</StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredOrders?.map((order, index) => (
                  <StyledTableRow key={order._id}>
                    <StyledTableCell component="th" scope="order">
                      {index + 1} {/* Display serial number */}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {order.userId.firstName}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {order.products.items.map((item) => (
                        <div
                          key={item.productId._id}
                          style={{ margin: "0.5rem" }}
                        >
                          <img
                            src={item.productId.image[0].url}
                            alt={item.productId.name}
                            style={{ width: "7vw" }}
                          />
                        </div>
                      ))}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      {order.products.totalPrice}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {order.status}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                     
                      {order.status === "Return Requested" ? (
                        <Button
                          variant="contained"
                          disabled={order._id === id && isSubmitting}
                          sx={{
                            width: "6rem", // Set the desired width for the button
                            "@media (max-width: 960px)": {
                              width: "10vw", // Set the desired width for smaller screens
                            },
                          }}
                          onClick={() => {
                            handleReturn(order._id);

                            setId(order._id);
                          }}
                        >
                          {order._id === id && isSubmitting
                            ? "....." // Replace "....." with the desired text for when the conditions are met
                            : "Return"}
                        </Button>
                      ) : (
                        ""
                      )}
                      
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </Box>
    </>
  );
};

export default AdminOrders;
