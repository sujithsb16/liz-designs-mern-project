

import React, { useCallback, useEffect, useState } from "react";
import {
  Tabs,
  Tab,
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  Grid,
  Stack,
  styled,
  Divider,
  Rating,


} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { UserProfileApi, addAddressApi, cancelOrder, productRateApi, returnOrder, updateUserApi, userCouponActivate, userCouponList } from "../../apiCalls/userApiCalls";
import { useDispatch, useSelector } from "react-redux";
import { userAddressSchema, userUpdateSchema } from "../../schema/Validation";
import { useFormik } from "formik";
import { setUserLogin } from "../../Redux/userSlice";
import UserAddress from "./UserAddress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import toast, { Toaster } from "react-hot-toast";



const initialUser={
firstName:"",
  lastName:"",
  email:"",
  mobile:"",

}
const initialAddress = {
  title:"",
  address: "",
  city: "",
  state: "",
  zip: "",
};


//////////////////table/////////////
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




///////////////////////////////////


const UserProfile = () => {
const dispatch = useDispatch();

  ////////////// validation///////////////
  
  const formikUser =
    useFormik({
      initialValues: initialUser,
      validationSchema: userUpdateSchema,
      onSubmit: (values) => {
  
       const updatedUser = {
         firstName: formikUser.values.firstName,
         lastName: formikUser.values.lastName,
         email: formikUser.values.email,
         mobile: formikUser.values.mobile,
       };
  
       updateUser(updatedUser);
  
  
        // submitHandler();
  
        console.log(values);
      },
    });
  const formikAddress = useFormik({
    initialValues: initialAddress,
    validationSchema: userAddressSchema,
    onSubmit: (values) => {
      const address = {
        title:values.title,
        address: values.address,
        state: values.state,
        city: values.city,
        zip: values.zip,
      };

      addAddress(address);

      // submitHandler();

      console.log(values);
    },
  });


///////////////////////////////////////

   const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [error, setError] = useState(false);
  const [userUpdateSuccess, setUserUpdateSuccess] = useState(false);
  const [addAddressSuccess,setAddAddressSuccess] = useState(false)
  const [couponSuccess,setCouponSuccess] = useState(false)
  const [loading, setLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [user, setUser] = useState("");
  const [orders, setOrders] = useState([])
  const [order, setOrder] = useState("");
  const [ratings, setRatings] = useState({});

  ///////////////////////////////////////////////////
  const token = useSelector((state) => state.userLogin.userInfo.token);
  const userInfo =  useSelector((state) => state.userLogin.userInfo)
  
  ///////////////////////////////////////////////////

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
//////////////////////////////////////////////////////

//////////////////////user update////////////////////




/////////////////////////////////////////////////////
const updateUser = async (updatedUser) => {
  try {
    setLoading(true);
    const result = await updateUserApi(token, updatedUser, setLoading);
    if (result.data) {
      console.log("test 4 ");
      console.log(result.data);
       dispatch(
         setUserLogin({
           userInfo: result.data,
         })
       );
       setUserUpdateSuccess(!userUpdateSuccess); 
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
};
////////////////////////////////////////////////////


const addAddress = async (address) => {
  try {
    setLoading(true);
    const result = await addAddressApi(token, address, setLoading);
    if (result.data) {
      console.log("test 4 ");
      console.log(result.data);
      setAddAddressSuccess(!addAddressSuccess);
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
};


////////////////////////////////////////////////////

const handleViewOrder = async (orderId) => {
  handleClickOpen()
  const order = orders.find((order) => order._id === orderId);

  if (order) {
    setOrder(order);

    console.log("Found order:", order);
  } else {
    // Order not found
    console.log("Order not found");
  }
};

 const handleClickOpen = () => {
   setOpen(true);
 };

 const handleClose = () => {
   setOpen(false);
   setRatings({})
   setOrder("")
 };

////////////////////////////////////////////////////

const handleCancelOrder = async(orderId) => {
  try {
    handleClose()
     setLoading(true);
     const result = await cancelOrder(token, orderId, setLoading);
     if (result.data) {
       console.log("test 4 ");
       console.log(result.data);
       setCouponSuccess(!couponSuccess);
       toast.error("order cancelled", {icon: ""} )
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
}


const handleReturnOrder = async (orderId) => {
  try {
    handleClose();
    setLoading(true);
    const result = await returnOrder(token, orderId, setLoading);
    if (result.data) {
      console.log("test 4 ");
      console.log(result.data);
      setCouponSuccess(!couponSuccess);
      toast.error("order return requested", { icon: "" });
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


///////////////////////////////////////////////////

//////////////////rate/////////////////////////////

const handleRatingChange = (index, newValue) => {
  const updatedRatings = [...ratings];
  updatedRatings[index] = newValue;
  setRatings(updatedRatings);
};

const handleRating = async(productId)=>{
 try {

  // handleClose()
     setLoading(true);
     const rate = ratings[productId];
     const result = await productRateApi(token,rate, productId, setLoading);
     if (result.status === 200) {
       console.log("test 4 ");
       console.log(result.data);
       setCouponSuccess(!couponSuccess);
       toast.success("Rating Added")
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
  
 }
}

///////////////////////////////////////////////////

//////////////////////////////////////////////////////
  const userProfile = useCallback(async () => {
    try {
      setLoading(true);
      const result = await UserProfileApi(token, setLoading);
      if (result.data) {
        console.log("test 4 ");
        console.log(result.data.coupons);
        setCoupons(result.data.coupons);
        setUser(result.data.user);
        setOrders(result.data.orders);
        
      } else {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 4000);
        setLoading(false);
        console.log(result);
      }
      setLoading(false);
    } catch (error) {    console.log(error);
}
  }, [token, setLoading]);
///////////////////////////////////////////////////////

const couponActivate = async(couponId) => {
   try {
      setLoading(true);
      const result = await userCouponActivate(token,couponId, setLoading);
      if (result.data) {
        console.log("test 4 ");
        console.log(result.data);
        setCouponSuccess(!couponSuccess);
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
    } catch (error) {}

}

useEffect(() => {
  if (order?.products?.items) {
    const initialRatings = {};
    console.log("hai");
    order.products.items.forEach((item) => {
      initialRatings[item.productId._id] = item.productId.rating || 0;
    });
    setRatings(initialRatings);
  }
}, [order]);

console.log(ratings);


///////////////////////////////////////////////////////
  useEffect(() => {
    userProfile();
    
    // getUser();
  }, [userProfile, addAddressSuccess, couponSuccess]);

console.log(orders);

  return (
    <>
      {/* <Typography variant="h4" align="center" gutterBottom>
        User Profile
      </Typography> */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          padding: 0,
          minHeight: "90vh",
        }}
      >
        <Toaster />
        <Paper
          sx={{
            width: { xs: "100%", sm: "80%", md: "60%" },
            boxShadow: 10,
            margin: { xs: 1, sm: 2, lg: 4 },
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Profile Details" sx={{ fontFamily: "Inria Serif" }} />
            <Tab label="Addresses" sx={{ fontFamily: "Inria Serif" }} />
            <Tab label="Coupons" sx={{ fontFamily: "Inria Serif" }} />
            <Tab label="Orders" sx={{ fontFamily: "Inria Serif" }} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <Box sx={{ display: "flex", flexDirection: "column", p: 3 }}>
              <TextField
                margin="normal"
                label={
                  formikUser.errors.firstName && formikUser.touched.firstName
                    ? formikUser.errors.firstName
                    : "First Name"
                }
                name="firstName"
                defaultValue={userInfo.name}
                error={
                  formikUser.errors.firstName && formikUser.touched.firstName
                    ? true
                    : false
                }
                onChange={formikUser.handleChange}
                onBlur={formikUser.handleBlur}
                size={"small"}
              />
              <TextField
                name="lastName"
                margin="normal"
                label={
                  formikUser.errors.lastName && formikUser.touched.lastName
                    ? formikUser.errors.lastName
                    : "Last Name"
                }
                error={
                  formikUser.errors.lastName && formikUser.touched.lastName
                    ? true
                    : false
                }
                onChange={formikUser.handleChange}
                onBlur={formikUser.handleBlur}
                defaultValue={userInfo.name2}
                size={"small"}
              />
              <TextField
                name="email"
                margin="normal"
                label={
                  formikUser.errors.email && formikUser.touched.email
                    ? formikUser.errors.email
                    : "Email"
                }
                error={
                  formikUser.errors.email && formikUser.touched.email
                    ? true
                    : false
                }
                onChange={formikUser.handleChange}
                onBlur={formikUser.handleBlur}
                defaultValue={userInfo.email}
                size={"small"}
              />
              <TextField
                name="mobile"
                margin="normal"
                label={
                  formikUser.errors.mobile && formikUser.touched.mobile
                    ? formikUser.errors.mobile
                    : "Mobile"
                }
                error={
                  formikUser.errors.mobile && formikUser.touched.mobile
                    ? true
                    : false
                }
                onChange={formikUser.handleChange}
                onBlur={formikUser.handleBlur}
                defaultValue={userInfo.mobile}
                size={"small"}
              />

              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  disabled={loading ? true : false}
                  variant="contained"
                  color="primary"
                  onClick={formikUser.handleSubmit}
                  size={"small"}
                  sx={{ fontFamily: "Inria Serif" }}
                >
                  Save Changes
                </Button>
              </Box>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Box sx={{ display: "flex", flexDirection: "column", p: 3 }}>
              <TextField
                label={
                  formikAddress.errors.title && formikAddress.touched.title
                    ? formikAddress.errors.title
                    : "title"
                }
                error={
                  formikAddress.errors.title && formikAddress.touched.title
                    ? true
                    : false
                }
                onChange={formikAddress.handleChange}
                onBlur={formikAddress.handleBlur}
                name="title"
                margin="normal"
                size={"small"}
              />
              <TextField
                label={
                  formikAddress.errors.address && formikAddress.touched.address
                    ? formikAddress.errors.address
                    : "address"
                }
                error={
                  formikAddress.errors.address && formikAddress.touched.address
                    ? true
                    : false
                }
                onChange={formikAddress.handleChange}
                onBlur={formikAddress.handleBlur}
                name="address"
                margin="normal"
                size={"small"}
              />
              <TextField
                name="city"
                margin="normal"
                label={
                  formikAddress.errors.city && formikAddress.touched.city
                    ? formikAddress.errors.city
                    : "city"
                }
                error={
                  formikAddress.errors.city && formikAddress.touched.city
                    ? true
                    : false
                }
                onChange={formikAddress.handleChange}
                onBlur={formikAddress.handleBlur}
                size={"small"}
              />
              <TextField
                label={
                  formikAddress.errors.state && formikAddress.touched.city
                    ? formikAddress.errors.state
                    : "state"
                }
                error={
                  formikAddress.errors.state && formikAddress.touched.state
                    ? true
                    : false
                }
                onChange={formikAddress.handleChange}
                onBlur={formikAddress.handleBlur}
                name="state"
                margin="normal"
                size={"small"}
              />
              <TextField
                label={
                  formikAddress.errors.zip && formikAddress.touched.zip
                    ? formikAddress.errors.zip
                    : "Zip Code"
                }
                error={
                  formikAddress.errors.zip && formikAddress.touched.zip
                    ? true
                    : false
                }
                onChange={formikAddress.handleChange}
                onBlur={formikAddress.handleBlur}
                name="zip"
                margin="normal"
                size={"small"}
              />

              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={loading ? true : false}
                  onClick={formikAddress.handleSubmit}
                  size={"small"}
                  sx={{ fontFamily: "Inria Serif" }}
                >
                  Add Address
                </Button>
              </Box>
            </Box>
            <Box
              sx={{
                boxShadow: 2,
                borderRadius: 10,
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "info.main",
                padding: 3,
              }}
            >
              {user &&
                user.addresses &&
                Array.isArray(user.addresses) &&
                user.addresses.map((address, index) => (
                  <Stack
                    direction="row"
                    divider={<Divider orientation="vertical" flexItem />}
                    spacing={2}
                  >
                    <Item key={index}>
                      {" "}
                      <UserAddress
                        key={index}
                        index={index}
                        setAddAddressSuccess={setAddAddressSuccess}
                        addAddressSuccess={addAddressSuccess}
                        address={address}
                      />
                    </Item>
                  </Stack>
                ))}
            </Box>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                p: 3,
                backgroundColor: "info.main",
              }}
            >
              {coupons.length > 0 &&
                coupons
                  .filter((coupon) => !coupon.isBlocked)
                  .map((coupon) => {
                    const isActivated = user.activatedCoupons?.some(
                      (activatedCoupon) =>
                        activatedCoupon.toString() === coupon._id.toString()
                    );
                    const isExpired = new Date() > new Date(coupon.validity);
                    return (
                      <Box
                        key={coupon._id}
                        sx={{ display: "flex", alignItems: "center", mb: 2 }}
                      >
                        <Typography
                          variant="body1"
                          sx={{ fontFamily: "Roboto", fontSize: 16 }}
                        >
                          {coupon.name}
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <Typography
                          variant="body1"
                          sx={{ fontFamily: "Roboto", fontSize: 16 }}
                        >
                          {coupon.type}
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <Typography
                          variant="body1"
                          sx={{ fontFamily: "Roboto", fontSize: 16 }}
                        >
                          {coupon.discount}{" "}
                          {coupon.type === "flat" ? "/- off" : "% off"}
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        {isExpired ? (
                          <Typography
                            sx={{ fontFamily: "Roboto", fontSize: 16 }}
                            variant="body1"
                            color={"red"}
                          >
                            Expired
                          </Typography>
                        ) : isActivated ? (
                          <Typography
                            sx={{ fontFamily: "Roboto", fontSize: 16 }}
                            variant="body1"
                            color={"green"}
                          >
                            Activated
                          </Typography>
                        ) : (
                          <Button
                            variant="contained"
                            color="primary"
                            sx={{ fontFamily: "Roboto", fontSize: 16 }}
                            font
                            onClick={() => {
                              couponActivate(coupon._id);
                            }}
                          >
                            Activate
                          </Button>
                        )}
                      </Box>
                    );
                  })}

              <Box sx={{ display: "flex", justifyContent: "flex-end" }}></Box>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                p: 1,
                backgroundColor: "info.main",
              }}
            >
              <TableContainer
                component={Paper}
                sx={{
                  height: "100%",
                }}
              >
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Sl.No.</StyledTableCell>
                      {/* <StyledTableCell align="center">
                        Product
                      </StyledTableCell> */}
                      <StyledTableCell align="center">Product</StyledTableCell>
                      <StyledTableCell align="center">Date</StyledTableCell>
                      <StyledTableCell align="center">Total</StyledTableCell>
                      <StyledTableCell align="center">Payment</StyledTableCell>
                      <StyledTableCell align="center">Status</StyledTableCell>
                      <StyledTableCell align="center">Action</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders.length > 0 &&
                      orders.map((order, index) => (
                        <StyledTableRow key={order._id}>
                          <>
                            <StyledTableCell component="th" scope="row">
                              {index + 1}
                            </StyledTableCell>

                            <StyledTableCell align="center">
                              {order.products.items.map((item) => (
                                <div key={item.productId._id}>
                                  {item.productId.name}
                                </div>
                              ))}
                            </StyledTableCell>

                            <StyledTableCell align="center">
                              {new Date(order.createdAt).toDateString()}
                            </StyledTableCell>

                            <StyledTableCell align="center">
                              {/* {order.products.items.map((item) => (
                                <div key={item.productId._id}>
                                  {item.productId.categoryId.category}
                                </div>
                              ))} */}
                              {order.products.totalPrice}
                            </StyledTableCell>

                            <StyledTableCell align="center">
                              {order.payment}
                            </StyledTableCell>

                            <StyledTableCell
                              align="center"
                              sx={{
                                color:
                                  order.status === "cancelled" ? "red" : "",
                              }}
                            >
                              {order.status}
                            </StyledTableCell>

                            <StyledTableCell align="center">
                              <Button
                                variant="contained"
                                sx={{
                                  width: "6rem", // Set the desired width for the button
                                  "@media (max-width: 960px)": {
                                    width: "10vw", // Set the desired width for smaller screens
                                  },
                                }}
                                onClick={() => {
                                  // handleProductBlock(
                                  //   order._id,
                                  //   order.isBlocked
                                  // );

                                  handleViewOrder(order._id);
                                }}
                              >
                                {"Details"}
                              </Button>
                            </StyledTableCell>
                          </>
                        </StyledTableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Box sx={{ display: "flex", justifyContent: "flex-end" }}></Box>
            </Box>
          </TabPanel>
        </Paper>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Order Details</DialogTitle>
          <DialogContent
            sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {order && (
              <>
                <DialogContentText
                  sx={{ fontFamily: "Roboto", fontWeight: "bold" }}
                >
                  <b>Order ID:</b> {order._id}
                </DialogContentText>
                <DialogContentText sx={{ fontFamily: "Roboto" }}>
                  <b>Order Date:</b> {new Date(order.createdAt).toDateString()}
                </DialogContentText>
                <DialogContentText sx={{ fontFamily: "Roboto" }}>
                  <b>Address:</b> {order.address}, {order.city}, {order.state},{" "}
                  {order.zip}
                </DialogContentText>
                <DialogContentText
                  sx={{ fontFamily: "Roboto", fontWeight: "bold" }}
                >
                  <b>Products:</b>
                </DialogContentText>
                {order.products.items.map((item) => (
                  <div
                    key={item.productId._id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    <img
                      src={item.productId.image[0].url}
                      alt={item.productId.name}
                      style={{ width: "100px", marginRight: "1rem" }}
                    />
                    <div style={{ marginTop: "1rem" }}>
                      <p style={{ fontFamily: "Roboto", marginTop: "1rem" }}>
                        {item.productId.name}
                      </p>
                      <p style={{ fontFamily: "Roboto", marginTop: "1rem" }}>
                        Price: ₹{item.productId.price}
                      </p>
                      <p style={{ fontFamily: "Roboto", marginTop: "1rem" }}>
                        Quantity: {item.qty}
                      </p>
                      <p style={{ fontFamily: "Roboto", marginTop: "1rem" }}>
                        Total: ₹{item.productId.price * item.qty}
                      </p>
                    </div>
                    <Box
                      sx={{
                        width: "60%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      {order.status === "cancelled" ||
                      order.status === "Delivered" ||
                      order.status === "Return Requested" ? (
                        <>
                          {Object.keys(ratings).length > 0 && (
                            <>
                              <Rating
                                name={`rating-${item.productId._id}`} // Use a unique name for each Rating component
                                value={ratings[item.productId._id]} // Access the rating value using the product ID as the key
                                onChange={(event, newValue) => {
                                  const updatedRatings = { ...ratings };
                                  updatedRatings[item.productId._id] = newValue;
                                  setRatings(updatedRatings);
                                }}
                              />
                              <Button
                                onClick={() => handleRating(item.productId._id)}
                                variant="contained"
                                size="small"
                                sx={{
                                  borderRadius: 10,
                                  fontSize: "12px",
                                  fontFamily: "Inria Serif",
                                }}
                              >
                                Rate
                              </Button>
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          {Object.keys(ratings).length > 0 && (
                            <Rating value={item.productId.rating} readOnly /> // Display a different rating representation for non-cancelled orders
                          )}
                        </>
                      )}
                    </Box>
                  </div>
                ))}
              </>
            )}
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Close</Button>

            {order.status !== "cancelled" &&
              order.status !== "Delivered" &&
              order.status !== "Return Requested" && (
                <Button onClick={() => handleCancelOrder(order._id)}>
                  Cancel Order
                </Button>
              )}
            {order.status === "Delivered" && (
              <Button onClick={() => handleReturnOrder(order._id)}>
                Return Order
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default UserProfile;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));